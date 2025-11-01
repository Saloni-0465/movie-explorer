import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchlist: [],
  favorites: [],
  trendingMovies: [],
  searchResults: [],
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      if (!state.watchlist.find(movie => movie.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload);
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.find(movie => movie.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
    },
    setTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  addToFavorites,
  removeFromFavorites,
  setTrendingMovies,
  setSearchResults,
} = movieSlice.actions;
export default movieSlice.reducer;

