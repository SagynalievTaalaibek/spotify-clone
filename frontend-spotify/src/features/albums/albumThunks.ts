import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { AlbumMutation, AlbumsI } from '../../types';

export const fetchAlbumsByArtist = createAsyncThunk<AlbumsI[], string>(
  'album/fetchByArtist',
  async (id) => {
    const response = await axiosApi.get<AlbumsI[]>(`/albums/?artist=${id}`);
    return response.data;
  },
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'album/create',
  async (album) => {
    const formData = new FormData();

    const keys = Object.keys(album) as (keyof AlbumMutation)[];
    keys.forEach((key) => {
      const value = album[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/albums', formData);
  },
);
