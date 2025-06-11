import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';
import { signupRequest } from '../api';

const Signup = () => {
  const [form, setForm] = useState({ id: '', name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.id) newErrors.id = 'ID is required';
    else if (!/^\d{1,9}$/.test(form.id)) newErrors.id = 'ID must be up to 9 digits';
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.phone) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (validate()) {
      const result = await signupRequest(form);
      if (result && result.id) {
        dispatch(loginUser(result));
        navigate('/dashboard');
      } else {
        setApiError(result.message || 'Signup failed.');
      }
    }
  };

  return (
    <Box minHeight="100vh" width="100vw" display="flex" alignItems="center" justifyContent="center" sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
      <Box boxShadow={3} borderRadius={3} p={4} bgcolor="#fff" minWidth={340} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography variant="h5" mb={2} align="center" color="primary.main" fontWeight={600}>Sign up</Typography>
        <form onSubmit={handleSubmit} style={{ width: 300 }}>
          <TextField
            label="ID"
            name="id"
            value={form.id}
            onChange={handleChange}
            error={!!errors.id}
            helperText={errors.id}
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 9 }}
          />
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            margin="normal"
            inputProps={{ maxLength: 10 }}
          />
          {apiError && <Typography color="error" align="center">{apiError}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, borderRadius: 2, fontWeight: 600, fontSize: 16, background: '#b2e0d6', color: '#1a3c34', '&:hover': { background: '#8fd3c6' } }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;