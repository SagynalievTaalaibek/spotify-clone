import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createTrack, deleteTrack, fetchTracks } from './trackThunks';
import { TrackI } from '../../types';

interface TrackState {
  tracks: TrackI[];
  fetchTrackLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
}

const initialState: TrackState = {
  tracks: [],
  fetchTrackLoading: false,
  createLoading: false,
  deleteLoading: false,
};

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchTrackLoading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload }) => {
        state.tracks = payload;
        state.fetchTrackLoading = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchTrackLoading = false;
      });

    builder
      .addCase(createTrack.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.createLoading = false;
      });

    builder
      .addCase(deleteTrack.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
});

export const trackReducer = trackSlice.reducer;
export const selectTracks = (state: RootState) => state.track.tracks;
export const selectTrackFetchLoading = (state: RootState) =>
  state.track.fetchTrackLoading;

export const selectTrackCreateLoading = (state: RootState) =>
  state.track.createLoading;
export const selectTrackDeleteLoading = (state: RootState) =>
  state.track.deleteLoading;
