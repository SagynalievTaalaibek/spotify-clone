import React, { useState } from 'react';
import FileInput from '../../../components/FileInput/FileInput';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
import { ArtistMutation } from '../../../types';

interface Props {
  isLoading: boolean;
  onArtistSubmit: (artist: ArtistMutation) => void;
}

const initialState: ArtistMutation = {
  name: '',
  photo: null,
  information: '',
};
const ArtistForm: React.FC<Props> = ({ isLoading, onArtistSubmit }) => {
  const [state, setState] = useState<ArtistMutation>(initialState);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onArtistSubmit(state);
    setState(initialState);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            value={state.name}
            onChange={onInputChange}
            name="name"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            multiline
            rows={3}
            id="information"
            label="Information"
            name="information"
            value={state.information}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item>
          <FileInput
            label="Image"
            name="photo"
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

export default ArtistForm;
