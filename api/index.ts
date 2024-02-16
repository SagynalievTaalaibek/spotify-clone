import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import artistsRouter from './routes/artists';
import albumsRouter from './routes/albums';
import tracksRouter from './routes/tracks';
import usersRouter from './routes/users';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  })
};

void run();