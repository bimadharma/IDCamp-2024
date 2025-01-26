import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';
import { BiTrash, BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import NotFoundPage from './NotFoundPage';
import parser from 'html-react-parser'; 

const DetailPage = () => {
  const { id } = useParams();
  const note = getNote(id);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteNote(id);
    navigate('/');
  };

  const handleArchive = () => {
    archiveNote(id);
    navigate('/');
  };

  if (!note) {
    return <NotFoundPage />;
  }

  return (
    <div className="detail-page">
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <p className="detail-page__body">{parser(note.body)}</p> {/* Parse HTML konten body */}

      <div className="action-buttons">
        <button onClick={handleDelete} className="action-button">
          <BiTrash size={24} />
        </button>
        <button onClick={handleArchive} className="action-button">
          {note.archived ? <BiArchiveOut size={24} /> : <BiArchiveIn size={24} />}
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
