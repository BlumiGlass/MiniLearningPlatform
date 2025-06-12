import React, { useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import { clearPrompt, setCategoryId, setError, setloading, setPrompt, setPromptText, setSubCategoryId, setUserId } from '../redux/newPromptSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createPromptAsync, fetchCategoriesAsync, fetchSubCategoriesAsync } from '../redux/thunk';

const NewPrompt = ({ onBack }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { prompt, error, categories, subCategories, loadingCategories, loadingSubCategories, loading } = useSelector(state => state.newPrompt);

  useEffect(() => {
    dispatch(clearPrompt());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (prompt.categoryId) {
      dispatch(fetchSubCategoriesAsync(prompt.categoryId));
    }
  }, [prompt.categoryId, dispatch]);

  const handleSubmit = async () => {
    dispatch(setError(''));
    dispatch(setloading(true));
    try {
      dispatch(setUserId(user.id));
      const result = await dispatch(createPromptAsync({ ...prompt, userId: user.id })).unwrap();
      dispatch(setloading(false));
      if (!result) {
        dispatch(setError(result?.message || 'Failed to create prompt'));
      }
    } catch (err) {
      dispatch(setError('Failed to create prompt'));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      minHeight="100vh"
      sx={{
        pt: '100px', // מרווח מהסרגל
        overflow: 'hidden', // מונע גלילה מיותרת
        boxSizing: 'border-box'
      }}
    >
      <Box
        width="100%"
        maxWidth={500}
        bgcolor="#fff"
        p={4}
        borderRadius={3}
        boxShadow={3}
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: 500,
          overflowX: 'hidden',
        }}
      >
        <Typography variant="h5" mb={3} fontWeight={600} color="primary">Learn Something New</Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        {loading && <CircularProgress size={24} sx={{ display: 'block', margin: '0 auto 16px' }} />}
        {prompt.responseText && <Typography color="success.main" mb={2}>Prompt created successfully!</Typography>}
        <TextField
          select
          label="Category"
          value={prompt.categoryId}
          onChange={e => dispatch(setCategoryId(e.target.value))}
          onFocus={() => prompt.responseText && dispatch(clearPrompt())}
          fullWidth
          margin="normal"
          disabled={loadingCategories}
        >
          {loadingCategories ? <MenuItem value=""><CircularProgress size={20} /></MenuItem> :
            categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
        </TextField>
        {prompt.categoryId && (
          <TextField
            select
            label="Subcategory"
            value={prompt.subCategoryId}
            onChange={e => dispatch(setSubCategoryId(e.target.value))}
            fullWidth
            margin="normal"
            disabled={loadingSubCategories}
          >
            {loadingSubCategories ? <MenuItem value=""><CircularProgress size={20} /></MenuItem> :
              subCategories.map(sub => (
                <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
              ))}
          </TextField>
        )}
        {prompt.categoryId && prompt.subCategoryId && (
          <TextField
            label="Prompt Text"
            value={prompt.promptText}
            onChange={e => dispatch(setPromptText(e.target.value))}
            fullWidth
            margin="normal"
            multiline
            minRows={2}
          />
        )}
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              borderColor: "#1a3c34",
              color: "#1a3c34",
              fontWeight: 600,
              opacity: 1,
              '&:hover': { backgroundColor: "#8fd3c6", color: '#fff', borderColor: "#8fd3c6" }
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!prompt.categoryId || !prompt.subCategoryId || !prompt.promptText}
            sx={{
              background: '#b2e0d6', color: '#1a3c34', '&:hover': { background: '#8fd3c6' },
              fontWeight: 600,
              boxShadow: 'none'
            }}
          >
            Submit
          </Button>
        </Box>
        {prompt.responseText && (
          <Box mt={3} p={2} bgcolor="#f5f7fa" borderRadius={2} boxShadow={1}>
            <Typography variant="subtitle1" fontWeight={600} color="primary.main">Server Response:</Typography>
            <Typography variant="body1" color="text.secondary">{prompt.responseText}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewPrompt;
