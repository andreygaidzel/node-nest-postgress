import React, { type FC, useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store.ts';
import { logout } from '@/store/reducers/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Paths from '@/utils/paths.ts';
import type { IUserTokenData } from '@/utils/token.ts';

const UserAvatar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user: userFromStore  } = useSelector((state: RootState) => state.auth);
  const { email } = userFromStore as IUserTokenData;

  const user = {
    name: email?.split('@')[0],
    email,
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>  setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate(Paths.LOGIN);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleClick} size="small">
          <Avatar sx={{ width: 56, height: 56 }}>
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>

        <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="body1" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 180,
                borderRadius: 2,
              },
            }
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem disabled>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </MenuItem>

          <Divider/>

          <MenuItem onClick={() => alert("Profile")}>
            <PersonIcon fontSize="small" sx={{ mr: 1 }}/>
            Profile
          </MenuItem>

          <Divider/>

          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} color="error"/>
            <Typography color="error">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserAvatar;