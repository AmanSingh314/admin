import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { communities } from '../../data/mockData';

export const fetchCommunities = createAsyncThunk('communities/fetchCommunities', async () => {
  // Simulate an API call
  return new Promise((resolve) => setTimeout(() => resolve(communities), 1000));
});

const communitiesSlice = createSlice({
  name: 'communities',
  initialState: { communities: [], status: 'idle', error: null },
  reducers: {
    deleteCommunity: (state, action) => {
      state.communities = state.communities.filter((community) => community.id !== action.payload);
    },
    blockCommunity: (state, action) => {
      state.communities = state.communities.map((community) =>
        community.id === action.payload ? { ...community, blocked: true } : community
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { deleteCommunity, blockCommunity } = communitiesSlice.actions;
export default communitiesSlice.reducer;