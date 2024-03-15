import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createArtist } from './artistsThunks';
import { selectArtistCreateLoading } from './artistsSlice';
import ArtistForm from './components/ArtistForm';
import { Typography } from '@mui/material';
import { ArtistMutation } from '../../types';

const NewArtist = () => {
  const createLoading = useAppSelector(selectArtistCreateLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onArtistCreate = async (artist: ArtistMutation) => {
    await dispatch(createArtist(artist));
    navigate('/');
  };

  return (
    <>
      <Typography
        variant="h3"
        component="div"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        Add new artist
      </Typography>
      <ArtistForm isLoading={createLoading} onArtistSubmit={onArtistCreate} />
    </>
  );
};

export default NewArtist;
