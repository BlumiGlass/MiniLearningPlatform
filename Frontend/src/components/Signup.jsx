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
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Box boxShadow={3} borderRadius={3} p={4} bgcolor="#fff" minWidth={340}>
        <Typography variant="h5" mb={2} align="center" color="primary.main" fontWeight={600}>Sign up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="ID"
            name="id"
            value={form.id}
            onChange={handleChange}
            error={!!errors.id}
            helperText={errors.id}
            fullWidth
            margin="normal"
            maxLength={9}
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
            maxLength={10}
          />
          {apiError && <Typography color="error" align="center">{apiError}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, borderRadius: 2, fontWeight: 600, fontSize: 16 }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;