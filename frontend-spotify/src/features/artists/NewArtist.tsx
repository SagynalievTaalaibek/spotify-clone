import { Typography } from '@mui/material';
import ArtistForm from './components/ArtistForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtistCreateLoading } from './artistsSlice';
import { ArtistMutation } from '../../types';
import { createArtist } from './artistsThunks';
import { useNavigate } from 'react-router-dom';

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
