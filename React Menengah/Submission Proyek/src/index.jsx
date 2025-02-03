import React from 'react';
import ReactDOM from 'react-dom/client';  
import { BrowserRouter as Router } from 'react-router-dom';  
import App from './App';  

import './styles/style.css';  

// Komponen utama yang akan dirender
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> 
    <App />
  </Router>
);
