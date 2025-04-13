import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../services/api";

// Fetch Communities
export const fetchCommunities = createAsyncThunk(
  "communities/fetchCommunities",
  async ({ record_per_page, page_number, fromDate, toDate, sort }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Community/getAll`, {
        record_per_page,
        page_number,
        sort,
        fromDate,
        toDate,
      });

      if (response.data?.communityList) {
        return {
          communityList: response.data.communityList,
          totalRecords: response.data.totalRecord || 0,
        };
      }
      toast.error("communityList not found in response.");
      return rejectWithValue("Invalid response format");
    } catch (error) {
      toast.error("Failed to fetch communities.");
      return rejectWithValue(
        error.response?.data?.message || "Network error fetching communities"
      );
    }
  }
);

// Block Community
export const blockCommunity = createAsyncThunk(
  "communities/blockCommunity",
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/api/block-community`, { id });
      toast.success("Community blocked successfully");
      return id;
    } catch (error) {
      toast.error("Failed to block community.");
      return rejectWithValue(error.response?.data?.message || "Failed to block community");
    }
  }
);

// Delete Community
export const deleteCommunity = createAsyncThunk(
  "communities/deleteCommunity",
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/api/remove-community`, { id });
      toast.success("Community deleted successfully");
      return id;
    } catch (error) {
      toast.error("Failed to delete community.");
      return rejectWithValue(error.response?.data?.message || "Failed to delete community");
    }
  }
);

const communitiesSlice = createSlice({
  name: "communities",
  initialState: {
    communities: [],
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
    setRecordPerPage: (state, action) => {
      state.pagination.recordPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload.communityList;
        state.pagination.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(blockCommunity.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockCommunity.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = state.communities.map((community) =>
          community.community_id === action.payload ? { ...community, isBlocked: true } : community
        );
      })
      .addCase(blockCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCommunity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCommunity.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = state.communities.filter(
          (community) => community.community_id !== action.payload
        );
      })
      .addCase(deleteCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, setRecordPerPage } = communitiesSlice.actions;
export default communitiesSlice.reducer;