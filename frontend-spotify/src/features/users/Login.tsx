import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError, selectLoginLoading, setGlobalToken } from './usersSlice';
import { googleLogin, login } from './usersThunks';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { LoginMutation } from '../../types';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    dispatch(setGlobalToken(credential));
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}
        <Box sx={{ pt: 2 }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log('Login failed!');
            }}
          />
        </Box>
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="E-mail"
                name="email"
                autoComplete="current-email"
                value={state.email}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loginLoading}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Or sing up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
