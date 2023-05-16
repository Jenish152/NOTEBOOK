import React,{useContext} from "react";
import notecontext from "../context/notes/notecontext";

const Noteitem = (props) => {
  const context=useContext(notecontext);
  const {deletenote}=context;
  const cardstyle = {
    
    "margin":"10px"

  };
  
  const { note,updatenote } = props;
  return (
     <div className="col-md-3">
      <div className="card my-3 " style={cardstyle}>
        
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deletenote(note._id);
          props.showalert("success","Deletion SuccessFully..")}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{updatenote(note)}}></i>
        </div>
      </div>
      </div>
    
  );
};

export default Noteitem;
