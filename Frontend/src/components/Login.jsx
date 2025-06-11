import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { loginUser } from '../redux/authSlice';
import { loginRequest } from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!userId) {
      setError('ID is required');
      return;
    }
    const result = await loginRequest(userId);
    if (result.status === 'error') {
      setError('Login failed. Please check your ID.');
      return;
    }
    else if (result.status === 'notfound') {
      setError('User not found. Please sign up.');
      navigate('/signup');
    }
    else if (result.name === 'Admin') {       
      dispatch(loginUser(result));
      navigate('/admin');
    } else if (result.name) {
      dispatch(loginUser(result));
      navigate('/dashboard');
    } else {
      setError('Unexpected response from server.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit} style={{ width: 300 }}>
        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          margin="normal"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Send
        </Button>
      </form>
    </Box>
  );
};

export default Login;
