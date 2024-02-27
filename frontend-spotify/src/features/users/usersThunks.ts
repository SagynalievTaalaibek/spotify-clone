import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  ValidationError,
} from '../../types';

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/users', userData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      '/users/sessions',
      loginMutation,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
