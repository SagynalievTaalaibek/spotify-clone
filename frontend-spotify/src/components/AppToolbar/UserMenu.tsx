import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';
import {
  Avatar,
  Button,
  Grid,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';
import { UserI } from '../../types';
import { apiURL, routeItems } from '../../constants';

interface Props {
  user: UserI;
}

const Link = styled(NavLink)({
  color: 'inherit',
  marginRight: '10px',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  let avatarImage = '';

  if (user.avatar.includes('https://')) {
    avatarImage = user.avatar;
  } else {
    avatarImage = apiURL + '/' + user.avatar;
  }
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Grid item>
        <Typography variant="h6" component="div">
          <Link to="/track-history">Track History</Link>
        </Typography>
      </Grid>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.displayName}!
      </Button>
      <Avatar alt={user.displayName} src={avatarImage} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {routeItems.map((item) => (
          <MenuItem key={item.id}>
            <Link to={item.path}>
              {item.page.charAt(0).toUpperCase() + item.page.slice(1)}
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
