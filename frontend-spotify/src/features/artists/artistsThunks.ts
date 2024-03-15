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

export const deleteArtist = createAsyncThunk<void, string>(
  'artist/delete',
  async (id, { dispatch }) => {
    await axiosApi.delete(`/artists/${id}`);
    dispatch(fetchArtists());
  },
);

export const publishArtist = createAsyncThunk<void, string>(
  'artist/publish',
  async (id, { dispatch }) => {
    await axiosApi.patch(`/artists/${id}/togglePublished`);
    dispatch(fetchArtists());
  },
);
