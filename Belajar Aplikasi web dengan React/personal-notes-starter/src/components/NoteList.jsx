import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ title, notes, deleteNote, archiveNote, unarchiveNote }) => {
    return (
        <div>
            <h2>{title}</h2>
            <div className="notes-list">
                {notes.length === 0 ? (
                    <div className="notes-list__empty-message">Tidak ada catatan</div>
                ) : (
                    notes.map(note => (
                        <NoteItem
                            key={note.id}
                            note={note}
                            deleteNote={deleteNote}
                            archiveNote={archiveNote}
                            unarchiveNote={unarchiveNote}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default NoteList;
