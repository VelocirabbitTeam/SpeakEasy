import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: localStorage.getItem('userData') 
  ? JSON.parse(localStorage.getItem('userData'))
  : null,
  sessionData: []
};

// const initialState = {
//   isLoggedIn: false,
//   sessionData: [],
// };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredential: (state, action) => {
      // state.isLoggedIn = true;
      //reassign initialState
      state.userData = action.payload
      //save userData in localStorage
      state.userData = localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      state.userData = null;
      localStorage.clear()
    },
    updateSessionData: (state, action) => {
      state.sessionData.push(action.payload);
    },
  },
});

export const { setCredential, logout, updateSessionData} = userSlice.actions;
export default userSlice.reducer;
