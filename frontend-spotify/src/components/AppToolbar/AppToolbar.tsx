import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            <Link to="/" sx={{padding: '0 30px'}}>Spotify</Link>
            <Link to="/test">Google Drive Upload</Link>
            <Link to="/fileUpload" sx={{margin: "0 10px"}}>File Upload</Link>
          </Typography>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
