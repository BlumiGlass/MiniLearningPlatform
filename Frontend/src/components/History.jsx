import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { clearHistory } from '../redux/historySlice';
import { fetchHistoryAsync } from '../redux/thunk';

const History = ({ onBack }) => {
  const dispatch = useDispatch();
  const { history, loading, error } = useSelector((state) => state.history);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchHistoryAsync(user.id));
     return () => dispatch(clearHistory());
  }, [dispatch]);

  return (
    <Box width="80%" maxWidth={900} sx={{ margin: '0 auto', p: 0 }}>
      <Typography variant="h5" mb={3} fontWeight={600} color="primary">History</Typography>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" flexWrap="wrap" gap={3}>
        {history.map((item, idx) => (
          <Box key={item.id || idx} boxShadow={2} borderRadius={2} p={3} bgcolor="#f5f7fa" minWidth={260} maxWidth={320} flex={1}>
            <Typography fontWeight={600} color="primary.main" mb={1}>
              Category: {item.category?.name || item.categoryId}
            </Typography>
            <Typography fontWeight={500} color="primary" mb={1}>
              Subcategory: {item.subCategory?.name || item.subCategoryId}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <b>Prompt:</b> {item.promptText || 'No prompt text'}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <b>Response:</b> {item.response || 'No response'}
            </Typography>
            {item.createdAt && <Typography variant="caption" color="text.disabled">{new Date(item.createdAt).toLocaleString()}</Typography>}
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <Button sx={{ mt: 4, borderRadius: 2, border: '1px solid #b2e0d6', background: '#fff', color: '#1a3c34', fontWeight: 600 }} onClick={onBack} variant="outlined">
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default History;