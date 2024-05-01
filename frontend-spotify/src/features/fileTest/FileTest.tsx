import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ImageUpload from './components/ImageUpload';
import { useAppSelector } from '../../app/hooks';
import { selectImageLocation } from './fileSlice';


const FileTest = () => {
  const imageLocation = useAppSelector(selectImageLocation);

  const [state, setState] = useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    setState(prevState => ({ ...prevState, image: imageLocation }));
  }, [imageLocation]);


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(state);
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
            onChange={(e) => setState((prevState) => ({ ...prevState, name: e.target.value }))}
            required
          />
        </Grid>
        <Grid item>
          <ImageUpload
            name="image"
          />
        </Grid>
        <Grid item>
          <Button type="submit">Send</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FileTest;