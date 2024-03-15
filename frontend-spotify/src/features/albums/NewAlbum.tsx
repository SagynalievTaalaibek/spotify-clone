import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtists } from '../artists/artistsThunks';
import { createAlbum } from './albumThunks';
import { selectAlbumCreateLoading } from './albumSlice';
import AlbumForm from './components/AlbumForm';
import { Typography } from '@mui/material';
import { AlbumMutation } from '../../types';
const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const createLoading = useAppSelector(selectAlbumCreateLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const onCreateAlbum = async (album: AlbumMutation) => {
    await dispatch(createAlbum(album));
    navigate('/');
  };

  return (
    <>
      <Typography
        variant="h3"
        component="div"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        Add new album
      </Typography>
      <AlbumForm isLoading={createLoading} onAlbumSubmit={onCreateAlbum} />
    </>
  );
};

export default NewAlbum;
