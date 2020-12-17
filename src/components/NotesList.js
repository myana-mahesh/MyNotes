import React, { useState } from 'react';

import '../styles/todo.css';
import {Modal,Button} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

function NotesList(props) {
    
    const [currNote, setCurrNote] = useState({});
    const [currIndex, setCurrIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [sortValue, setSortValue] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [weekPicker, setWeekPicker] = useState(false);
    const [monthPicker, setMonthPicker] = useState(false);
    const [yearPicker, setYearPicker] = useState(false);
    const [dateFormat, setDateFormat] = useState("dd mm yyyy");
    const [filterUsed, setFilterUsed] = useState(false);
    let titleRef = React.createRef();
    let detailRef = React.createRef();
    let datePickerRef = React.createRef();

    const handleClose = () => {
        handleSave();
        setShow(false)
    };
    const handleAlertShow = () => {
        setShowAlert(true);
    }
    const handleALertClose = () => {
        setShowAlert(false);
    }
    
    const showModal = (index) => { 
        setCurrIndex(index);
        setCurrNote(props.notesArryay[index]);
        console.log(currNote)
        setShow(true);
    }
    
    const handleDelete = () => {
        handleALertClose();
        let tempNote = {
            title: titleRef.current.innerHTML,
            noteDetail: detailRef.current.innerHTML,
            date: new Date()
        }
        props.passCurrNote(currIndex, tempNote, true)
        setShow(false);
    }

    const handleSort = (event) => {
        setSortValue(event.target.value);
        let Allnotes = props.notesArryay;
        if (event.target.value === "oldest first") {
            Allnotes.sort((a, b) => a.date < b.date ? 1 : -1);
        }
        else {
            Allnotes.sort((a, b) => a.date > b.date ? 1 : -1);
        }
        let Allnotes2 = props.filterdNotes;
        if (event.target.value === "oldest first") {
            Allnotes2.sort((a, b) => a.date < b.date ? 1 : -1);
        }
        else {
            Allnotes2.sort((a, b) => a.date > b.date ? 1 : -1);
        }
        
        
    }

    const handleFilter = (event) => {
        setFilterValue(event.target.value);
        if (event.target.value === "week") {
            setDateFormat("dd MM yyyy")
            setMonthPicker(false);
            setWeekPicker(true);
            setYearPicker(false);
        }
        if (event.target.value === "month") {
            setDateFormat("MMMM yyyy")
            setMonthPicker(true);
            setWeekPicker(false);
            setYearPicker(false);
        }
        if (event.target.value === "year") {
            setDateFormat("yyyy")
            setMonthPicker(false);
            setWeekPicker(false);
            setYearPicker(true);
        }
        
    }

    const handleCalendarClose = () => {
        console.log(startDate);
        if (filterValue == "week") {
            filterByWeek();
        }
        else if (filterValue === 'year') {
            filterByYear();
        }
        else if (filterValue === 'month') {
            filterByMonth();
        }
        else {
            filterUsed(false);
        }
        
    }

    const filterByWeek = () => {
        let tempAllNotes = [];
        const lastDate = new Date(startDate);
        lastDate.setDate(lastDate.getDate() + 6)
         props.notesArryay.map((n) => {
            if (moment(n.date).format('DD MM yyyy') >= moment(startDate).format('DD MM yyyy') && moment(n.date).format('DD MM yyyy') <= moment(lastDate).format('DD MM yyyy')) {
                tempAllNotes.push(n);
            }
        })
        props.passFilterdNotes(tempAllNotes);
        setFilterUsed(true);
    }

    const filterByMonth = () => {
        let tempAllNotes = [];
         props.notesArryay.map((n) => {
            if (moment(n.date).format('MM yyyy') == moment(startDate).format('MM yyyy')) {
                tempAllNotes.push(n);
            }
        })
        props.passFilterdNotes(tempAllNotes);
        setFilterUsed(true);
    };

    const filterByYear = () => {
        let tempAllNotes = [];
         props.notesArryay.map((n) => {
            if (moment(n.date).format('yyyy') == moment(startDate).format('yyyy')) {
                tempAllNotes.push(n);
            }
        })
        props.passFilterdNotes(tempAllNotes);
        setFilterUsed(true);
   
    }

    const handleSave = () => {
        handleALertClose();
        let tempNote = {
            title: titleRef.current.innerHTML,
            noteDetail: detailRef.current.innerHTML,
            date: new Date()
        }
        if (tempNote.title !== "" || tempNote.noteDetail !== "") {
            props.passCurrNote(currIndex, tempNote, false)
        }
        else if(tempNote.title === "" && tempNote.noteDetail === ""){
            handleDelete();
        }
        setShow(false);
    }   
 
    return (
        <div className="">
            
                
            {props.notesArryay.length > 1 ?
                (<div className="container">
                    <div className="row">
                        <div className="col justify-content-around">
                            
                                <select value={sortValue} onChange={handleSort} className="ml-4 mb-1" style={{ background: "#202124", color: 'white', padding: "0.5rem",borderRadius:'10%' }}>
                                    <option value="latest first">latest first</option>
                                    <option value="oldest first">oldest first</option>
                                </select>
                            
                                <label style={{color:"white",float:'right'}} className="mr-4 mb-1">Filter By
                                    <select value={filterValue} onChange={handleFilter} className="ml-1"  style={{ background: "#202124", color: 'white', padding: "0.5rem",borderRadius:'10%' }}>
                                        <option value="">None</option>
                                        <option value="week">Week</option>
                                        <option value="month">Month</option>
                                        <option value="year">Year</option>
                                    </select>
                            </label>
                            { filterValue?
                                <DatePicker
                                    style={{ float: "right" }}
                                    ref={datePickerRef}
                                    className="datePicker"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    placeholderText="I have been cleared!"
                                    showYearPicker={yearPicker}
                                    showMonthYearPicker={monthPicker}
                                    dateFormat={dateFormat}
                                    onCalendarClose={handleCalendarClose}
                                    >{filterValue === "week" ? <div style={{ color: "red", fontSize: 'normal' }}>Select first date of week</div> : <></>}
                                    </DatePicker> : <></>
                            }
                        </div>  
                    </div>
                </div>
                ) : <></>
            }
            <div className="modals">
                <Modal show={show} onHide={handleClose} >
                    <Modal.Header  >
                        <Modal.Title contentEditable="true"  ref={titleRef}>{currNote.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body contentEditable="true" ref={detailRef}> {currNote.noteDetail}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleAlertShow}>
                            Delete
                        </Button>
                        <Button variant="info" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showAlert} onHide={handleALertClose} style={{marginTop:"12rem"}}>
                    <Modal.Body style={{maxHeight:"100px",minHeight:"100px"}} >Do You really want to delete this Note</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete}>
                            Yes
                        </Button>
                        <Button variant="info" onClick={handleALertClose}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {   props.notesArryay.length>=0 &&  !filterUsed && props.searchText=="" ?(
                <div className="content container-fluid">
                    <div className="row mt-3" >
                        {props.notesArryay.map((notes, index) => <div key={index} className=" col-lg-3 col-md-4 col-12 mb-4 justify-content-center " onClick={() => showModal(index)}><div className="card" key={index} style={{ height:"100%"}}>
                                <div className="card-body">
                                <h5 className="card-title">{notes.title}</h5>
                                <p className="card-text" >{notes.noteDetail}</p>
                                </div>  
                        </div></div>)}
                        
                    </div>
                </div>) :
                props.searchText==""?
                <div className="content container-fluid">
                        <div className="row mt-3" >
                            {props.filterdNotes.map((notes, index) =>
                                <div key={index} className=" col-lg-3 col-md-4 col-12 mb-4 justify-content-center " onClick={() => showModal(index)}><div className="card" key={index} style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{notes.title}</h5>
                                        <p className="card-text" >{notes.noteDetail}</p>
                                    </div>  
                                </div>
                                </div>)}
                        </div>
                    </div> :
                    <div className="content container-fluid">
                        <div className="row mt-3" >
                            {props.notesArryay.map((notes, index) => 
                                notes.title.includes(props.searchText) ?
                                    <div key={index} className=" col-lg-3 col-md-4 col-12 mb-4 justify-content-center " onClick={() => showModal(index)}><div className="card" key={index} style={{ height:"100%"}}>
                                        <div className="card-body">
                                        <h5 className="card-title">{notes.title}</h5>
                                        <p className="card-text" >{notes.noteDetail}</p>
                                    </div>  
                                    </div>
                                    </div>:<></>
                                
                            )}
                            
                        </div>
                    </div>
            }
            
        </div>
    );
}
export default NotesList;