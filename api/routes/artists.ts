import express from 'express';
import mongoose from 'mongoose';

import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import Artist from '../models/Artist';
import { ArtistI, ArtistMutation } from '../types';

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

artistsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const artist: ArtistI | null = await Artist.findById(id);

      if (!artist) {
        return res.status(404).send({ error: 'Not found!' });
      }

      const isPublished = artist.isPublished;

      const updatedArtist = await Artist.updateOne(
        { _id: id },
        { isPublished: !isPublished },
      );

      res.send(updatedArtist);
    } catch (e) {
      next(e);
    }
  },
);

artistsRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req: RequestWithUser, res, next) => {
    try {
      const id = req.params.id;

      const artist = await Artist.findById(id);

      if (!artist) {
        return res.status(404).send({ error: 'Not found!' });
      }

      await Artist.deleteOne({ _id: id });
      return res.send({ message: 'Artist deleted!' });
    } catch (e) {
      next(e);
    }
  },
);
export default artistsRouter;
