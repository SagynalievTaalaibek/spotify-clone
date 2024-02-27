import React, { useState } from 'react';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';
import { UserI } from '../../types';
import { NavLink } from 'react-router-dom';

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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
