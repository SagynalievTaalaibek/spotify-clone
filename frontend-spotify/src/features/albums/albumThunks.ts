import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { AlbumsI } from '../../../types';

export const fetchAlbumsByArtist = createAsyncThunk<AlbumsI[], string>(
  'album/fetchByArtist',
  async (id) => {
    const response = await axiosApi.get<AlbumsI[]>(`/albums/?artist=${id}`);
    console.log(response.data);
    return response.data;
  },
);
