import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchAllUsers, fetchPromptsHistory } from '../api';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [userPrompts, setUserPrompts] = useState({});
  const [loadingPrompts, setLoadingPrompts] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoadingUsers(true);
    fetchAllUsers()
      .then(data => setUsers(data))
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoadingUsers(false));
  }, []);

  const handleAccordionChange = userId => (event, isExpanded) => {
    setExpanded(isExpanded ? userId : false);
    if (isExpanded && !userPrompts[userId]) {
      setLoadingPrompts(prev => ({ ...prev, [userId]: true }));
      fetchPromptsHistory(userId)
        .then(data => setUserPrompts(prev => ({ ...prev, [userId]: data })))
        .catch(() => setError('Failed to load prompts'))
        .finally(() => setLoadingPrompts(prev => ({ ...prev, [userId]: false })));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Box minHeight="100vh" width="100vw" bgcolor="#f5f7fa" sx={{ position: 'absolute', top: 0, left: 0, m: 0, p: 0, overflow: 'hidden' }}>
      <AppBar position="static" color="default" elevation={3} sx={{ m: 0, p: 0, minHeight: 90, background: '#fff', color: '#1a3c34', boxShadow: '0 2px 8px 0 rgba(60,60,60,0.08)' }}>
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
          <Typography variant="h4" sx={{ fontWeight: 300, fontSize: 38, letterSpacing: 1, pl: 10, color: '#1a3c34', display: 'flex', alignItems: 'flex-end', height: '100%' }}>
            Admin
          </Typography>
          <Button color="primary" variant="contained" onClick={handleLogout} sx={{ fontWeight: 600, background: '#b2e0d6', color: '#1a3c34', borderColor: '#b2e0d6', mr: 10, '&:hover': { background: '#8fd3c6' }, height: 48, display: 'flex', alignItems: 'flex-end' }} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" pt={12}>
        <Box width="100%" maxWidth={600} bgcolor="#fff" p={4} borderRadius={3} boxShadow={3} mx="auto">
          <Typography variant="h5" mb={3} fontWeight={600} color="primary">Admin Dashboard</Typography>
          {error && <Typography color="error" mb={2}>{error}</Typography>}
          {loadingUsers ? (
            <Box display="flex" justifyContent="center" my={4}><CircularProgress /></Box>
          ) : (
            users.map(user => (
              <Accordion key={user.id} expanded={expanded === user.id} onChange={handleAccordionChange(user.id)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight={600}>{user.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {loadingPrompts[user.id] ? (
                    <Box display="flex" justifyContent="center"><CircularProgress size={20} /></Box>
                  ) : userPrompts[user.id] && userPrompts[user.id].length > 0 ? (
                    <List>
                      {userPrompts[user.id].map(prompt => (
                        <ListItem key={prompt.id} alignItems="flex-start" sx={{ borderRadius: 2, mb: 1 }}>
                          <ListItemText
                            primary={<>
                              <Typography fontWeight={600} color="primary.main">{prompt.category.name || 'No Category'} / {prompt.subCategory.name || 'No Subcategory'}</Typography>
                              <Typography variant="body2" color="text.secondary">{prompt.promptText}</Typography>
                            </>}
                            secondary={<Typography variant="caption" color="text.secondary">{prompt.response}</Typography>}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography color="text.secondary">No prompts found for this user.</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;