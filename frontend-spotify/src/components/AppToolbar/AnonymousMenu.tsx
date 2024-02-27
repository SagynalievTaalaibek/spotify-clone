import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <Grid item>
      <Button
        variant="outlined"
        component={NavLink}
        to="/register"
        sx={{ marginRight: '10px', fontWeight: 'bolder', fontSize: '16px' }}
      >
        Sing up
      </Button>
      <Button
        variant="outlined"
        component={NavLink}
        to="/login"
        sx={{ fontWeight: 'bolder', fontSize: '16px' }}
      >
        Sing in
      </Button>
    </Grid>
  );
};

export default AnonymousMenu;
