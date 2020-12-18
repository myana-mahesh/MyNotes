import React,{useState} from 'react';
import './App.css';
import NotesList from "./components/NotesList";
import AddNote from './components/AddNote';
import Navbar from './components/navBar'


function App() {
  const [notes, setNotes] = useState([]); 
  const [filterdNotes, setFilterdNotes] = useState([]); 
  const [searchText, setSearchText] = useState('');
  const getNote = (note) => {
    
    console.log("n from app" + note.startDate)
    let date = new Date();
    if (note.startDate !== "" || notes.startDate === null || notes.startDate ===undefined){
      date = note.startDate;
    }
    let n = {
      title: note.title,
      noteDetail: note.noteDetail,
      date: date
    };
    setFilterdNotes([...notes,n])
    setNotes([...notes, n]);
    setSearchText("")
  }

  const getUpdatedNote = (currNote, editedNote, isDeleted) => {
    let newNotes = []

    if (!isDeleted) {
      editedNote.date = currNote.date;
    }
  
    if (!isDeleted) {
      newNotes = notes.map((note, index) => {
        console.log(note.title,note.noteDetail)
        if (((note.title).localeCompare(currNote.title)==0) && ((note.noteDetail).localeCompare(currNote.noteDetail)==0)) {
          return editedNote;
        
        } else {
          return note;
        }
      })
    }
    else {
      newNotes = notes;
      let ind;
      newNotes.map((note, index) => {
        if (((note.title).localeCompare(currNote.title)==0) && ((note.noteDetail).localeCompare(currNote.noteDetail)==0)) { 
          ind = index;
        }
      })
      newNotes.splice(ind, 1);
    }
    let newFilterdNotes=[];
    if (!isDeleted) { 
      newFilterdNotes=filterdNotes.map((note, index) => {
        if (((note.title).localeCompare(currNote.title)==0) && ((note.noteDetail).localeCompare(currNote.noteDetail)==0)) {
          console.log(note);
          return editedNote;
        } 
        else {
          return note;
        }
      })
    }
    else {
      newFilterdNotes = filterdNotes;
      let ind;
      newFilterdNotes.map((note, index) => {
        if (((note.title).localeCompare(currNote.title)==0) && ((note.noteDetail).localeCompare(currNote.noteDetail)==0)) { 
          ind = index;
        }
      })
      newFilterdNotes.splice(ind, 1);
    }
    setNotes(newNotes)
    setFilterdNotes(newFilterdNotes)
  }


  const getFilterdNotes = (filterdNotes) => {
    console.log(filterdNotes)
    setFilterdNotes(filterdNotes);

  }

  const getSearchText = (text) => {
    setSearchText(text);
    console.log(searchText);
  }

  return (
    <>
      <Navbar passSearchText={getSearchText }/>
      <AddNote passNote={getNote} />
      <NotesList notesArryay={notes} passCurrNote={getUpdatedNote} passFilterdNotes={getFilterdNotes} filterdNotes={filterdNotes} searchText={ searchText}/>
    </>
  );
}

export default App;
