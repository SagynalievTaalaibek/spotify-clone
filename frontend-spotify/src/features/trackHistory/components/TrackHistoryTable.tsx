import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

dayjs.extend(LocalizedFormat);
interface Props {
  artist: string;
  album: string;
  datetime: string;
}

const TrackHistoryTable: React.FC<Props> = ({ artist, datetime, album }) => {
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {artist}
        </TableCell>
        <TableCell component="th" scope="row">
          {album}
        </TableCell>
        <TableCell component="th" scope="row">
          {dayjs(datetime).format('LLL')}
        </TableCell>
      </TableRow>
    </>
  );
};

export default TrackHistoryTable;
