import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import notecontext from "../context/notes/notecontext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
const Notes = (props) => {
  const context = useContext(notecontext);
  const { notes, fetchnotes,updatenotee } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchnotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [note, setnote] = useState({eid:"" ,etitle: "", edescription: "", etag: "default" })
  const ref = useRef(null)
  const closeref=useRef(null)
  const updatenote = (note) => {
    ref.current.click()
    setnote({eid:note._id,etitle:note.title,edescription:note.description,etag:note.tag})
  }
  
  const handlesubmit = (e) => {
     updatenotee(note.eid,note.etitle,note.edescription,note.etag);
     closeref.current.click()
     props.showalert("success","Updation Successfully..");
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>

      <AddNote showalert={props.showalert} />

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">TITLE</label>
                  <input type="text" name="etitle" className="form-control" id="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} minLength={5} required/>

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">DESCRIPTION</label>
                  <input type="text" name="edescription" className="form-control" id="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button type="button"  ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handlesubmit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>YOUR NOTE</h1>
        <div className="container mx-2">
          {notes.length===0 && "NO NOTE AVAILABLE! PLEASE ADD USEFULL NOTE."}
        </div>
        {notes.map((note) => {
          //   return note.title;
          return <Noteitem key={note._id} showalert={props.showalert} updatenote={updatenote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
