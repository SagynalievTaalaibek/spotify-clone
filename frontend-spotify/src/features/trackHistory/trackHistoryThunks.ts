import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {
  GlobalError,
  TrackHistoryData,
  TrackHistoryMutation,
} from '../../types';
import { isAxiosError } from 'axios';

export const createTrackHistory = createAsyncThunk<
  void,
  TrackHistoryMutation,
  { rejectValue: GlobalError }
>('trackHistory/create', async (track, { rejectWithValue }) => {
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

export const fetchTrackHistory = createAsyncThunk<
  TrackHistoryData[],
  string,
  { rejectValue: GlobalError }
>('trackHistory/fetch', async (token, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get('/track_history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
