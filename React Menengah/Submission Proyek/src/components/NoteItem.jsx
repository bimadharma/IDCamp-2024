import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { BiTrash, BiArchiveIn, BiArchiveOut } from 'react-icons/bi'; 
import PropTypes from 'prop-types';

const NoteItem = ({ note, onDelete, onArchive }) => {
  return (
    <div className="note-item">
      <h2 className="note-item__title">
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h2>
      <p className="note-item__createdAt">{showFormattedDate(note.createdAt)}</p>
      <p className="note-item__body">{note.body}</p>

      {/* Wrapper untuk aksi tombol */}
      <div className="note-item__actions">
        <button 
          className="note-item__action-button delete"
          onClick={() => onDelete(note.id)} 
        >
          <BiTrash size={25} /> 
        </button>
        <button 
          className="note-item__action-button archive"
          onClick={() => onArchive(note.id)} 
        >
          {note.archived ? <BiArchiveOut size={25} /> : <BiArchiveIn size={25} />} {/* Ikon arsipkan/batalkan arsip */}
        </button>
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,        
    title: PropTypes.string.isRequired,     
    createdAt: PropTypes.string.isRequired, 
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,   
    archived: PropTypes.bool.isRequired,    
  }).isRequired,
  onDelete: PropTypes.func.isRequired,    
  onArchive: PropTypes.func.isRequired,    
};

export default NoteItem;
