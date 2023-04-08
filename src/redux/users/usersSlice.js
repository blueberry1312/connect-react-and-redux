import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://randomuser.me/api/?results=5');
  const data = await response.json();
  return data.results;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined
  },
  reducers: {
    usersReceivedActionCreator: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = undefined;
    },
    usersErrorActionCreator: (state, action) => {
      state.users = [];
      state.isLoading = false;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.users = [];
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.users = [];
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { usersReceivedActionCreator, usersErrorActionCreator } = usersSlice.actions;
export default usersSlice.reducer;



