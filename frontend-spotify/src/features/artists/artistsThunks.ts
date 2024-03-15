import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ArtistMutation, ArtistsI } from '../../types';

export const fetchArtists = createAsyncThunk<ArtistsI[]>(
  'artist/fetchAll',
  async () => {
    const response = await axiosApi.get<ArtistsI[]>('/artists');
    return response.data;
  },
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artist/create',
  async (artist) => {
    const formData = new FormData();

    const keys = Object.keys(artist) as (keyof ArtistMutation)[];
    keys.forEach((key) => {
      const value = artist[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData);
  },
);
