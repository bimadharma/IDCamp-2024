import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/api"; // Updated import to use API methods
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { LocaleConsumer } from "../contexts/LocaleContext";
import PropTypes from "prop-types";

const ArchivePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);

    const fetchNotes = async () => {
      const { error, data } = await getArchivedNotes();
      if (!error) {
        setNotes(data);
      }
    };

    fetchNotes();
  }, [searchParams]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSearchParams({ search: query }); 
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus catatan ini?');
    if (confirmDelete) {
    const { error } = await deleteNote(id);
    if (!error) {
      const { data } = await getArchivedNotes();
      setNotes(data);
    }
  }
  };
  

  const handleUnarchive = async (id) => {
    const { error } = await unarchiveNote(id);
    if (!error) {
      const { data } = await getArchivedNotes();
      setNotes(data);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LocaleConsumer>
      {({ locale }) => (
    <main>
      <SearchBar
        title={locale === "id" ? "Cari Arsip Catatan" : "Search Archive Notes"}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange} 
      />

      <NoteList notes={filteredNotes} onDelete={handleDelete} onArchive={handleUnarchive} />
    </main>
     )}
        </LocaleConsumer>
  );
};

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};


export default ArchivePage;