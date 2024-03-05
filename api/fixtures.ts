import mongoose from 'mongoose';
import config from './config';
import Album from './models/Album';
import Artist from './models/Artist';
import Track from './models/Track';
import User from './models/User';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop....`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['artists', 'albums', 'tracks', 'users'];

  for (const collectionsName of collections) {
    await dropCollection(db, collectionsName);
  }

  await User.create(
    {
      username: 'user',
      password: 'football',
      token: crypto.randomUUID(),
      role: 'user',
    },
    {
      username: 'admin',
      password: 'football',
      token: crypto.randomUUID(),
      role: 'admin',
    },
  );

  const artist = await Artist.create([
    {
      name: 'Mirbek Atabekov',
      photo: 'fixtures/mirbek.jpg',
      information: 'KG Singer',
    },
    {
      name: 'Eminem',
      photo: 'fixtures/eminem.jpg',
      information: 'USA Singer',
    },
  ]);

  const album = await Album.create([
    {
      name: 'Mirbek Album 1',
      artist: artist[0]._id,
      yearOfIssue: 2010,
      image: 'fixtures/mirbek_album.jpg',
    },
    {
      name: 'Mirbek Album 2',
      artist: artist[0]._id,
      yearOfIssue: 2015,
      image: 'fixtures/mirbek_album.jpg',
    },
    {
      name: 'Eminem Album 1',
      artist: artist[1]._id,
      yearOfIssue: 2002,
      image: 'fixtures/eminem_albums.jpg',
    },
    {
      name: 'Eminem Album 2',
      artist: artist[1]._id,
      yearOfIssue: 2010,
      image: 'fixtures/eminem_albums.jpg',
    },
  ]);

  await Track.create([
    {
      name: 'Muras A1',
      album: album[0]._id,
      duration: '1:15',
      albumTrackNumber: 1,
    },
    {
      name: 'Жалынам A1',
      album: album[0]._id,
      duration: '1:30',
      albumTrackNumber: 2,
    },
    {
      name: 'Моя любимая A1',
      album: album[0]._id,
      duration: '1:10',
      albumTrackNumber: 3,
    },
    {
      name: 'Сени менен A1',
      album: album[0]._id,
      duration: '1:04',
      albumTrackNumber: 4,
    },
    {
      name: 'Mirbek songs A1',
      album: album[0]._id,
      duration: '1:04',
      albumTrackNumber: 5,
    },
    {
      name: 'Барам сага A2',
      album: album[1]._id,
      duration: '1:15',
      albumTrackNumber: 1,
    },
    {
      name: 'Кечки бишкек A2',
      album: album[1]._id,
      duration: '1:30',
      albumTrackNumber: 2,
    },
    {
      name: 'No name name A2',
      album: album[1]._id,
      duration: '1:10',
      albumTrackNumber: 3,
    },
    {
      name: 'Сурдотпочу A2',
      album: album[1]._id,
      duration: '1:04',
      albumTrackNumber: 4,
    },
    {
      name: 'Mirbek songs A2',
      album: album[1]._id,
      duration: '1:04',
      albumTrackNumber: 5,
    },
    {
      name: 'Mockingbird A1',
      album: album[2]._id,
      duration: '1:15',
      albumTrackNumber: 1,
    },
    {
      name: 'Lose Yourself A1',
      album: album[2]._id,
      duration: '1:30',
      albumTrackNumber: 2,
    },
    {
      name: 'Godzilla A1',
      album: album[2]._id,
      duration: '1:10',
      albumTrackNumber: 3,
    },
    {
      name: 'Lose the way Lie A1',
      album: album[2]._id,
      duration: '1:04',
      albumTrackNumber: 4,
    },
    {
      name: 'The Real Slim Shade',
      album: album[2]._id,
      duration: '1:04',
      albumTrackNumber: 5,
    },
    {
      name: 'Without me A2',
      album: album[3]._id,
      duration: '1:15',
      albumTrackNumber: 1,
    },
    {
      name: 'Venom A2',
      album: album[3]._id,
      duration: '1:30',
      albumTrackNumber: 2,
    },
    {
      name: 'Till i collapse A2',
      album: album[3]._id,
      duration: '1:10',
      albumTrackNumber: 3,
    },
    {
      name: 'Rap God A2',
      album: album[3]._id,
      duration: '1:04',
      albumTrackNumber: 4,
    },
    {
      name: 'Superman A2',
      album: album[3]._id,
      duration: '1:04',
      albumTrackNumber: 5,
    },
  ]);

  await db.close();
};

void run();
