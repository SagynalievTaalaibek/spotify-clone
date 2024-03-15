import {
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTrackFetchLoading, selectTracks } from './trackSlice';
import TrackTable from './components/TrackTable';
import { useEffect } from 'react';
import { fetchTracks } from './trackThunks';
import { useLocation, useParams } from 'react-router-dom';
import { selectUser } from '../users/usersSlice';
import { selectCreateTrackHistoryError } from '../trackHistory/trackHistorySlice';

const Track = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const artist = searchParams.get('artist');
  const album = searchParams.get('album');

  const trackData = useAppSelector(selectTracks);
  const trackFetchLoading = useAppSelector(selectTrackFetchLoading);
  const userData = useAppSelector(selectUser);
  const trackHistoryError = useAppSelector(selectCreateTrackHistoryError);

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);

  return (
    <>
      <Typography variant="h5">Artist: {artist && artist}</Typography>
      <Typography variant="h5">Album: {album && album}</Typography>
      {trackHistoryError ? (
        <Alert severity="error">{trackHistoryError.error}</Alert>
      ) : (
        ''
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Number</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Duration</TableCell>
              {userData ? <TableCell align="left">Action</TableCell> : ''}
            </TableRow>
          </TableHead>
          <TableBody>
            {trackFetchLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : trackData.length > 0 ? (
              trackData.map((track) => (
                <TrackTable
                  key={track._id}
                  idTrack={track._id}
                  user={userData}
                  name={track.name}
                  duration={track.duration}
                  albumTrackNumber={track.albumTrackNumber}
                  isPublished={track.isPublished}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No tracks available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Track;
