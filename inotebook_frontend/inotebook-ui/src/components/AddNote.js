import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

function AddNote() {
    const context = useContext(NoteContext);
    const {addNote} = context

    const [note, setNote] = useState({"notes_text":""});

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note);
        setNote({"notes_text":""})
    }

  return (
    <>
      <div className="container my-3">
      <h3>Add Your Note</h3>
      
      <form>
      <div className="mb-3">
        <label htmlFor="notes_text" className="form-label">Note</label>
        <textarea className="form-control" value={note.notes_text} minLength={5} id="notes_text" name='notes_text' rows="5" onChange={onChange} required></textarea>
      </div>
      <button className='btn btn-primary' type='submit' onClick={handleClick} disabled={note.notes_text.length<5}>Submit</button>

      </form>
      </div>
    </>
  )
}

export default AddNote
