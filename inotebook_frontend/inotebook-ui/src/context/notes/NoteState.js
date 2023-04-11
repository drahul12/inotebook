import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const host = "http://localhost:8000"
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMjI3NjI3LCJpYXQiOjE2ODEyMTY4MjcsImp0aSI6Ijg1MDY4NjFkZDkzZDQyYjBiOTA3NWM5OTY0NWI3M2NlIiwidXNlcl9pZCI6Mn0.sPmRMsmUu3_M0JUZh-W7cVm7mWsKfnt0XPbmbEM0cXk"
    const [notes, setNotes] = useState([]);

    const getNotes = async () =>{
      let url = `${host}/api/notes/`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
      });
      const json = await response.json();
      setNotes(json);
    }

    const addNote = async (note)=>{
      let url = `${host}/api/notes/`
      let data = {"notes_text": note.notes_text}
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if(json.msg === 'Note Added'){
        getNotes();
      }

    }

    const editNote = async (id, notes_text)=>{
      let url = `${host}/api/notes/${id}/`
      let data = {"notes_text": notes_text}
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
        body: JSON.stringify(data),
      });
      const json = await response.json(); 
      getNotes();
    }

    const deleteNote = async (id)=>{
      let url = `${host}/api/notes/${id}/`
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
      });
      // const json = await response.json(); 
      getNotes();
    }

    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState