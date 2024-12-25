import { combineReducers } from 'redux';
import movieReducer from '../slices/movieSlice';

const rootReducer = combineReducers({
  movies: movieReducer,
});

export default rootReducer;
