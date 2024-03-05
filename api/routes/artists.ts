import express from 'express';
import mongoose from 'mongoose';

import auth from '../middleware/auth';
import { imagesUpload } from '../multer';
import Artist from '../models/Artist';
import { ArtistMutation } from '../types';

const artistsRouter = express.Router();

artistsRouter.post(
  '/',
  auth,
  imagesUpload.single('photo'),
  async (req, res, next) => {
    try {
      const artistData: ArtistMutation = {
        name: req.body.name,
        photo: req.file ? req.file.filename : null,
        information: req.body.information,
      };

      const artist = new Artist(artistData);
      await artist.save();

      return res.send(artist);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    next(e);
  }
});

export default artistsRouter;
