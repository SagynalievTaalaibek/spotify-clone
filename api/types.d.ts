import { Model, Types } from 'mongoose';

export interface ArtistI {
  _id: string;
  user: string;
  name: string;
  photo: string | null;
  information: string;
  isPublished: false;
}

export interface AlbumI {
  _id: string;
  name: string;
  artist: ArtistI;
  user: string;
  yearOfIssue: string;
  image: string | null;
  isPublished: boolean;
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
  email: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleID?: string;
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
