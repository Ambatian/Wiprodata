import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Public Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employee Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centered Welcome Card */}
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Welcome
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default WelcomePage;
