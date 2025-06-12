import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsersAsync, fetchUserPromptsAsync } from "./thunk";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loadingUsers: false,
        error: null,
        userPrompts: [],
        loadingPrompts: false,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
            state.error = null;
        },
        setLoadingUsers: (state, action) => {
            state.loadingUsers = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setUserPrompts: (state, action) => {
            const { userId, prompts } = action.payload;
            state.userPrompts[userId] = prompts;
            state.loadingPrompts[userId] = false;
        },
        setLoadingPrompts: (state, action) => {
            const { userId, loading } = action.payload;
            state.loadingPrompts[userId] = loading;
        },
    },
    extraReducers: (builder) => {
            builder
        .addCase(fetchAllUsersAsync.pending, (state) => {
            state.loadingUsers = true;
            state.error = null;
        })
        .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
            state.loadingUsers = false;
            state.users = action.payload;
        })
        .addCase(fetchAllUsersAsync.rejected, (state, action) => {
            state.loadingUsers = false;
            state.error = action.error.message;
        })
        .addCase(fetchUserPromptsAsync.pending, (state, action) => {
            const userId = action.meta.arg;
            state.loadingPrompts[userId] = true;
        })
        .addCase(fetchUserPromptsAsync.fulfilled, (state, action) => {
            const { userId, prompts } = action.payload;
            state.loadingPrompts[userId] = false;
            state.userPrompts[userId] = prompts;
        })
        .addCase(fetchUserPromptsAsync.rejected, (state, action) => {
            const userId = action.meta.arg;
            state.loadingPrompts[userId] = false;
            state.error = action.error.message;
        });
    },
})

export const { setUsers, setLoadingUsers, setError } = adminSlice.actions;
export default adminSlice.reducer;