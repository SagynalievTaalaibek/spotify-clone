import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { TrackI, TrackMutation } from '../../types';

export const fetchTracks = createAsyncThunk<TrackI[], string>(
  'track/fetchByAlbum',
  async (id) => {
    const response = await axiosApi.get<TrackI[]>(`/tracks?album=${id}`);
    return response.data;
  },
);

export const createTrack = createAsyncThunk<void, TrackMutation>(
  'track/create',
  async (track) => {
    await axiosApi.post('/tracks', track);
  },
);
