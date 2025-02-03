import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api'; // Pastikan utilitas API sudah diperbarui
import { showFormattedDate } from '../utils';
import { BiTrash, BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import NotFoundPage from './NotFoundPage';
import parser from 'html-react-parser'; 

const DetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { error, data } = await getNote(id);
        if (!error) {
          setNote(data);
        } else {
          alert('Gagal memuat catatan.');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Yakin ingin menghapus catatan ini?');
    if (confirmDelete) {
      const { error } = await deleteNote(id);
      if (!error) {
        navigate('/');
      } else {
        alert('Gagal menghapus catatan.');
      }
    }
  };

  const handleArchive = async () => {
    const action = note.archived ? unarchiveNote : archiveNote;
    const { error } = await action(id);
    if (!error) {
      navigate('/');
    } else {
      alert('Gagal memperbarui status arsip.');
    }
  };

  if (loading) {
    return <p className="notes-list-empty">Loading...</p>;
  }

  if (!note) {
    return <NotFoundPage />;
  }

  return (
    <div className="detail-page">
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <p className="detail-page__body">{parser(note.body)}</p>

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
