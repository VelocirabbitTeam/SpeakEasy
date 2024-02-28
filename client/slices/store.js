import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './reducers/audioSlice.js';
import userReducer from './reducers/userSlice.js';
import {api} from './apiSlices/api.js'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    audio: audioReducer,
    user: userReducer,
  },
});

export default store;
