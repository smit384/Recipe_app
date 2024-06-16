// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;

const store = configureStore({
  reducer: usernameSlice.reducer,
});

export default store;
