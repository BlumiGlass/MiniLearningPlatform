import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails,
  CircularProgress, List, ListItem, ListItemText, AppBar, Toolbar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersAsync, fetchUserPromptsAsync } from '../redux/thunk';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loadingUsers, error, userPrompts, loadingPrompts } = useSelector(state => state.admin);
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  const handleAccordionChange = userId => (event, isExpanded) => {
    if (isExpanded) {
      setExpandedUserId(userId);
      if (!userPrompts[userId]) {
        dispatch(fetchUserPromptsAsync(userId));
      }
    } else {
      setExpandedUserId(null);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Box minHeight="100vh" width="100vw" sx={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      pb: 3
    }}>
      <AppBar position="static" color="default" elevation={3} sx={{
        background: '#fff',
        color: '#1a3c34',
        boxShadow: '0 2px 8px 0 rgba(60,60,60,0.08)',
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontWeight: 300, fontSize: 36, pl: 4 }}>
            Admin
          </Typography>
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              mr: 4,
              fontWeight: 600,
              background: '#b2e0d6',
              color: '#1a3c34',
              '&:hover': { background: '#8fd3c6' },
              height: 42,
            }}
            variant="contained"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" pt={6}>
        <Box width="100%" maxWidth={800} bgcolor="#fff" p={4} borderRadius={2} boxShadow={4}>
          <Typography variant="h5" mb={2}>Admin Dashboard</Typography>
          {error && <Typography color="error">{error}</Typography>}
          {loadingUsers ? (
            <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
          ) : (
            users.map(user => (
              <Accordion
                key={user.id}
                expanded={expandedUserId === user.id}
                onChange={handleAccordionChange(user.id)}
                sx={{ mb: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight={600}>{user.name}</Typography>
                </AccordionSummary>
                <AccordionDetails key={loadingPrompts[user.id] ? 'loading' : 'loaded'}>
                  {loadingPrompts[user.id] || userPrompts[user.id] === undefined ? (
                    <Box display="flex" justifyContent="center" py={2}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : userPrompts[user.id]?.length > 0 ? (
                    <List>
                      {userPrompts[user.id].map(prompt => (
                        <ListItem key={prompt.id} alignItems="flex-start">
                          <ListItemText
                            primary={`${prompt.category.name} / ${prompt.subCategory.name}`}
                            secondary={prompt.promptText}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography>No prompts found for this user.</Typography>
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
