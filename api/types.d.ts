import { Model } from 'mongoose';

export interface AlbumMutation {
  name: string;
  artist: string;
  yearOfIssue: string;
  image: string | null;
}

export interface AlbumInterface {
  _id: string;
  name: string;
  artist: string;
  yearOfIssue: string;
  image: string | null;
}

export interface ArtistMutation {
  name: string;
  photo: string | null;
  information: string;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
  albumTrackNumber: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
