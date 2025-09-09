import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(s=>s.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display:"flex", flexDirection:"column", gap:2 }}>
          <TextField label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required fullWidth />
          <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required fullWidth />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button variant="contained" type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;