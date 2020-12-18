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
    if(note.startDate !== "" || notes.startDate===null){
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

  const getUpdatedNote = (editedIndex, editedNote, isDeleted) => {
    let newNotes=[]
    if (!isDeleted) {
      newNotes = notes.map((note, index) => {
        if (index === editedIndex) {
          return editedNote;
        } else {
          return note;
        }
      })
    }
    else {
      newNotes = notes;
      newNotes.splice(editedIndex, 1);
    }
    setNotes(newNotes)
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
