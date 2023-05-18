import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'movie/fetchTopData',
  async (topApi, thunkAPI) => {
    try {
      const response = await fetch(topApi);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);
