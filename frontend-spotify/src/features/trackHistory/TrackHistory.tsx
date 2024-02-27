import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
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
import {
  selectFetchTrackHistoryLoading,
  selectTrackHistoryData,
} from './trackHistorySlice';
import TrackHistoryTable from './components/TrackHistoryTable';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchTrackHistory } from './trackHistoryThunks';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const trackHistoryData = useAppSelector(selectTrackHistoryData);
  const trackHistoryDataLoading = useAppSelector(
    selectFetchTrackHistoryLoading,
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchTrackHistory(user.token));
    } else {
      navigate('/login');
    }
  }, [dispatch, user, navigate]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Artist</TableCell>
              <TableCell align="left">Track</TableCell>
              <TableCell align="left">Datetime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trackHistoryDataLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : trackHistoryData.length > 0 ? (
              trackHistoryData.map((track) => (
                <TrackHistoryTable
                  key={track._id}
                  artist={track.track.name}
                  album={track.track.album.name}
                  datetime={track.datetime}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No tracks history available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TrackHistory;
