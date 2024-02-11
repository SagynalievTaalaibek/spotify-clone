import express from 'express';
import {imagesUpload} from '../multer';
import Artist from '../models/Artist';
import mongoose from 'mongoose';

const artistsRouter = express.Router();

artistsRouter.post('/', imagesUpload.single('photo'), async (req, res, next) => {
  try {
    const artistData = {
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
});

export default artistsRouter;