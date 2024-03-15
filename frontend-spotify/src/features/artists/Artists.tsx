import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { fetchArtists } from './artistsThunks';
import {
  selectArtist,
  selectArtistDeleteLoading,
  selectArtistFetchLoading,
  selectArtistPublishLoading,
} from './artistsSlice';
import ArtistCard from './components/ArtistCard';
import { CircularProgress, Grid, Typography } from '@mui/material';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artistsData = useAppSelector(selectArtist);
  const fetchArtistLoading = useAppSelector(selectArtistFetchLoading);
  const deleteLoading = useAppSelector(selectArtistDeleteLoading);
  const publishLoading = useAppSelector(selectArtistPublishLoading);

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
                isPublished={item.isPublished}
                userId={item.user}
                deleteLoading={deleteLoading}
                publishLoading={publishLoading}
              />
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Artists;
