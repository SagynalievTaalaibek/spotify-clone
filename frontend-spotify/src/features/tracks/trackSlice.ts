import { createSlice } from '@reduxjs/toolkit';

interface TrackState {
  fetchTrackLoading: boolean;
}

const initialState: TrackState = {
  fetchTrackLoading: false,
};

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
});

export const trackReducer = trackSlice.reducer;
