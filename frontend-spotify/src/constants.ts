import NewArtist from './features/artists/NewArtist';
import Track from './features/tracks/Track';
import NewAlbum from './features/albums/NewAlbum';

export const apiURL = 'http://localhost:8000';

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
    component: Track,
  },
];
