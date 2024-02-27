import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { TrackHistoryMutation, ValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const createTrackHistory = createAsyncThunk<
  void,
  TrackHistoryMutation,
  { rejectValue: ValidationError }
>('trackHistory', async (track, { rejectWithValue }) => {
  try {
    await axiosApi.post(
      '/track_history',
      { track: track.track },
      {
        headers: {
          Authorization: `Bearer ${track.token}`,
        },
      },
    );
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
