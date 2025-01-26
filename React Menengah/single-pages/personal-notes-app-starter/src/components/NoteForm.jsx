import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';

const NoteForm = ({ id, title: initialTitle, body: initialBody, archived, createdAt }) => {
  const [title, setTitle] = useState(initialTitle || '');
  const [body, setBody] = useState(initialBody || '');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    
    setTimeout(() => {
      addNote({
        id,
        title,
        body,
        archived,
        createdAt,
      });
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="input-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul Catatan"
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <textarea
          className="input-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Isi Catatan"
          required
          disabled={isLoading}
        ></textarea>
      </div>
      <button
        className={`btn-submit ${isLoading ? 'loading' : ''}`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Menyimpan...' : 'Tambah Catatan'}
      </button>
    </form>
  );
};

NoteForm.propTypes = {
  id: PropTypes.string,  
  title: PropTypes.string,
  body: PropTypes.string,
  archived: PropTypes.bool,
  createdAt: PropTypes.string,
};

export default NoteForm;