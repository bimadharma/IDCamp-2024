import React from 'react';
import PropTypes from "prop-types"; 
import NoteItem from './NoteItem';
import parser from 'html-react-parser'; // Import html-react-parser

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
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteList;
