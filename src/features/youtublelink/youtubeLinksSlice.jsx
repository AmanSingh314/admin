import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  links: [],
  loading: false,
  error: null,
  maxLinks: 5
};

const youtubeLinksSlice = createSlice({
  name: 'youtubeLinks',
  initialState,
  reducers: {
    addLink: (state, action) => {
      if (state.links.length < state.maxLinks) {
        state.links.push({
          ...action.payload,
          id: Date.now(),
          sequence_number: state.links.length + 1,
          isactive: true,
          created_date: new Date().toISOString()
        });
      }
    },
    removeLink: (state, action) => {
      state.links = state.links.filter(link => link.id !== action.payload);
      // Update sequence numbers after removal
      state.links.forEach((link, index) => {
        link.sequence_number = index + 1;
      });
    },
    updateLink: (state, action) => {
      const index = state.links.findIndex(link => link.id === action.payload.id);
      if (index !== -1) {
        state.links[index] = { ...state.links[index], ...action.payload.updates };
      }
    },
    reorderLinks: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.links);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      // Update sequence numbers
      state.links = result.map((link, index) => ({
        ...link,
        sequence_number: index + 1
      }));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetLinks: (state) => {
      state.links = [];
    }
  }
});

export const { 
  addLink, 
  removeLink, 
  updateLink, 
  reorderLinks, 
  setLoading, 
  setError,
  resetLinks
} = youtubeLinksSlice.actions;

export default youtubeLinksSlice.reducer;