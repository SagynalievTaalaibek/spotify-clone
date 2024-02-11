import express from 'express';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import Album from '../models/Album';
import {AlbumMutation} from '../types';

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
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
});

export default albumsRouter;