import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/artists/artistsSlice';
import { albumReducer } from '../features/albums/albumSlice';
import { trackReducer } from '../features/tracks/trackSlice';
import { userReducer } from '../features/users/usersSlice';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { trackHistoryReducer } from '../features/trackHistory/trackHistorySlice';
import { fileReducer } from '../features/fileTest/fileSlice';

const usersPersistConfig = {
  key: 'spotify:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artist: artistReducer,
  album: albumReducer,
  track: trackReducer,
  users: persistReducer(usersPersistConfig, userReducer),
  trackHistory: trackHistoryReducer,
  file: fileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
