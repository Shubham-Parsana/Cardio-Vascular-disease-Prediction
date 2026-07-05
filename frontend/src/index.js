import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './pages/Homepage';
import Feature from './pages/Feature';
import Predict from './pages/Predict';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Homepage';
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

