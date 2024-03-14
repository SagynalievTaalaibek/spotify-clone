import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import AppToolbar from './components/AppToolbar/AppToolbar';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Track from './features/tracks/Track';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TrackHistory from './features/trackHistory/TrackHistory';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Container, CssBaseline } from '@mui/material';
import NotFound from './components/NotFound';
import { routeItems } from './constants';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <AppToolbar />
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/albums/:id" element={<Albums />} />
            <Route path="/tracks/:id" element={<Track />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/track-history"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <TrackHistory />
                </ProtectedRoute>
              }
            />
            {routeItems.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <ProtectedRoute isAllowed={!!user}>
                    {React.createElement(item.component)}
                  </ProtectedRoute>
                }
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
