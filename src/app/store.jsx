import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/userSlice';
import userDetailReducer from '../features/users/userDetailSlice';
import feedsReducer from '../features/feeds/feedSlice';
import communitiesReducer from '../features/communities/communitiesSlice';
import feedDetailReducer from '../features/feeds/feedDetailSlice'
import youtubeLinksReducer from '../features/youtublelink/youtubeLinksSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    feeds: feedsReducer,
    communities: communitiesReducer,
    userDetail: userDetailReducer,
    feedDetail: feedDetailReducer,
    youtubeLinks: youtubeLinksReducer
  },
});