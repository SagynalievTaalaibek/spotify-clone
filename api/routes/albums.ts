import express from 'express';
import mongoose, { Types } from 'mongoose';

import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import Album from '../models/Album';
import { AlbumI, UserCheck } from '../types';
import userCheck from '../middleware/userCheck';

const albumsRouter = express.Router();

albumsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const album = new Album({
        name: req.body.name,
        artist: req.body.artist,
        yearOfIssue: req.body.yearOfIssue,
        image: req.file ? req.file.filename : null,
        user: req.user?._id,
      });
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

albumsRouter.get('/', userCheck, async (req: RequestWithUser, res, next) => {
  try {
    const query = req.query.artist;
    const user = req.user;

    if (query) {
      try {
        const albumsByArist = await Album.find({
          artist: query,
        })
          .populate('artist')
          .sort({ yearOfIssue: -1 });
        const resultsPublished = await Album.find({
          artist: query,
          isPublished: true,
        })
          .populate('artist')
          .sort({ yearOfIssue: -1 });

        const resultsNotPublished = await Album.find({
          artist: query,
          isPublished: false,
        })
          .populate('artist')
          .sort({ yearOfIssue: -1 });

        if (user) {
          if (user.role === 'admin') {
            return res.send(albumsByArist);
          } else if (user.role === 'user') {
            const filterByUser = resultsNotPublished.filter((item) =>
              user._id.equals(item.user),
            );
            return res.send([...filterByUser, ...resultsPublished]);
          }
        }

        return res.send(resultsPublished);
      } catch (e) {
        return res.status(404).send({ message: 'Wrong object id' });
      }
    }

    const albums = await Album.find({ isPublished: true }).populate('artist');
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

albumsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const album: AlbumI | null = await Album.findById(id);

      if (!album) {
        return res.status(404).send({ error: 'Not found!' });
      }

      const isPublished = album.isPublished;

      const updatedAlbum = await Album.updateOne(
        { _id: id },
        { isPublished: !isPublished },
      );

      res.send(updatedAlbum);
    } catch (e) {
      next(e);
    }
  },
);

const deleteCheck = (user: UserCheck, album: AlbumI): boolean => {
  let _id: Types.ObjectId;
  try {
    _id = new Types.ObjectId(user._id);
  } catch {
    return false;
  }

  if (user.role === 'admin') {
    return true;
  }

  return user.role === 'user' && !album.isPublished && _id.equals(album.user);
};

albumsRouter.delete(
  '/:id',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const id = req.params.id;
      const user = req.user;

      const album: AlbumI | null = await Album.findById(id);

      if (!album) {
        return res.status(404).send({ error: 'Not found!' });
      }

      if (user && deleteCheck({ _id: user.id, role: user.role }, album)) {
        await Album.deleteOne({ _id: id });
        return res.send({ message: 'Album deleted!' });
      }

      return res.status(403).send({ error: 'Forbidden' });
    } catch (e) {
      next(e);
    }
  },
);

export default albumsRouter;
