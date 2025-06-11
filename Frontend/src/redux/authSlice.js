import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        loginUser: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        },
        logoutUser: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        },
        setError: (state, action) => {
        state.error = action.payload;
        },
    },
});

export const { loginUser, logoutUser, setError } = authSlice.actions;
export default authSlice.reducer;