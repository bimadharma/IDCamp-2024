import React, { useState } from 'react';
import { getInitialData, showFormattedDate } from './utils/index';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import SearchBar from './components/SearchBar';

const App = () => {
    const [notes, setNotes] = useState(getInitialData());
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const addNote = (newNote) => {
        setNotes([...notes, newNote]);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
        setArchivedNotes(archivedNotes.filter(note => note.id !== id));
    };

    const archiveNote = (id) => {
        const noteToArchive = notes.find(note => note.id === id);
        setNotes(notes.filter(note => note.id !== id));
        setArchivedNotes([...archivedNotes, { ...noteToArchive, archived: true }]);
    };

    const unarchiveNote = (id) => {
        const noteToUnarchive = archivedNotes.find(note => note.id === id);
        setArchivedNotes(archivedNotes.filter(note => note.id !== id));
        setNotes([...notes, { ...noteToUnarchive, archived: false }]);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredArchivedNotes = archivedNotes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="note-app">
            <header className="note-app__header">
                <h1>Catatan Saya</h1>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>
            <div className="note-app__body">
                <NoteInput addNote={addNote} />
                <NoteList
                    title="Catatan Aktif"
                    notes={filteredNotes}
                    deleteNote={deleteNote}
                    archiveNote={archiveNote}
                />
                <NoteList
                    title="Catatan Arsip"
                    notes={filteredArchivedNotes}
                    deleteNote={deleteNote}
                    unarchiveNote={unarchiveNote}
                />
            </div>
        </div>
    );
};

export default App;
