// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  password: string;
  fixed: number;
  saving: number
}

const initialState: UserState = {
  name: '',
  password: '',
  fixed:0,
  saving:0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.fixed = action.payload.fixed;
      state.saving = action.payload.saving; 
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
