export interface ArtistsI {
  _id: string;
  name: string;
  photo: string;
  information: string | null;
}

export interface ArtistMutation {
  name: string;
  photo: File | null;
  information: string;
}

export interface AlbumsI {
  _id: string;
  name: string;
  artist: ArtistsI;
  yearOfIssue: number;
  image: string;
}

export interface AlbumMutation {
  name: string;
  artist: string;
  yearOfIssue: string;
  image: File | null;
}

export interface TrackI {
  _id: string;
  name: string;
  album: {
    _id: string;
    name: string;
    artist: string;
    yearOfIssue: number;
    image: string;
  };
  duration: string;
  albumTrackNumber: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface UserI {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: UserI;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistoryMutation {
  token: string;
  track: string;
}

export interface TrackHistoryData {
  _id: string;
  user: string;
  track: {
    _id: string;
    name: string;
    album: {
      _id: string;
      name: string;
      artist: {
        _id: string;
        name: string;
      };
    };
  };
  datetime: string;
}
