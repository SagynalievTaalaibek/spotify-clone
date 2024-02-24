import express from 'express';
import {imagesUpload} from '../multer';
import mongoose, {Types} from 'mongoose';
import Album from '../models/Album';
import {AlbumMutation} from '../types';
import { loadavg } from 'node:os';

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

albumsRouter.get('/', async (req, res, next) => {
  try {
    const query = req.query.artist;

    if (query) {
      try {
        const albumsByArist = await Album.find({artist: query});
        return res.send(albumsByArist);
      } catch (e) {
        return res.status(404).send({message: 'Wrong object id'});
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
      return res.status(404).send({error: 'Wrong ObjectId!'});
    }

    const album = await Album.findById(_id);

    if (!album) {
      return res.status(404).send({error: 'Not found!'});
    }

    res.send(album);
  } catch (e) {
    next(e);
  }
});

export default albumsRouter;