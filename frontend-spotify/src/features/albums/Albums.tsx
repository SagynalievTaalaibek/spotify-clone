import { CircularProgress, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAlbumFetchLoading, selectAlbumsByArtist } from './albumSlice';
import { fetchAlbumsByArtist } from './albumThunks';
import AlbumCard from './components/AlbumCard';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albumsData = useAppSelector(selectAlbumsByArtist);
  const fetchAlbumsLoading = useAppSelector(selectAlbumFetchLoading);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch(fetchAlbumsByArtist(id));
  }, [dispatch, id]);

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
        {albumsData.length > 0
          ? `Name: ${albumsData[0]?.artist.name}`
          : 'No albums'}
      </Typography>
      <Grid container spacing={2}>
        {fetchAlbumsLoading ? (
          <CircularProgress />
        ) : (
          albumsData.map((item) => (
            <AlbumCard
              key={item._id}
              id={item._id}
              artistName={item.artist.name}
              name={item.name}
              image={item.image}
              yearOfIssue={item.yearOfIssue}
            />
          ))
        )}
      </Grid>
    </>
  );
};

export default Albums;
