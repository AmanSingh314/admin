import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/userSlice';
import userDetailReducer from '../features/users/userDetailSlice';
import feedsReducer from '../features/feeds/feedSlice';
import communitiesReducer from '../features/communities/communititesSlice';
import feedDetailReducer from '../features/feeds/feedDetailSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    feeds: feedsReducer,
    communities: communitiesReducer,
    userDetail: userDetailReducer,
    feedDetail: feedDetailReducer,
  },
});