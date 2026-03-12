import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated: false,
  isMileage: false,
};
console.log('🚀 ~ initialState.token:', initialState.token);

const AuthSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setUserToken(state, action) {
      state.token = action?.payload?.token;
      // console.log('first tokneennenenenennenen' ,state.token ,action.payload)
    },

    SetFCMToken(state, action) {
      state.fcmToken = action?.payload?.fcmToken;
    },
    setUserLogin(state, action) {
      state.token = action?.payload;
    },
    setUserLogoutAuth(state, action) {
      state.token = null;
      state.fcmToken = null;
    },
    setWalkThrough(state, action) {
      state.userWalkThrough = action.payload;
    },
    setMilageRing(state, action) {
      state.isMileage = action.payload;
    },
  },
});

export const {
  setUserLogin,
  setUserLogoutAuth,
  setUserToken,
  SetFCMToken,
  setWalkThrough,
  setMilageRing,
} = AuthSlice.actions;

export default AuthSlice.reducer;
