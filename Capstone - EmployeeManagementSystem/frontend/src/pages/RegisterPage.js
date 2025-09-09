import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    
    jobTitle:"",
    departmentId:"",
    roleId:"",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/login"); // after register go to login
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="jobTitle"
            type="text"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="departmentId"
            type="text"
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="roleId"
            type="text"
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Box>

        {/* Back to Home Button */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button variant="text" onClick={() => navigate("/")}>
            ⬅ Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
