import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createTrackHistory } from '../../trackHistory/trackHistoryThunks';
import { selectCreateTrackHistoryLoading } from '../../trackHistory/trackHistorySlice';
import {
  Button,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { DeleteOutlined } from '@mui/icons-material';
import { UserI } from '../../../types';

interface Props {
  idTrack: string;
  name: string;
  user: UserI | null;
  duration: string;
  albumTrackNumber: string;
  isPublished: boolean;
  userId: string;
  deleteLoading: boolean;
  onDelete: (id: string) => void;
}

const TrackTable: React.FC<Props> = ({
  idTrack,
  user,
  name,
  albumTrackNumber,
  duration,
  isPublished,
  userId,
  deleteLoading,
  onDelete,
}) => {
  const dispatch = useAppDispatch();
  const trackHistoryLoading = useAppSelector(selectCreateTrackHistoryLoading);

  const playMusic = async () => {
    if (user) {
      await dispatch(createTrackHistory({ track: idTrack, token: user.token }));
    }
  };

  const onDeleteTrack = () => {
    onDelete(idTrack);
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
                  Not published
                </Typography>
              )}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell component="th" scope="row">
          {duration}
        </TableCell>
        {user && (
          <TableCell component="th" scope="row" align="center">
            <IconButton
              color="primary"
              disabled={trackHistoryLoading}
              onClick={playMusic}
            >
              <PlayCircleIcon />
            </IconButton>
            {(!isPublished && user._id === userId) || user?.role === 'admin' ? (
              <IconButton
                color="primary"
                disabled={deleteLoading}
                onClick={onDeleteTrack}
              >
                <DeleteOutlined />
              </IconButton>
            ) : (
              ''
            )}
            {user && user.role === 'admin' && !isPublished && (
              <Button
                variant="contained"
                sx={{ marginLeft: 'auto', marginTop: 'auto' }}
              >
                Published
              </Button>
            )}
          </TableCell>
        )}
      </TableRow>
    </>
  );
};

export default TrackTable;
