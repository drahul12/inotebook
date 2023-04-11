import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {
  const context = useContext(NoteContext);
    const {editNote, deleteNote} = context

    const handleDelete = (event)=>{
      event.preventDefault();
      deleteNote(props.note.id)
    }

    const handleEdit = (event)=>{
      event.preventDefault();
      editNote(props.note.id, props.note.notes_text)
    }

    return (
    <>
      <div className="card col-md-4 mx-1" >
        <div className="card-body">
            <h5 className="card-title">{props.index + 1}.</h5>
            <p className="card-text">{props.note.notes_text}</p>
            <span className="card-link">Created: {props.note.created_at.split('T')[0]}</span>
            <span className="card-link">Modified: {props.note.modified_at.split('T')[0]}</span>
            <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{props.updateNote(props.note)}}></i> {/* edit */}
            <i className="fa-solid fa-trash mx-1" onClick={handleDelete}></i> {/* delete */}

        </div>
        </div>

    </>
  );
}

export default NoteItem;
