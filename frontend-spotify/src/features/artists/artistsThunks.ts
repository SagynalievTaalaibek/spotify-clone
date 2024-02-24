import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ArtistsI } from '../../../types';

export const fetchArtists = createAsyncThunk<ArtistsI[]>(
  'artist/fetchAll',
  async () => {
    const response = await axiosApi.get<ArtistsI[]>('/artists');
    return response.data;
  },
);
