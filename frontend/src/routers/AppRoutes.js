import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Movies from '../components/Movies/Movies.jsx';
import MovieDetail from '../components/MovieDetail/MovieDetail.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Movies />} />
      <Route path='/movie/:id' exact element={<MovieDetail />} />
    </Routes>
  );
};

export default AppRoutes;
