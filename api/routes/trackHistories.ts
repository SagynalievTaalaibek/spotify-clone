import express from 'express';
import User from '../models/User';
import {TrackHistoryMutation} from '../types';
import TrackHistory from '../models/TrackHistory';
import mongoose from 'mongoose';

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (req, res, next) => {
  try {
    const now = new Date();
    const datetime = now.toISOString().toString();

    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return res.status(401).send({error: 'No Authorization header present'});
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Wrong token!'});
    }

    const trackHistoryData: TrackHistoryMutation = {
      user: user._id,
      track: req.body.track,
      datetime,
    }

    const trackHistory = new TrackHistory(trackHistoryData);
    await trackHistory.save();

    res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

export default trackHistoriesRouter;