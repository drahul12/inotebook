import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({"enotes_text":""});

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const updateNote = (note) => {
    ref_modal.current.click();
    setNote({"enotes_text": note.notes_text, "e_id": note.id})
  };

  const ref_modal = useRef(null);
  const ref_close = useRef(null);

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  const handleUpdateNote = (e)=>{
      e.preventDefault();
      editNote(note.e_id, note.enotes_text);
      ref_close.current.click();
  }

  return (
    <>
      <AddNote />

      {/* Edit Modal */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref_modal}
      >
        Launch Update modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="enotes_text" className="form-label">
                    Note
                  </label>
                  <textarea
                    className="form-control"
                    id="enotes_text"
                    name="enotes_text"
                    rows="5"
                    value={note.enotes_text}
                    onChange={onChange}
                    minLength={5} required
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {ref_close}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateNote} disabled={note.enotes_text.length<5}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal Ends */}

      <div className="row">
        <h3>Your Notes</h3>
        {notes.length > 0 && notes.map((note, index) => {
          return (
            <NoteItem
              note={note}
              key={note.id}
              updateNote={updateNote}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
}
