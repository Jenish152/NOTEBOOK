import React,{useContext,useState} from 'react';
import notecontext from "../context/notes/notecontext";

const AddNote = (props) => {
    const context = useContext(notecontext);
    const {addnote} = context;
    const [note, setnote] = useState({title:"",description:"",tag:"default"}) 
    const onchange=(e)=>{
         setnote({...note,[e.target.name]:e.target.value})
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
       addnote(note.title,note.description,note.tag);
       setnote({title:"",description:"",tag:"default"});
       props.showalert("success","Note Added SuccessFully..");
    }
  return (
    <div className="container my-3">
    <h1>ADD A NOTE</h1>
    <form>
<div className="mb-3">
  <label htmlFor="title" className="form-label">TITLE</label>
  <input type="text" name="title" className="form-control" id="title" aria-describedby="emailHelp" minLength={5} onChange={onchange} value={note.title} required/>
  
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">DESCRIPTION</label>
  <input type="text" name="description" className="form-control" id="description" value={note.description} onChange={onchange} minLength={5} required/>
</div>

<button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
</form>
    </div>
  )
}

export default AddNote