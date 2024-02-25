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

export interface Count {
  count: number;
}
