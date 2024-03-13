import { Model, Types } from 'mongoose';

export interface AlbumI {
  _id: string;
  name: string;
  artist: string;
  user: string;
  yearOfIssue: string;
  image: string | null;
  isPublished: boolean;
}

export interface ArtistI {
  _id: string;
  user: string;
  name: string;
  photo: string | null;
  information: string;
  isPublished: false;
}

export interface TrackI {
  _id: string;
  user: Types.ObjectId;
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

export interface UserCheck {
  _id: Types.ObjectId;
  role: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
