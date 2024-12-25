import React, { useState, useEffect, useMemo } from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMoviesWithOffset,
  searchMovies,
} from '../../redux/slices/movieSlice.js';
import { debounce } from 'lodash';

const { Search } = Input;

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { limit, offset, loading } = useSelector((state) => state.movies); // Use loading from Redux

  const debouncedSearch = useMemo(() => {
    return debounce((value) => {
      if (value.trim() !== '') {
        dispatch(searchMovies({ query: value, offset, limit }));
      } else {
        dispatch(fetchMoviesWithOffset({ offset, limit }));
      }
    }, 500);
  }, [dispatch, offset, limit]);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  return (
    <Search
      placeholder='Search for a movie...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      enterButton
      size='large'
      loading={loading}
    />
  );
};

export default SearchBar;
