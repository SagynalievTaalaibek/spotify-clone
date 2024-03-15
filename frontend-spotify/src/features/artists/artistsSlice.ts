import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ArtistsI } from '../../types';
import { createArtist, fetchArtists } from './artistsThunks';

interface ArtistsState {
  artists: ArtistsI[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
  createLoading: false,
};

export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload }) => {
        state.artists = payload;
        state.fetchLoading = false;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createArtist.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createArtist.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const artistReducer = artistSlice.reducer;

export const selectArtist = (state: RootState) => state.artist.artists;
export const selectArtistFetchLoading = (state: RootState) =>
  state.artist.fetchLoading;
export const selectArtistCreateLoading = (state: RootState) =>
  state.artist.createLoading;
