import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import { fetchCategories, fetchSubCategories, createPrompt } from '../api';

const NewPrompt = ({ onBack, onSubmit, userId }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [promptText, setPromptText] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    setLoadingCategories(true);
    fetchCategories()
      .then(data => setCategories(data))
      .catch(() => setError('Failed to load categories'))
      .finally(() => setLoadingCategories(false));
  }, []);

  useEffect(() => {
    setSubCategoryId('');
    setPromptText(''); 
    if (categoryId) {
      setLoadingSubCategories(true);
      fetchSubCategories(categoryId)
        .then(data => setSubCategories(data))
        .catch(() => setError('Failed to load subcategories'))
        .finally(() => setLoadingSubCategories(false));
    } else {
      setSubCategories([]);
    }
  }, [categoryId]);

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);
    setResponseText('');
    try {
      const result = await createPrompt({
        userId,
        categoryId,
        subCategoryId,
        promptText
      });
      if (result && result.id) {
        setSuccess(true);
        setCategoryId('');
        setSubCategoryId('');
        setPromptText('');
        setResponseText(result.response || 'No response from server');
      } else {
        setError(result?.message || 'Failed to create prompt');
      }
    } catch (err) {
      setError('Failed to create prompt');
    }
  };

  const pastelBlue = '#90CAF9';
  const pastelGreen = '#A5D6A7';

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ background: 'none', overflow: 'hidden', p: 0, m: 0, zIndex: 0 }}
    >
      <Box
        width="100%"
        maxWidth={500}
        bgcolor="#fff"
        p={4}
        borderRadius={3}
        boxShadow={3}
        sx={{ boxSizing: 'border-box' }}
      >
        <Typography variant="h5" mb={3} fontWeight={600} color="primary">Learn Something New</Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        {success && <Typography color="success.main" mb={2}>Prompt created successfully!</Typography>}
        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          fullWidth
          margin="normal"
          disabled={loadingCategories}
        >
          {loadingCategories ? <MenuItem value=""><CircularProgress size={20} /></MenuItem> :
            categories.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
        </TextField>
        {categoryId && (
          <TextField
            select
            label="Subcategory"
            value={subCategoryId}
            onChange={e => setSubCategoryId(e.target.value)}
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
        {categoryId && subCategoryId && (
          <TextField
            label="Prompt Text"
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
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
              borderColor: pastelBlue,
              color: pastelBlue,
              fontWeight: 600,
              '&:hover': { backgroundColor: pastelBlue, color: '#fff', borderColor: pastelBlue }
            }}
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit} 
            disabled={!categoryId || !subCategoryId || !promptText}
            sx={{
               background: '#b2e0d6', color: '#1a3c34', '&:hover': { background: '#8fd3c6' },
              fontWeight: 600,
              boxShadow: 'none'
            }}
          >
            Submit
          </Button>
        </Box>
        {responseText && (
          <Box mt={3} p={2} bgcolor="#f5f7fa" borderRadius={2} boxShadow={1}>
            <Typography variant="subtitle1" fontWeight={600} color="primary.main">Server Response:</Typography>
            <Typography variant="body1" color="text.secondary">{responseText}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewPrompt;
