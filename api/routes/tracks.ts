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

export default tracksRouter;