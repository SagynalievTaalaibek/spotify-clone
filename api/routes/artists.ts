import express from 'express';
import mongoose, { Types } from 'mongoose';

import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import Artist from '../models/Artist';
import { ArtistI, UserCheck } from '../types';

const artistsRouter = express.Router();

artistsRouter.post(
  '/',
  auth,
  imagesUpload.single('photo'),
  async (req: RequestWithUser, res, next) => {
    try {
      const artist = new Artist({
        name: req.body.name,
        photo: req.file ? req.file.filename : null,
        information: req.body.information,
        user: req.user?._id,
      });
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

const deleteCheck = (user: UserCheck, artist: ArtistI): boolean => {
  let _id: Types.ObjectId;
  try {
    _id = new Types.ObjectId(user._id);
  } catch {
    return false;
  }

  if (user.role === 'admin') {
    return true;
  }

  return user.role === 'user' && !artist.isPublished && _id.equals(artist.user);
};

artistsRouter.delete(
  '/:id',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const id = req.params.id;
      const user = req.user;

      const artist: ArtistI | null = await Artist.findById(id);

      if (!artist) {
        return res.status(404).send({ error: 'Not found!' });
      }

      if (user && deleteCheck({ _id: user.id, role: user.role }, artist)) {
        await Artist.deleteOne({ _id: id });
        return res.send({ message: 'Artist deleted!' });
      }

      return res.status(403).send({ error: 'Forbidden' });
    } catch (e) {
      next(e);
    }
  },
);
export default artistsRouter;
