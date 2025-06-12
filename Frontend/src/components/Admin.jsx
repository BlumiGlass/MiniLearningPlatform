import React, { useEffect } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsersAsync, fetchUserPromptsAsync } from '../redux/thunk';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/authSlice';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { users, loadingUsers, error, userPrompts, loadingPrompts } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  const handleAccordionChange = userId => (event, isExpanded) => {
    if (isExpanded && !userPrompts[userId]) {
      dispatch(fetchUserPromptsAsync(userId));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Box minHeight="100vh" width="100vw" bgcolor="#f5f7fa">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h4">Admin</Typography>
          <Button onClick={handleLogout} startIcon={<LogoutIcon />}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" pt={12}>
        <Box width="100%" maxWidth={600} bgcolor="#fff" p={4}>
          <Typography variant="h5">Admin Dashboard</Typography>
          {error && <Typography color="error">{error}</Typography>}
          {loadingUsers ? (
            <CircularProgress />
          ) : (
            users.map(user => (
              <Accordion key={user.id} onChange={handleAccordionChange(user.id)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{user.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {loadingPrompts[user.id] ? (
                    <CircularProgress size={20} />
                  ) : userPrompts[user.id]?.length > 0 ? (
                    <List>
                      {userPrompts[user.id].map(prompt => (
                        <ListItem key={prompt.id}>
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
