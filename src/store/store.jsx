import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import { moviesReducer } from './movieSlice';
import searchSlice from './searchSlice';
import movieSlice from './movieSlice';
import profileSlice from './profileSlice';

const rootReducer = combineReducers({
  // movies: moviesReducer,
  search: searchSlice,
  movie: movieSlice,
  profile: profileSlice,  
  // Add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;