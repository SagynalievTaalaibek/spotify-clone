import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/AppToolbar/AppToolbar';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Track from './features/tracks/Track';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/albums/:id" element={<Albums />} />
            <Route path="/tracks/:id" element={<Track />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
