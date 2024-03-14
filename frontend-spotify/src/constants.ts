import NewArtist from './features/artists/NewArtist';
import Albums from './features/albums/Albums';
import Track from './features/tracks/Track';

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
    component: Albums,
  },
  {
    id: 'add-track333',
    page: 'add track',
    path: '/add-track',
    component: Track,
  },
];
