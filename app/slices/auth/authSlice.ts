import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  name: string;
  publishName: string;
  loggedIn: boolean;  // New property for logged in state
}

const initialState: UserState = {
  email: '',
  name: '',
  publishName: '',
  loggedIn: false,  // Initially set to false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<Omit<UserState, 'loggedIn'>>) {
      return { ...state, ...action.payload, loggedIn: true };  // Set loggedIn to true when user details are set
    },
    clearUserDetails(state) {
      return initialState;  // Reset to initial state
    },
    logOut(state) {
      return { ...initialState, loggedIn: false };  // Clear user details and set loggedIn to false
    },
  },
});

export const { setUserInfo, clearUserDetails, logOut } = userSlice.actions;
export default userSlice.reducer;
