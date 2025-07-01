import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const userData = { username, password };
      const response = await loginUser(userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('base_id', response.user.base_id);
        localStorage.setItem('role', response.user.role);
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage('Invalid username or password');
    }
  };

  const fillCredentials = (user, pass) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            value={username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange}
            margin="normal"
            required
          />
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>
          👥 Available User Credentials
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}
            >
              <Box>
                <Typography><strong>Admin</strong></Typography>
                <Typography>Username: <code>adminuser</code></Typography>
                <Typography>Password: <code>admin123</code></Typography>
              <Button variant="outlined" onClick={() => fillCredentials('adminuser', 'admin123')}>
                Use
              </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}
            >
              <Box>
                <Typography><strong>Base Commander</strong></Typography>
                <Typography>Username: <code>commander</code></Typography>
                <Typography>Password: <code>commander123</code></Typography>
              <Button variant="outlined" onClick={() => fillCredentials('commander', 'commander123')}>
                Use
              </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}
            >
              <Box>
                <Typography><strong>Logistics Officer</strong></Typography>
                <Typography>Username: <code>logistics</code></Typography>
                <Typography>Password: <code>logistic123</code></Typography>
              <Button variant="outlined" onClick={() => fillCredentials('logistics', 'logistics123')}>
                Use
              </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
