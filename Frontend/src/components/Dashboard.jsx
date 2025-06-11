import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Typography, AppBar, Toolbar } from '@mui/material';
import { logoutUser } from '../redux/authSlice';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { fetchNewTopics, fetchPromptsHistory } from '../api';
import History from './History';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleNewTopic = async () => {
    const result = await fetchNewTopics(user?.id);
    alert(result.message || 'A new topic was selected!');
  };

  const handleHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchPromptsHistory(user?.id);
      setHistory(Array.isArray(data) ? data : []);
      setShowHistory(true);
      navigate('/dashboard/history');
    } catch (err) {
      setError('Failed to load history');
      setHistory([]);
    }
    setLoading(false);
  };

  return (
    <Box minHeight="100vh" width="100vw" display="flex" flexDirection="column" p={0} m={0} sx={{ overflow: 'hidden', margin: 0, padding: 0 }}>
      <AppBar position="static" color="default" elevation={1} sx={{ m: 0, p: 0, minHeight: 90 }}>
        <Toolbar sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          m: 0,
          p: 0,
          width: '100%',
          minHeight: 90,
          gap: 6
        }}>
          <Typography variant="h4" color="primary" fontWeight={300} sx={{ fontSize: 38, letterSpacing: 1, pl: 10, display: 'flex', alignItems: 'center', height: '100%' }}>
            {user?.name || 'User'}
          </Typography>
          <Button color="error" variant="outlined" onClick={handleLogout} sx={{ fontWeight: 600, background: '#ffd6d6', borderColor: '#ffb3b3', color: '#b22222', mr: 10, '&:hover': { background: '#ffb3b3' }, height: 48, display: 'flex', alignItems: 'center' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/history" element={<History history={history} loading={loading} error={error} onBack={() => { setShowHistory(false); navigate('/dashboard'); }} />} />
        <Route path="*" element={
          <Box flex={1} display="flex" alignItems="center" justifyContent="center" width="100%" p={0} m={0} sx={{ margin: 0, padding: 0 }}>
            <Box display="flex" flexDirection="row" gap={4} width="80%" maxWidth={900} sx={{ margin: 0, padding: 0 }}>
              <Button variant="contained" color="primary" 
                sx={{
                  width: '50%',
                  height: 180,
                  minHeight: 120,
                  aspectRatio: '1/1',
                  fontWeight: 600,
                  fontSize: 20,
                  borderRadius: 3,
                  boxShadow: 2,
                  background: '#b2e0d6',
                  color: '#1a3c34',
                  '&:hover': { background: '#8fd3c6' }
                }}
                onClick={handleNewTopic}
              >
                Learn Something New
              </Button>
              <Button variant="outlined" color="primary"
                sx={{
                  width: '50%',
                  height: 180,
                  minHeight: 120,
                  aspectRatio: '1/1',
                  fontWeight: 600,
                  fontSize: 20,
                  borderRadius: 3,
                  boxShadow: 2,
                  background: '#f7e6b7',
                  color: '#7c5c0b',
                  borderColor: '#f7e6b7',
                  '&:hover': { background: '#f3d98c', borderColor: '#f3d98c' }
                }}
                onClick={handleHistory}
              >
                View Learning History
              </Button>
            </Box>
          </Box>
        } />
      </Routes>
    </Box>
  );
};

export default Dashboard;