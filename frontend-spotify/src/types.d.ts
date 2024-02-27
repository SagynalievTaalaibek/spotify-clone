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
