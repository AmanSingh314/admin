import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL}  from '../../services/api'



export const fetchUserDetail = createAsyncThunk(
  'userDetail/fetchUserDetail',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/code?code=${code}`);
      console.log('user detail',response)
      if (response.data.success) {
        
        return response.data.data; 
      } else {
        toast.error('Failed to fetch user details.');
        return rejectWithValue(response.data.message || 'Failed to fetch user details');
      }
    } catch (error) {
      toast.error('Failed to fetch user details.');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
);

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetailSlice.reducer;