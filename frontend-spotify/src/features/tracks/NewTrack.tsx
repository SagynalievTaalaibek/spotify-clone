import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createTrack } from './trackThunks';
import { selectTrackCreateLoading } from './trackSlice';
import TrackForm from './components/TrackForm';
import { Typography } from '@mui/material';
import { TrackMutation } from '../../types';

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectTrackCreateLoading);

  const navigate = useNavigate();
  const onCreateTrack = async (track: TrackMutation) => {
    await dispatch(createTrack(track));
    navigate('/');
  };

  return (
    <>
      <Typography
        variant="h3"
        component="div"
        sx={{ my: 2, fontWeight: 'bold' }}
      >
        Add new track
      </Typography>
      <TrackForm isLoading={createLoading} onTrackSubmit={onCreateTrack} />
    </>
  );
};

export default NewTrack;
