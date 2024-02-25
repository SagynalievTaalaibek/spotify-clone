import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { TrackI } from '../../types';

export const fetchTracks = createAsyncThunk<TrackI[], string>(
  'track/fetchByAlbum',
  async (id) => {
    const response = await axiosApi.get<TrackI[]>(`/tracks?album=${id}`);
    return response.data;
  },
);
