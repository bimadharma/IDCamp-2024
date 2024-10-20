import React from 'react';
import { showFormattedDate } from '../utils/index';

const NoteItem = ({ note, deleteNote, archiveNote, unarchiveNote }) => {
    return (
        <div className="note-item">
            <div className="note-item__content">
                <h3 className="note-item__title">{note.title}</h3>
                <p className="note-item__body">{note.body}</p>
                <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
            </div>
            <div className="note-item__action">
                {note.archived ? (
                    <>
                        <button className="note-item__archive-button" onClick={() => unarchiveNote(note.id)}>
                            Kembalikan
                        </button>
                        <button className="note-item__delete-button" onClick={() => deleteNote(note.id)}>
                            Hapus
                        </button>
                    </>
                ) : (
                    <>
                        <button className="note-item__archive-button" onClick={() => archiveNote(note.id)}>
                            Arsipkan
                        </button>
                        <button className="note-item__delete-button" onClick={() => deleteNote(note.id)}>
                            Hapus
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NoteItem;
