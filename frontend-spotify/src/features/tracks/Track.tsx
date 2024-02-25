import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTrackFetchLoading, selectTracks } from './trackSlice';
import TrackTable from './components/TrackTable';
import { useEffect } from 'react';
import { fetchTracks } from './trackThunks';
import { useParams } from 'react-router-dom';

const Track = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const trackData = useAppSelector(selectTracks);
  const trackFetchLoading = useAppSelector(selectTrackFetchLoading);

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Number</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Duration</TableCell>
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
                  name={track.name}
                  duration={track.duration}
                  albumTrackNumber={track.albumTrackNumber}
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
