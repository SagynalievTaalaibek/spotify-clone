import express from 'express';
import {AlbumInterface, TrackMutation} from '../types';
import Track from '../models/Track';
import mongoose, {Types} from 'mongoose';
import Album from '../models/Album';

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: TrackMutation = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
    };

    const track = new Track(trackData);
    await track.save();

    res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});


tracksRouter.get('/', async (req, res, next) => {
  try {
    const query = req.query.album;

    if (query) {
      try {
        const trackByAlbum = await Track.find({album: query});
        return res.send(trackByAlbum);
      } catch (e) {
        return res.status(404).send({message: 'Wrong object id'});
      }
    }

    const tracks = await Track.find().populate('album');
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

tracksRouter.get('/:id', async (req, res, next) => {
  try {
    let artist: Types.ObjectId;
    try {
      artist = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({error: 'Wrong ObjectId!'});
    }

    const albums: AlbumInterface[] = await Album.find({ artist });
    const albumsId = albums.map(album => album._id);

    const tractsArtist = await Promise.all(albumsId.map(async (id) => {
      return Track.find({album: id});
    }));

    const allTracks = tractsArtist.flat();

    return res.send(allTracks);
  } catch (e) {
    next(e);
  }
});


export default tracksRouter;