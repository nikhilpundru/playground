import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppRoutes from './route';

function App() {
  return (
    <Router>
      <div>
        <div className='app-header col-12 p-0 d-flex align-items-center bg-dark text-white fw-bold'>          
          <div className='py-3 px-3 fs-2'> 
            Playground
          </div>
          <div className='py-3 px-3'>            
            <Link className='text-white text-decoration-none' to="/">Where's Waldo?</Link>
          </div>
          <div className='py-3 px-3'>            
            <Link className='text-white text-decoration-none' to="/foodrecommender">Food Recommender</Link>
          </div>
        </div>
      <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
