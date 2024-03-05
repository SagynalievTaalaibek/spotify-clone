import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import { AlbumInterface, TrackMutation } from '../types';

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: TrackMutation = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      albumTrackNumber: req.body.albumTrackNumber,
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
    const queryAlbum = req.query.album;
    const queryArtistId = req.query.artist;

    if (queryAlbum) {
      try {
        const trackByAlbum = await Track.find({ album: queryAlbum })
          .populate('album')
          .sort({ albumTrackNumber: 1 });
        return res.send(trackByAlbum);
      } catch (e) {
        return res.status(404).send({ message: 'Wrong object id' });
      }
    }

    if (queryArtistId) {
      try {
        const albums: AlbumInterface[] = await Album.find({
          artist: queryArtistId,
        });
        const albumsId = albums.map((album) => album._id);

        const tractsArtist = await Promise.all(
          albumsId.map(async (id) => {
            return Track.find({ album: id });
          }),
        );

        const allTracks = tractsArtist.flat();

        return res.send(allTracks);
      } catch (e) {
        return res.status(404).send({ message: 'Wrong object id' });
      }
    }

    const tracks = await Track.find().populate('album');
    return res.send(tracks);
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;
