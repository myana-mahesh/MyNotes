import React, { useState } from 'react';
import '../styles/AddNote.css';
export default function AddNote(props) {
    const [title, setTitle] = useState("");
    const [noteDetail,setNoteDetail]=useState("");
    const handleClick=(event)=>{
        event.preventDefault();
        console.log(title, noteDetail);
        if ((title !== null && title !== "") || (noteDetail !== null && noteDetail !== "")) {
            props.passNote({ title, noteDetail })
            setTitle("");
            setNoteDetail("");
        }
            
    }
    return (
        <form className="addNoteContainer" >
            <div className="form-group p-3 pb-4  container"   >
                <div className="row ml-0 mr-0">
                    <div className="col-12">
                        <input className="form-control form-control-lg mb-2" type="text" placeholder="Title" required value={title} onChange={event=>{setTitle(event.target.value)}} ></input>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Add note" required value={noteDetail} onChange={event=>{setNoteDetail(event.target.value)}} ></textarea>
                    </div>
                    <div className=" mt-2 ml-auto mr-auto ">
                        <button type="submit" className="btn addButton  " onClick={handleClick}>Add Note</button>
                    </div>
                </div>
            </div>    
        </form>     
    );
}