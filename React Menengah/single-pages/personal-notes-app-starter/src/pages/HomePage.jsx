import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom"; 
import { BiPlus } from "react-icons/bi"; 
import { getActiveNotes, deleteNote, archiveNote } from "../utils/local-data";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [notes, setNotes] = useState(getActiveNotes());
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
    setNotes(getActiveNotes());
  };

  const handleArchive = (id) => {
    archiveNote(id);
    setNotes(getActiveNotes());
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
        <SearchBar
        title="Cari catatan" 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onArchive={handleArchive}
      />

      <Link to="/notes/new" className="floating-button">
        <BiPlus size={24} />
      </Link>
    </main>
  );
};

export default HomePage;
