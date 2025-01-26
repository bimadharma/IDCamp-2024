import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/local-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";

const ArchivePage = () => {
  const [notes, setNotes] = useState(getArchivedNotes());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSearchParams({ search: query }); 
  };

  const handleDelete = (id) => {
    deleteNote(id);
    setNotes(getArchivedNotes());
  };

  const handleUnarchive = (id) => {
    unarchiveNote(id);
    setNotes(getArchivedNotes());
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <SearchBar
        title="Cari Arsip Catatan"
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange} 
      />

      <NoteList notes={filteredNotes} onDelete={handleDelete} onArchive={handleUnarchive} />
    </main>
  );
};

export default ArchivePage;
