import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '../../services/api';

// Existing thunks remain the same
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ record_per_page, page_number, sort }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/all`, {
        record_per_page,
        page_number,
        sort,
      });
      
      if (response.data.code === 200 && response.data.success) {
        return response.data.data.resultSet; 
      } else {
        toast.error('Failed to fetch users.');
        return rejectWithValue(response.data.message || 'Failed to fetch users');
      }
    } catch (error) {
      toast.error('Failed to fetch users.');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const deleteUsers = createAsyncThunk(
  'users/deleteUsers',
  async (ids, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/api/delete-users`, { ids });
      return ids; 
    } catch (error) {
      toast.error('Failed to delete users.');
      return rejectWithValue(error.response?.data?.message || 'Failed to delete users');
    }
  }
);

export const blockUsers = createAsyncThunk(
  'users/blockUsers',
  async (ids, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/api/block-users`, { ids });
      return ids;
    } catch (error) {
      toast.error('Failed to block users.');
      return rejectWithValue(error.response?.data?.message || 'Failed to block users');
    }
  }
);

// New thunk for getting user count
export const fetchUserCount = createAsyncThunk(
  'users/fetchUserCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/count`);
      if (response.data.code === 200 && response.data.success) {
        return response.data.data.totalCount;
      } else {
        toast.error('Failed to fetch user count.');
        return rejectWithValue(response.data.message || 'Failed to fetch user count');
      }
    } catch (error) {
      toast.error('Failed to fetch user count.');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user count');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    count: 0, // Added count field
    loading: false,
    countLoading: false, // Separate loading state for count
    error: null,
    countError: null, // Separate error state for count
    pagination: {
      currentPage: 1,
      recordPerPage: 10,
      totalRecords: 0,
    },
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    // New reducer to manually update count if needed
    updateCount: (state, action) => {
      state.count = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Existing reducers for fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.pagination.totalRecords = action.payload[0]?.totalRecord || 0;
        // Update count from totalRecords if available
        if (action.payload[0]?.totalRecord) {
          state.count = action.payload[0].totalRecord;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Existing reducers for deleteUsers
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => !action.payload.includes(user.user_code));
        // Decrement count by number of deleted users
        state.count = Math.max(0, state.count - action.payload.length);
      })
      
      // Existing reducers for blockUsers
      .addCase(blockUsers.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          action.payload.includes(user.user_code) ? { ...user, isBlocked: true } : user
        );
      })
      
      // New reducers for fetchUserCount
      .addCase(fetchUserCount.pending, (state) => {
        state.countLoading = true;
        state.countError = null;
      })
      .addCase(fetchUserCount.fulfilled, (state, action) => {
        state.countLoading = false;
        state.count = action.payload;
      })
      .addCase(fetchUserCount.rejected, (state, action) => {
        state.countLoading = false;
        state.countError = action.payload;
      });
  },
});

export const { setCurrentPage, updateCount } = usersSlice.actions;
export default usersSlice.reducer;