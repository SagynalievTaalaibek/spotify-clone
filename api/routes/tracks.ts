import express from 'express';
import mongoose from 'mongoose';

import auth, { RequestWithUser } from '../middleware/auth';
import Track from '../models/Track';
import Album from '../models/Album';
import { AlbumI, TrackI, TrackMutation } from '../types';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req, res, next) => {
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
        const albums: AlbumI[] = await Album.find({
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

tracksRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req: RequestWithUser, res, next) => {
    try {
      const id = req.params.id;

      const track = await Track.findById(id);

      if (!track) {
        return res.status(404).send({ error: 'Not found!' });
      }

      await Track.deleteOne({ _id: id });
      return res.send({ message: 'Track deleted!' });
    } catch (e) {
      next(e);
    }
  },
);

tracksRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const track: TrackI | null = await Track.findById(id);

      if (!track) {
        return res.status(404).send({ error: 'Not found!' });
      }

      const isPublished = track.isPublished;

      const updatedTrack = await Track.updateOne(
        { _id: id },
        { isPublished: !isPublished },
      );

      res.send(updatedTrack);
    } catch (e) {
      next(e);
    }
  },
);

export default tracksRouter;
