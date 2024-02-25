import { AlbumsI } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchAlbumsByArtist } from './albumThunks';

interface AlbumState {
  albumsByArtist: AlbumsI[];
  fetchLoading: boolean;
}

const initialState: AlbumState = {
  albumsByArtist: [],
  fetchLoading: false,
};

export const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsByArtist.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbumsByArtist.fulfilled, (state, { payload }) => {
        state.albumsByArtist = payload;
        state.fetchLoading = false;
      })
      .addCase(fetchAlbumsByArtist.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const albumReducer = albumSlice.reducer;

export const selectAlbumsByArtist = (state: RootState) =>
  state.album.albumsByArtist;
export const selectAlbumFetchLoading = (state: RootState) =>
  state.album.fetchLoading;
