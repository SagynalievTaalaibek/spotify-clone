import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectArtist } from '../../artists/artistsSlice';
import FileInput from '../../../components/FileInput/FileInput';
import { Grid, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { AlbumMutation } from '../../../types';

interface Props {
  isLoading: boolean;
  onAlbumSubmit: (album: AlbumMutation) => void;
}

const initialState: AlbumMutation = {
  name: '',
  artist: '',
  yearOfIssue: '',
  image: null,
};

const AlbumForm: React.FC<Props> = ({ isLoading, onAlbumSubmit }) => {
  const [state, setState] = useState<AlbumMutation>(initialState);
  const artists = useAppSelector(selectArtist);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAlbumSubmit(state);
    setState(initialState);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
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
            onChange={inputChangeHandler}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="yearOfIssue"
            label="Year Of Issue"
            name="yearOfIssue"
            value={state.yearOfIssue}
            onChange={inputChangeHandler}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            select
            id="artist"
            label="Artist"
            value={artists.length > 0 ? state.artist : ''}
            onChange={inputChangeHandler}
            name="artist"
            required
          >
            <MenuItem value="" disabled>
              Please select artist
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
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

export default AlbumForm;
