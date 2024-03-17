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

  const collections = [
    'artists',
    'albums',
    'tracks',
    'users',
    'trackhistories',
  ];

  for (const collectionsName of collections) {
    await dropCollection(db, collectionsName);
  }

  const users = await User.create(
    {
      email: 'user@spotify.local',
      displayName: 'User',
      avatar: 'fixtures/avatar1.webp',
      password: 'football',
      token: crypto.randomUUID(),
      role: 'user'
    },
    {
      email: 'taalaibek@spotify.local',
      displayName: 'Taalaibek',
      avatar: 'fixtures/avatar1.webp',
      password: 'football',
      token: crypto.randomUUID(),
      role: 'user',
    },
    {
      email: 'admin@spotify.local',
      displayName: 'Batman',
      avatar: 'fixtures/batman_avatar.webp',
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
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Eminem',
      photo: 'fixtures/eminem.jpg',
      information: 'USA Singer',
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: '50Cent',
      photo: 'fixtures/50cent.jpeg',
      information: 'USA Singer',
      isPublished: false,
      user: users[1]._id,
    },
  ]);

  const album = await Album.create([
    {
      name: 'Mirbek Album 1',
      artist: artist[0]._id,
      yearOfIssue: 2010,
      image: 'fixtures/mirbek_album.jpg',
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Mirbek Album 2',
      artist: artist[0]._id,
      yearOfIssue: 2015,
      image: 'fixtures/mirbek_album.jpg',
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Eminem Album 1',
      artist: artist[1]._id,
      yearOfIssue: 2002,
      image: 'fixtures/eminem_albums.jpg',
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Eminem Album 2',
      artist: artist[1]._id,
      yearOfIssue: 2010,
      image: 'fixtures/eminem_albums.jpg',
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Get Rich or Die Tryin',
      artist: artist[2]._id,
      yearOfIssue: 2002,
      image: 'fixtures/50CentAlbum.jpeg',
      isPublished: false,
      user: users[1]._id,
    },
  ]);

  await Track.create([
    {
      name: 'Muras A1',
      album: album[0]._id,
      duration: '1:15',
      albumTrackNumber: 1,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Жалынам A1',
      album: album[0]._id,
      duration: '1:30',
      albumTrackNumber: 2,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Моя любимая A1',
      album: album[0]._id,
      duration: '1:10',
      albumTrackNumber: 3,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Сени менен A1',
      album: album[0]._id,
      duration: '1:04',
      albumTrackNumber: 4,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Mirbek songs A1',
      album: album[0]._id,
      duration: '1:04',
      albumTrackNumber: 5,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Барам сага A2',
      album: album[1]._id,
      duration: '1:15',
      albumTrackNumber: 1,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Кечки бишкек A2',
      album: album[1]._id,
      duration: '1:30',
      albumTrackNumber: 2,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'No name name A2',
      album: album[1]._id,
      duration: '1:10',
      albumTrackNumber: 3,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Сурдотпочу A2',
      album: album[1]._id,
      duration: '1:04',
      albumTrackNumber: 4,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Mirbek songs A2',
      album: album[1]._id,
      duration: '1:04',
      albumTrackNumber: 5,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Mockingbird A1',
      album: album[2]._id,
      duration: '1:15',
      albumTrackNumber: 1,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Lose Yourself A1',
      album: album[2]._id,
      duration: '1:30',
      albumTrackNumber: 2,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Godzilla A1',
      album: album[2]._id,
      duration: '1:10',
      albumTrackNumber: 3,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Lose the way Lie A1',
      album: album[2]._id,
      duration: '1:04',
      albumTrackNumber: 4,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'The Real Slim Shade',
      album: album[2]._id,
      duration: '1:04',
      albumTrackNumber: 5,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Without me A2',
      album: album[3]._id,
      duration: '1:15',
      albumTrackNumber: 1,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Venom A2',
      album: album[3]._id,
      duration: '1:30',
      albumTrackNumber: 2,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Till i collapse A2',
      album: album[3]._id,
      duration: '1:10',
      albumTrackNumber: 3,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Rap God A2',
      album: album[3]._id,
      duration: '1:04',
      albumTrackNumber: 4,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Superman A2',
      album: album[3]._id,
      duration: '1:04',
      albumTrackNumber: 5,
      isPublished: true,
      user: users[0]._id,
    },
    {
      name: 'Intro',
      album: album[4]._id,
      duration: '1:06',
      albumTrackNumber: 1,
      isPublished: false,
      user: users[1]._id,
    },
    {
      name: 'In Da Club',
      album: album[4]._id,
      duration: '3:14',
      albumTrackNumber: 2,
      isPublished: false,
      user: users[1]._id,
    },
    {
      name: "If i can't",
      album: album[4]._id,
      duration: '3:17',
      albumTrackNumber: 3,
      isPublished: false,
      user: users[1]._id,
    },
  ]);

  await db.close();
};

void run();
