import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { UserI } from '../../../types';

interface Props {
  name: string;
  user: UserI | null;
  duration: string;
  albumTrackNumber: string;
}

const TrackTable: React.FC<Props> = ({
  user,
  name,
  albumTrackNumber,
  duration,
}) => {
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
        <TableCell component="th" scope="row">
          {user ? user.username : ''}
        </TableCell>
      </TableRow>
    </>
  );
};

export default TrackTable;
