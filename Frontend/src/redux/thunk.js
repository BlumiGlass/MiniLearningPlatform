import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPromptsHistory, fetchCategories, fetchSubCategories, createPrompt, fetchAllUsers } from "../api";

export const fetchCategoriesAsync = createAsyncThunk('prompt/fetchCategories', async () => {
  const response = await fetchCategories();
  return response;
});

export const fetchSubCategoriesAsync = createAsyncThunk('prompt/fetchSubCategories', async (categoryId) => {
  const response = await fetchSubCategories(categoryId);
  return response;
});

export const createPromptAsync = createAsyncThunk('prompt/createPrompt', async (promptData) => {
  const response = await createPrompt(promptData);
  return response;
});

export const fetchHistoryAsync = createAsyncThunk('history/fetchHistory', async (userId) => {
      const data = await fetchPromptsHistory(userId);
      return data;
});

export const fetchAllUsersAsync = createAsyncThunk('admin/fetchAllUsers', async () => {
    const users = await fetchAllUsers();
    return users;
});

export const fetchUserPromptsAsync = createAsyncThunk('admin/fetchUserPrompts', async (userId) => {
    const prompts = await fetchPromptsHistory(userId);
    return { userId, prompts };
});