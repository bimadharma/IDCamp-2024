import React from 'react';
import NoteItem from './NoteItem';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';

const NoteList = ({ notes, onDelete, onArchive }) => {
  if (notes.length === 0) {
    return <div className="notes-list-empty"><p>Tidak ada catatan</p></div>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={{
            ...note,
            body: parser(note.body) 
          }} 
          onDelete={onDelete} 
          onArchive={onArchive} 
        />
      ))}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,      
      title: PropTypes.string.isRequired,    
      createdAt: PropTypes.string.isRequired,
      body: PropTypes.string,      
      archived: PropTypes.bool.isRequired,    
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,      
  onArchive: PropTypes.func.isRequired,     
};

export default NoteList;
