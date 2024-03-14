import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';
import { UserI } from '../../types';

interface Props {
  user: UserI;
}

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <Grid item>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', marginRight: '10px' }}
        >
          <Link to="/track-history">Track History</Link>
        </Typography>
      </Grid>

      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}!
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
