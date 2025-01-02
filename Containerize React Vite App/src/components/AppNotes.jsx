import { useState, useEffect } from "react";

const AppNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:9000/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async () => {
    try {
      const note = { content: newNote };
      const response = await fetch("http://localhost:9000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      setNotes([...notes, data]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <h1>Notes App</h1>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a note"
      />
      <button onClick={addNote}>Add Note</button>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default AppNotes;
