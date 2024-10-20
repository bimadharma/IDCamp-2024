import React, { useState } from 'react';

const NoteInput = ({ addNote }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !body) return;

        const newNote = {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
        };

        addNote(newNote);
        setTitle('');
        setBody('');
    };

    const maxTitleLength = 50; // Batas karakter untuk judul
    const remainingChars = maxTitleLength - title.length; // Hitung sisa karakter

    return (
        <div className="note-input">
            <form onSubmit={handleSubmit}>
                <label>
                    <p className="note-input__title__char-limit">{`Sisa karakter: ${remainingChars}`}</p>
                    <input
                        type="text"
                        placeholder="Judul Catatan (maks. 50 karakter)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={maxTitleLength} // Menambahkan limit karakter di sini
                    />
                </label>
                <textarea
                    placeholder="Isi Catatan"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit">Tambah Catatan</button>
            </form>
        </div>
    );
};

export default NoteInput;
