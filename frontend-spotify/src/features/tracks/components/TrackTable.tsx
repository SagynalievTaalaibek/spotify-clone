import React from 'react';
import {
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { UserI } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createTrackHistory } from '../../trackHistory/trackHistoryThunks';
import { selectCreateTrackHistoryLoading } from '../../trackHistory/trackHistorySlice';

interface Props {
  idTrack: string;
  name: string;
  user: UserI | null;
  duration: string;
  albumTrackNumber: string;
  isPublished: boolean;
}

const TrackTable: React.FC<Props> = ({
  idTrack,
  user,
  name,
  albumTrackNumber,
  duration,
  isPublished,
}) => {
  const dispatch = useAppDispatch();
  const trackHistoryLoading = useAppSelector(selectCreateTrackHistoryLoading);

  const playMusic = async () => {
    if (user) {
      await dispatch(createTrackHistory({ track: idTrack, token: user.token }));
    }
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {albumTrackNumber}
        </TableCell>
        <TableCell component="th" scope="row">
          <Grid container spacing={2}>
            <Grid item>{name}</Grid>
            <Grid item>
              {!isPublished && (
                <Typography component="p" sx={{ margin: 0, color: 'red' }}>
                  Not published {isPublished}
                </Typography>
              )}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell component="th" scope="row">
          {duration}
        </TableCell>
        {user ? (
          <TableCell component="th" scope="row">
            <IconButton
              color="primary"
              disabled={trackHistoryLoading}
              onClick={playMusic}
            >
              <PlayCircleIcon />
            </IconButton>
          </TableCell>
        ) : (
          ''
        )}
      </TableRow>
    </>
  );
};

export default TrackTable;
