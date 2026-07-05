import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { Homepage, Feature, Predict } from './pages';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/feature' element={<Feature/>}/>
          <Route path='/predict' element={<Predict/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

