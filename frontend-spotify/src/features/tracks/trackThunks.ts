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

export const deleteTrack = createAsyncThunk<void, string>(
  'track/delete',
  async (id) => {
    await axiosApi.delete(`/tracks/${id}`);
  },
);
