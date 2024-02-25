import React from 'react';
import { TableCell, TableRow } from '@mui/material';

interface Props {
  name: string;
  duration: string;
  albumTrackNumber: string;
}

const TrackTable: React.FC<Props> = ({ name, albumTrackNumber, duration }) => {
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
      </TableRow>
    </>
  );
};

export default TrackTable;
