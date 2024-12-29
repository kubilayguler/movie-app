import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesWithOffset = createAsyncThunk(
  'movies/fetchMoviesWithOffset',
  async ({ offset, limit }, thunkAPI) => {
    try {
      const startPage = Math.floor(offset / 20) + 1;
      const startIndex = offset % 20;

      let movies = [];
      let currentPage = startPage;

      while (movies.length < limit) {
        const response = await axios.get(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`
        );
        const results = response.data.results;

        if (currentPage === startPage) {
          movies = [...movies, ...results.slice(startIndex)];
        } else {
          movies = [...movies, ...results];
        }

        currentPage += 1;

        const totalResults = Math.min(response.data.total_results, 10000);
        thunkAPI.dispatch(setTotalResults(totalResults));
      }

      return movies.slice(0, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, offset, limit }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${
          Math.floor(offset / 20) + 1
        }`
      );
      if (!response.data.results) {
        throw new Error('No movies found');
      }

      const totalResults = Math.min(response.data.total_results, 10000);
      thunkAPI.dispatch(setTotalResults(totalResults));

      return response.data.results.slice(0, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    selectedMovie: null,
    totalResults: 0,
    loading: false,
    error: null,
    limit: 10,
    offset: 0,
  },
  reducers: {
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setOffset(state, action) {
      state.offset = action.payload;
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload;
    },
    clearSelectedMovie(state) {
      state.selectedMovie = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesWithOffset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesWithOffset.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesWithOffset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  setLimit,
  setOffset,
  clearSelectedMovie,
  setTotalResults,
  clearError,
} = movieSlice.actions;

export default movieSlice.reducer;
