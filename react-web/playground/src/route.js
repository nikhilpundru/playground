import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WhereIsWaldo from './components/WhereIsWaldo/WhereIsWaldo';
import FoodRecommender from './components/FoodRecommender/FoodRecommender';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WhereIsWaldo />} />
      <Route path="/foodrecommender" element={<FoodRecommender />} />
    </Routes>
  );
};

export default AppRoutes;
