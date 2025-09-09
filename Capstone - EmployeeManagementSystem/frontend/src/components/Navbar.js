import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Management System
        </Typography>
        <Box sx={{ mr: 2 }}>{user?.email} ({user?.role})</Box>
        <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;