import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../../services/api';

export const fetchFeedDetail = createAsyncThunk(
    'feedDetail/fetchFeedDetail', 
    async (feedId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Feed/feeddetail?code=${feedId}`);
        
        console.log("Full API Response:", response); 
        console.log("Response Data:", response.data);
        
        
        if (response.data) {
          return response.data; 
        } else {
          const errorMsg = response.data?.message || 'Failed to fetch feed details';
          toast.error(errorMsg);
          return rejectWithValue(errorMsg);
        }
      } catch (error) {
        console.error("API Error Details:", {
          message: error.message,
          response: error.response?.data
        });
        const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch feed details';
        toast.error(errorMsg);
        return rejectWithValue(errorMsg);
      }
    }
  );

export const updateFeedDetail = createAsyncThunk(
  'feedDetail/updateFeedDetail',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/Feed/update`, { id, ...updateData });
      
      if (response.data.success) {
        toast.success('Feed updated successfully!');
        return response.data.data;
      } else {
        toast.error(response.data.message || 'Failed to update feed.');
        return rejectWithValue(response.data.message || 'Failed to update feed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update feed.');
      return rejectWithValue(error.response?.data?.message || 'Failed to update feed');
    }
  }
);

export const deleteFeed = createAsyncThunk(
  'feedDetail/deleteFeed',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/Feed/delete?id=${id}`);
      
      if (response.data.success) {
        toast.success('Feed deleted successfully!');
        return id;
      } else {
        toast.error(response.data.message || 'Failed to delete feed.');
        return rejectWithValue(response.data.message || 'Failed to delete feed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete feed.');
      return rejectWithValue(error.response?.data?.message || 'Failed to delete feed');
    }
  }
);

const feedDetailSlice = createSlice({
  name: 'feedDetail',
  initialState: {
    feed: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearFeedDetail: (state) => {
      state.feed = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Feed Detail
      .addCase(fetchFeedDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(fetchFeedDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Feed Detail
      .addCase(updateFeedDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFeedDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(updateFeedDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Feed
      .addCase(deleteFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeed.fulfilled, (state) => {
        state.loading = false;
        state.feed = null;
      })
      .addCase(deleteFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFeedDetail } = feedDetailSlice.actions;
export default feedDetailSlice.reducer;