import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createAlbum, deleteAlbum, fetchAlbumsByArtist } from './albumThunks';
import { AlbumsI } from '../../types';

interface AlbumState {
  albumsByArtist: AlbumsI[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: AlbumState = {
  albumsByArtist: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
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
    builder
      .addCase(createAlbum.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(deleteAlbum.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const albumReducer = albumSlice.reducer;

export const selectAlbumsByArtist = (state: RootState) =>
  state.album.albumsByArtist;
export const selectAlbumFetchLoading = (state: RootState) =>
  state.album.fetchLoading;
export const selectAlbumCreateLoading = (state: RootState) =>
  state.album.createLoading;
export const selectAlbumDeleteLoading = (state: RootState) =>
  state.album.deleteLoading;
