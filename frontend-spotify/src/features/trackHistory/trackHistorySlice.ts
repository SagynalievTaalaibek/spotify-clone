import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GlobalError, TrackHistoryData } from '../../types';
import { createTrackHistory, fetchTrackHistory } from './trackHistoryThunks';

interface TrackHistoryState {
  trackHistoryData: TrackHistoryData[];
  fetchTrackHistoryLoading: boolean;
  createTrackHistoryLoading: boolean;
  trackHistoryError: GlobalError | null;
}

const initialState: TrackHistoryState = {
  trackHistoryData: [],
  fetchTrackHistoryLoading: false,
  createTrackHistoryLoading: false,
  trackHistoryError: null,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrackHistory.pending, (state) => {
        state.createTrackHistoryLoading = true;
      })
      .addCase(createTrackHistory.fulfilled, (state) => {
        state.createTrackHistoryLoading = false;
      })
      .addCase(createTrackHistory.rejected, (state, { payload: error }) => {
        state.createTrackHistoryLoading = false;
        state.trackHistoryError = error || null;
      });

    builder
      .addCase(fetchTrackHistory.pending, (state) => {
        state.fetchTrackHistoryLoading = true;
      })
      .addCase(fetchTrackHistory.fulfilled, (state, { payload }) => {
        state.fetchTrackHistoryLoading = false;
        state.trackHistoryData = payload;
      })
      .addCase(fetchTrackHistory.rejected, (state, { payload: error }) => {
        state.fetchTrackHistoryLoading = false;
        state.trackHistoryError = error || null;
      });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectTrackHistoryData = (state: RootState) =>
  state.trackHistory.trackHistoryData;
export const selectCreateTrackHistoryLoading = (state: RootState) =>
  state.trackHistory.createTrackHistoryLoading;
export const selectFetchTrackHistoryLoading = (state: RootState) =>
  state.trackHistory.fetchTrackHistoryLoading;
export const selectCreateTrackHistoryError = (state: RootState) =>
  state.trackHistory.trackHistoryError;
