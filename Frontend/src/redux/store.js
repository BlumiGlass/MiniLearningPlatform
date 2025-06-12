import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import historyReducer from './historySlice';
import newPromptReducer from './newPromptSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    history: historyReducer,
    newPrompt: newPromptReducer,
    admin: adminReducer,
  }
});

export default store;