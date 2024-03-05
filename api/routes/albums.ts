import express from 'express';
import mongoose, { Types } from 'mongoose';

import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import Album from '../models/Album';
import { AlbumMutation } from '../types';

const albumsRouter = express.Router();

albumsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const albumData: AlbumMutation = {
        name: req.body.name,
        artist: req.body.artist,
        yearOfIssue: req.body.yearOfIssue,
        image: req.file ? req.file.filename : null,
      };

      const album = new Album(albumData);
      await album.save();

      return res.send(album);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

albumsRouter.get('/', async (req, res, next) => {
  try {
    const query = req.query.artist;

    if (query) {
      try {
        const albumsByArist = await Album.find({ artist: query })
          .populate('artist')
          .sort({ yearOfIssue: -1 });
        return res.send(albumsByArist);
      } catch (e) {
        return res.status(404).send({ message: 'Wrong object id' });
      }
    }

    const albums = await Album.find().populate('artist');
    return res.send(albums);
  } catch (e) {
    next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const album = await Album.findById(_id);

    if (!album) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});

albumsRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req: RequestWithUser, res, next) => {
    try {
      const id = req.params.id;

      const album = await Album.findById(id);

      if (!album) {
        return res.status(404).send({ error: 'Not found!' });
      }

      await Album.deleteOne({ _id: id });
      return res.send({ message: 'Album deleted!' });
    } catch (e) {
      next(e);
    }
  },
);

export default albumsRouter;
