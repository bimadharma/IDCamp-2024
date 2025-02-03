import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/api";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { LocaleConsumer } from "../contexts/LocaleContext";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
    };
    fetchNotes();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSearchParams({ search: query });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus catatan ini?');
    if (confirmDelete) {
      const { error } = await deleteNote(id);
      if (!error) {
        const { data } = await getActiveNotes();
        setNotes(data);
      }
    }
  };

  const handleArchive = async (id) => {
    await archiveNote(id);
    const { error, data } = await getActiveNotes();
    if (!error) {
      setNotes(data);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <LocaleConsumer>
        {({ locale }) => (
          <SearchBar
            title={locale === "id" ? "Cari catatan" : "Search notes"}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        )}
      </LocaleConsumer>

      <NoteList notes={filteredNotes} onDelete={handleDelete} onArchive={handleArchive} />

      <Link to="/notes/new" className="floating-button">
        <BiPlus size={24} />
      </Link>
    </main>
  );
};

export default HomePage;
