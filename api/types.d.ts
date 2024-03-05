import { Model } from 'mongoose';

export interface AlbumMutation {
  name: string;
  artist: string;
  yearOfIssue: string;
  image: string | null;
}

export interface AlbumI {
  _id: string;
  name: string;
  artist: string;
  yearOfIssue: string;
  image: string | null;
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  photo: string | null;
  information: string;
}

export interface ArtistI {
  _id: string;
  name: string;
  photo: string | null;
  information: string;
  isPublished: false;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
  albumTrackNumber: string;
}

export interface TrackI {
  _id: string;
  name: string;
  album: string;
  duration: string;
  albumTrackNumber: string;
  isPublished: boolean;
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
