import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAlbumsByArtist } from '../../albums/albumThunks';
import { fetchArtists } from '../../artists/artistsThunks';
import { selectArtist } from '../../artists/artistsSlice';
import { selectAlbumsByArtist } from '../../albums/albumSlice';
import { Grid, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { TrackMutation } from '../../../types';

interface Props {
  isLoading: boolean;
  onTrackSubmit: (track: TrackMutation) => void;
}

const initialState: TrackMutation = {
  name: '',
  album: '',
  duration: '',
  albumTrackNumber: '',
};

const TrackForm: React.FC<Props> = ({ isLoading, onTrackSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtist);
  const albums = useAppSelector(selectAlbumsByArtist);

  const [state, setState] = useState<TrackMutation>(initialState);
  const [artist, setArtist] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrackSubmit(state);
  };

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (artist.length > 0) {
      dispatch(fetchAlbumsByArtist(artist));
    }
  }, [dispatch, artist]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Grid
        container
        direction="column"
        spacing={2}
        sx={{ width: { md: '100%', lg: '60%' } }}
      >
        <Grid item>
          <TextField
            id="name"
            label="Name"
            name="name"
            value={state.name}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="duration"
            label="Duration"
            name="duration"
            value={state.duration}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="albumTrackNumber"
            label="Track Number"
            name="albumTrackNumber"
            type="number"
            value={state.albumTrackNumber}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            select
            id="artist"
            label="Artist"
            value={artists.length > 0 ? artist : ''}
            onChange={(e) => setArtist(e.target.value)}
            name="artist"
            required
          >
            <MenuItem value="">Please select artist</MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            select
            id="album"
            label="Album"
            value={albums.length > 0 ? state.album : ''}
            onChange={onInputChange}
            name="album"
            required
          >
            <MenuItem value="">Please select album</MenuItem>
            {albums.map((album) => (
              <MenuItem key={album._id} value={album._id}>
                {album.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<Save />}
            sx={{ mt: 1 }}
          >
            Create
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;
