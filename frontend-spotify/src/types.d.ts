export interface ArtistsI {
  _id: string;
  name: string;
  photo: string;
  information: string;
}

export interface AlbumsI {
  _id: string;
  name: string;
  artist: ArtistsI;
  yearOfIssue: number;
  image: string;
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
  user: User;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
