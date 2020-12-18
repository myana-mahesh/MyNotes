import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import datePicker from '../styles/datePicker.module.css'
import "react-datepicker/dist/react-datepicker.css";
import '../styles/AddNote.css';

export default function AddNote(props) {
    const [title, setTitle] = useState("");
    const [noteDetail, setNoteDetail] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const handleClick=(event)=>{
        event.preventDefault();
        console.log(title, noteDetail);
        if ((title !== null && title !== "") || (noteDetail !== null && noteDetail !== "")) {
            props.passNote({ title, noteDetail, startDate })
            console.log(startDate)
            setTitle("");
            setNoteDetail("");
            setStartDate(new Date());
        }
            
    }
    return (
        <form className="addNoteContainer" >
            <div className="form-group p-3 pb-4 container">
                <div className="row ml-0 mr-0" >
                    <div className="col-12">
                        <input className="form-control form-control-lg mb-2" type="text" placeholder="Title" required value={title} onChange={event=>{setTitle(event.target.value)}} ></input>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Add note" required value={noteDetail} onChange={event=>{setNoteDetail(event.target.value)}} ></textarea>
                    </div>
                    <div className="col-6 justify-content-center mt-2 ">
                        <DatePicker
                        className="test"
                        style={{boxShadow:"none",border:'none'}}
                        placeholderText="Select Date"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        ></DatePicker>
                        
                    </div>
                    <div className="col-6 mt-2">
                        <button type="submit" className="btn addButton  " onClick={handleClick}>Add Note</button>
                    </div>
                </div>
            </div>    
        </form>     
    );
}