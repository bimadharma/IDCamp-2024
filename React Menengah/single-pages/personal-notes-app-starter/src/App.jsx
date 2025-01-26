import React from 'react';
import { Routes, Route } from 'react-router-dom';  

import Header from './components/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ArchivePage from './pages/ArchivePage';
import NoteForm from './components/NoteForm';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Routes> 
        <Route path="/" element={<HomePage />} />  
        <Route path="/notes/new" element={<NoteForm />} />
        <Route path="/notes/archived" element={<ArchivePage />} />
        <Route path="/notes/:id" element={<DetailPage />} />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </div>
  );
};

export default App;
