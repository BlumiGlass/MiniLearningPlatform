import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Typography, AppBar, Toolbar } from '@mui/material';
import { logoutUser } from '../redux/authSlice';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { fetchPromptsHistory } from '../api';
import History from './History';
import NewPrompt from './NewPrompt';
import LogoutIcon from '@mui/icons-material/Logout';
import { setloading } from '../redux/historySlice';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNewPrompt, setShowNewPrompt] = useState(false);
  const [hoverHistory, setHoverHistory] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleNewTopic = () => {
    navigate('/dashboard/new');
  };

  const handleHistory = () => {
    dispatch(setloading(true));
    navigate('/dashboard/history');
  }

  return (
    <Box
      minHeight="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      p={0} m={0}
      sx={{
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        zIndex: 0
      }}>
      <AppBar
        position="static"
        color="default"
        elevation={3}
        sx={{
          m: 0, p: 0,
          minHeight: 90,
          background: '#fff',
          color: '#1a3c34',
          boxShadow: '0 2px 8px 0 rgba(60,60,60,0.08)'
        }}>
        <Toolbar sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          m: 0,
          p: 0,
          width: '100%',
          minHeight: 90,
          gap: 6
        }}>
          <Typography variant="h4"
            sx={{
              fontWeight: 300,
              fontSize: 38,
              letterSpacing: 1,
              pl: 10,
              color: '#1a3c34',
              display: 'flex',
              alignItems: 'flex-end',
              height: '100%'
            }}>
            {user?.name || 'User'}
          </Typography>
          <Button color="primary" variant="contained" onClick={handleLogout}
            sx={{
              fontWeight: 600,
              background: '#b2e0d6',
              color: '#1a3c34',
              borderColor: '#b2e0d6',
              mr: 10,
              zIndex: 1,
              '&:hover': { background: '#8fd3c6' }, height: 48, display: 'flex', alignItems: 'flex-end'
            }}
            startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="calc(100vh - 90px)"
        width="100%"
        p={0} m={0}
        sx={{ margin: 0, padding: 0 }}>
        <Routes>
          <Route
            path="/history"
            element={
              <History
                onBack={() => { navigate('/dashboard'); }}
              />
            }
          />
          <Route
            path="/new"
            element={
              <NewPrompt onBack={() => { navigate('/dashboard'); }}
              />
            }
          />
          <Route path="*" element={
            <Box flex={1} display="flex" alignItems="center" justifyContent="center" width="100%" p={0} m={0} sx={{ margin: 0, padding: 0, height: '100%' }}>
              <Box display="flex" flexDirection="row" gap={6} width="80%" maxWidth={900} alignItems="center" justifyContent="center" height="100%" sx={{ margin: 0, padding: 0 }}>
                <Button variant="contained" color="primary"
                  sx={{
                    width: 320,
                    height: 320,
                    minWidth: 220,
                    minHeight: 220,
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 30,
                    letterSpacing: 1,
                    boxShadow: 8,
                    background: 'linear-gradient(135deg, #b2e0d6 0%, #c3cfe2 100%)',
                    color: '#1a3c34',
                    transition: 'transform 0.18s',
                    mx: 6,
                    mb: 2,
                    p: 0,
                    textAlign: 'center',
                    whiteSpace: 'normal',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #8fd3c6 0%, #b2e0d6 100%)',
                      transform: 'scale(1.08)'
                    }
                  }}
                  onClick={handleNewTopic}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
                    <Box sx={{ fontSize: 110, mb: 1, color: '#1a3c34', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📚</Box>
                    <Typography variant="subtitle1" sx={{ fontSize: 38, fontWeight: 900, color: '#1a3c34', opacity: 0.95, mt: 1, letterSpacing: 1, lineHeight: 1, textAlign: 'center' }}>
                      LEARN
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: 20, fontWeight: 700, color: '#1a3c34', opacity: 0.85, letterSpacing: 0.5, mt: 0.5, textAlign: 'center', wordBreak: 'break-word' }}>
                      Something New
                    </Typography>
                  </Box>
                </Button>
                <Button
                  className={`dashboard-btn${hoverHistory ? ' hovering' : ''}`}
                  disableRipple
                  onMouseEnter={() => setHoverHistory(true)}
                  onMouseLeave={() => setHoverHistory(false)}
                  sx={{
                    width: 340,
                    height: 340,
                    minWidth: 220,
                    minHeight: 220,
                    borderRadius: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 30,
                    letterSpacing: 1,
                    color: '#1a3c34',
                    mx: 6,
                    mb: 2,
                    p: 0,
                    textAlign: 'center',
                    whiteSpace: 'normal',
                    background: 'linear-gradient(135deg, #f9c5d1 0%, #fbc2eb 100%)', // גווני ורוד
                    boxShadow: 8,
                    transition: 'transform 0.18s',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #fcb7b7 0%, #fbc2eb 100%)', // גווני ורוד כהה יותר בהובר
                      transform: 'scale(1.08)'
                    }
                  }}
                  onClick={handleHistory}
                >
                  <Box
                    className="dashboard-btn-icon"
                    sx={{
                      fontSize: 120,
                      mb: 1,
                      color: '#1a3c34',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >🕑</Box>
                  <Typography variant="subtitle2" sx={{ fontSize: 20, fontWeight: 700, color: '#1a3c34', opacity: 0.9, letterSpacing: 0.5, mt: 1, textAlign: 'center', wordBreak: 'break-word' }}>
                    View Learning
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: 38, fontWeight: 900, color: '#1a3c34', opacity: 0.95, mt: 0.5, letterSpacing: 1, lineHeight: 1, textAlign: 'center' }}>
                    HISTORY
                  </Typography>
                </Button>
              </Box>
            </Box>
          } />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;