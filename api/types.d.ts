export interface AlbumMutation {
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
