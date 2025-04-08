import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../services/api";

export const fetchFeeds = createAsyncThunk(
  "feeds/fetchFeeds",
  async ({ record_per_page, page_number, sort }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Feed/getAll`, {
        record_per_page,
        page_number,
        sort,
      });
    
      if (response.data && response.data.feedList) {
        return {
          feedList: response.data.feedList || [],
          totalRecords: response.data.totalRecord || 0,
        };
      } else {
        toast.error("Failed to fetch feeds.");
        return rejectWithValue(
          response.data.message || "Failed to fetch feeds"
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to fetch feeds.");
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch feeds"
      );
    }
  }
);

export const blockFeed = createAsyncThunk(
  "feeds/blockFeed",
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/api/block-feed`, { id });
      return id;
    } catch (error) {
      toast.error("Failed to block feed.");
      return rejectWithValue(
        error.response?.data?.message || "Failed to block feed"
      );
    }
  }
);

export const removeFeed = createAsyncThunk(
  "feeds/removeFeed",
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/api/remove-feed`, { id });
      return id;
    } catch (error) {
      toast.error("Failed to remove feed.");
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove feed"
      );
    }
  }
);

const feedsSlice = createSlice({
  name: "feeds",
  initialState: {
    feeds: [],
    loading: false,
    error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload.feedList;
        state.pagination.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blockFeed.fulfilled, (state, action) => {
        state.feeds = state.feeds.map((feed) =>
          feed.id === action.payload ? { ...feed, isBlocked: true } : feed
        );
      })
      .addCase(removeFeed.fulfilled, (state, action) => {
        state.feeds = state.feeds.filter((feed) => feed.id !== action.payload);
      });
  },
});

export const { setCurrentPage } = feedsSlice.actions;
export default feedsSlice.reducer;
