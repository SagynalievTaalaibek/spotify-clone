import NewArtist from './features/artists/NewArtist';
import NewAlbum from './features/albums/NewAlbum';
import NewTrack from './features/tracks/NewTrack';

export const apiURL = 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = import.meta.env['VITE_GOOGLE_CLIENT_ID'] as string;

export const routeItems = [
  {
    id: 'add-artist111',
    page: 'add artist',
    path: '/add-artist',
    component: NewArtist,
  },
  {
    id: 'add-album222',
    page: 'add album',
    path: '/add-album',
    component: NewAlbum,
  },
  {
    id: 'add-track333',
    page: 'add track',
    path: '/add-track',
    component: NewTrack,
  },
];
