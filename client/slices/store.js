import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './reducers/slice.js';
import userReducer from './reducers/userSlice.js';

const store = configureStore({
  reducer: {
    audio: audioReducer,
    user: userReducer,
  },
});

export default store;
