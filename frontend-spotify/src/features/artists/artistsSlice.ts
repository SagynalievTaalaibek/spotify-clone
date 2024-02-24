import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ArtistsI } from '../../../types';
import { fetchArtists } from './artistsThunks';

interface ArtistsState {
  artists: ArtistsI[];
  fetchLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  fetchLoading: false,
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
  },
});

export const artistReducer = artistSlice.reducer;

export const selectArtist = (state: RootState) => state.artist.artists;
export const selectArtistFetchLoading = (state: RootState) =>
  state.artist.fetchLoading;
