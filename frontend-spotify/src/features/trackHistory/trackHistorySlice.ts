import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { GlobalError } from '../../types';

interface TrackHistoryState {
  createTrackHistoryLoading: boolean;
  createTrackHistoryError: GlobalError | null;
}

const initialState: TrackHistoryState = {
  createTrackHistoryLoading: false,
  createTrackHistoryError: null,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectCreateTrackHistoryLoading = (state: RootState) =>
  state.trackHistory.createTrackHistoryLoading;
export const selectCreateTrackHistoryError = (state: RootState) =>
  state.trackHistory.createTrackHistoryError;
