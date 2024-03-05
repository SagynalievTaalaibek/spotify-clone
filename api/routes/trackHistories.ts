import express from 'express';
import mongoose from 'mongoose';

import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post(
  '/',
  auth,
  async (req: RequestWithUser, res, next) => {
    try {
      const now = new Date();
      const datetime = now.toISOString().toString();

      const trackHistory = new TrackHistory({
        user: req.user?._id,
        track: req.body.track,
        datetime,
      });
      await trackHistory.save();

      res.send(trackHistory);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  },
);

trackHistoriesRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackHistoryData = await TrackHistory.find({ user: req.user?._id })
      .populate({
        path: 'track',
        select: 'name album',
        populate: {
          path: 'album',
          model: 'Album',
          select: 'name artist',
          populate: {
            path: 'artist',
            model: 'Artist',
            select: 'name',
          },
        },
      })
      .sort({ datetime: -1 });

    return res.send(trackHistoryData);
  } catch (e) {
    next(e);
  }
});
export default trackHistoriesRouter;
