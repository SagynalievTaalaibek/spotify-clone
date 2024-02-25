import { configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/artists/artistsSlice';
import { albumReducer } from '../features/albums/albumSlice';
import { trackReducer } from '../features/tracks/trackSlice';

export const store = configureStore({
  reducer: {
    artist: artistReducer,
    album: albumReducer,
    track: trackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
