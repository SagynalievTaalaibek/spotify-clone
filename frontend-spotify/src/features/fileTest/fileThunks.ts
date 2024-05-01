import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';


export const fileUpload = createAsyncThunk<string, File>(
  'fileUpload/create',
  async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axiosApi.post('/test/upload-image', formData);
    return response.data.filename;
  },
);