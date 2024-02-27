import React from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { UserI } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createTrackHistory } from '../../trackHistory/trackHistoryThunks';
import { selectCreateTrackHistoryLoading } from '../../trackHistory/trackHistorySlice';

interface Props {
  idTrack: string;
  name: string;
  user: UserI;
  duration: string;
  albumTrackNumber: string;
}

const TrackTable: React.FC<Props> = ({
  idTrack,
  user,
  name,
  albumTrackNumber,
  duration,
}) => {
  const dispatch = useAppDispatch();
  const trackHistoryLoading = useAppSelector(selectCreateTrackHistoryLoading);

  const playMusic = async () => {
    await dispatch(createTrackHistory({ track: idTrack, token: user.token }));
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {albumTrackNumber}
        </TableCell>
        <TableCell component="th" scope="row">
          {name}
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
