import express from 'express';
import {TrackMutation} from '../types';
import Track from '../models/Track';
import mongoose from 'mongoose';

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

export default tracksRouter;