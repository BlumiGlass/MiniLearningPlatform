import { createSlice } from "@reduxjs/toolkit";
import { createPromptAsync, fetchCategoriesAsync, fetchSubCategoriesAsync } from "./thunk";

const newPromptSlice = createSlice({
    name: "newPrompt",
    initialState: {
        categories: [],
        subCategories: [],
        loadingCategories: false,
        loadingSubCategories: false,
        prompt: {
            userId: '',
            categoryId: '',
            subCategoryId: '',
            promptText: '',
            responseText: '',
        },
        loading: false,
        error: null,
    },
    reducers: {
        setPrompt: (state, action) => {
            state.prompt = action.payload;
            state.error = null;
        },
        setCategoryId(state, action) {
            state.prompt.categoryId = action.payload;
            state.prompt.subCategoryId = '';
        },
        setSubCategoryId(state, action) {
            state.prompt.subCategoryId = action.payload;
        },
        setPromptText(state, action) {
            state.prompt.promptText = action.payload;
        },
        setUserId: (state, action) => {
            state.prompt.userId = action.payload;
        },
        clearPrompt: (state) => {
            state.prompt = {
                userId: '',
                categoryId: '',
                subCategoryId: '',
                promptText: '',
                responseText: '',
            };
            state.error = null;
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
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.loadingCategories = true;
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategoriesAsync.rejected, (state) => {
                state.loadingCategories = false;
                state.error = 'Failed to load categories';
            })
            .addCase(fetchSubCategoriesAsync.pending, (state) => {
                state.loadingSubCategories = true;
            })
            .addCase(fetchSubCategoriesAsync.fulfilled, (state, action) => {
                state.loadingSubCategories = false;
                state.subCategories = action.payload;
            })
            .addCase(fetchSubCategoriesAsync.rejected, (state) => {
                state.loadingSubCategories = false;
                state.error = 'Failed to load subcategories';
            })
            .addCase(createPromptAsync.fulfilled, (state, action) => {
                state.prompt.responseText = action.payload.response || 'No response from server';
            })
            .addCase(createPromptAsync.rejected, (state) => {
                state.error = 'Failed to create prompt';
            });
    },
});

export const { setPrompt, clearPrompt, setError, setloading, setCategoryId, setUserId, setPromptText, setSubCategoryId } = newPromptSlice.actions;
export default newPromptSlice.reducer;