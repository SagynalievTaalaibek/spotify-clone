import { Typography } from '@mui/material';
import ArtistForm from './components/ArtistForm';

const NewArtist = () => {
  const createLoading = false;

  return (
    <>
      <Typography
        variant="h3"
        component="div"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        Add new artist
      </Typography>
      <ArtistForm isLoading={createLoading} />
    </>
  );
};

export default NewArtist;
