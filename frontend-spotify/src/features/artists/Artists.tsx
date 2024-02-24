import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchArtists } from './artistsThunks';
import { selectArtist, selectArtistFetchLoading } from './artistsSlice';
import ArtistCard from './components/ArtistCard';
import { CircularProgress, Grid, Typography } from '@mui/material';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artistsData = useAppSelector(selectArtist);
  const fetchArtistLoading = useAppSelector(selectArtistFetchLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Artist List</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          {fetchArtistLoading ? (
            <CircularProgress />
          ) : (
            artistsData.map((item) => (
              <ArtistCard
                key={item._id}
                id={item._id}
                name={item.name}
                photo={item.photo}
              />
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Artists;
