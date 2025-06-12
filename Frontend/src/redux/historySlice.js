import { createSlice } from '@reduxjs/toolkit';
import { fetchHistoryAsync } from './thunk';

const historySlice = createSlice({
    name: 'history',
    initialState: {
        history: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearHistory: (state) => {
            state.history = [];
            state.error = null;
            state.loading = false;
        },
        setloading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistoryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHistoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload || [];
            })
            .addCase(fetchHistoryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error';
            });
    },
});

export const { clearHistory, setloading, setError } = historySlice.actions;
export default historySlice.reducer;