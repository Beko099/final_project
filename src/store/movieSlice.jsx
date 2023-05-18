import { createSlice } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    topInfo: null,
    slider: null,
    top: null,
    chart: null,
    rating: null,
    searchData: null,
    search: null,
    commentData: null,
    param: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSlider: (state, action) => {
      state.slider = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTopInfo: (state, action) => {
      state.topInfo = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTopRating: (state, action) => {
      state.rating = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setTopChart: (state, action) => {
      state.chart = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCommentData: (state, action) => {
      state.commentData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTopInfo, setLoading, setError, setSlider, setTopChart, setTopRating, setSearchData, setSearch, setCommentData } = movieSlice.actions;

export default movieSlice.reducer;
