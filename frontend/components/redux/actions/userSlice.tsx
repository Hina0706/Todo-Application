import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userEmail: null,
  userAuth: false,
  userName: null,
  userImg: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      //state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
      state.userImg = action.payload.userImg;
      //state.userId = action.payload.userId;
    },
    setUserLogOut: state => {
      state.userEmail = null;
      state.userAuth = false;
    },
    setUserAuth: state => {
      state.userAuth = true;
    },
  },
});

export const {setActiveUser, setUserLogOut, setUserAuth} = userSlice.actions;
export const selectUserEmail = state => state.user.userEmail;
export const selectAuth = state => state.user.userAuth;
export const selectUserName = state => state.user.userName;
export const selectUserImg = state => state.user.userImg;
export const selectUserId = state => state.user.userId;

export default userSlice.reducer;
