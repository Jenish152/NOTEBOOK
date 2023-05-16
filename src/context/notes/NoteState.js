import NoteContext from "./notecontext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  const note = []



  const [notes, setnote] = useState(note);
  const fetchnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      }
    });
    const json = await response.json();
    setnote(json);
  }
  //add note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    setnote(notes.concat(json));
  }
  //delete note:complete
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json);
    const newnote = notes.filter((note) => { return note._id !== id })
    setnote(newnote)
  }
  //update note
  const updatenotee = async (id, title, description, tag) => {
    console.log(id, title);
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);
    let newnote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
    }
    setnote(newnote);
  }

  return (
    <NoteContext.Provider value={{ notes, setnote, addnote, deletenote, updatenotee, fetchnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}
export default NoteState;