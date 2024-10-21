import './stickyNotes.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme from './hooksExercise';
import React, { useState, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";

declare var require: any;


export const StickyNotes = () => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
   id: -1,
   title: "",
   content: "",
   label: Label.other,
   fav: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);

const createNoteHandler = (event: React.FormEvent) => {
   event.preventDefault();
   console.log("title: ", createNote.title);
   console.log("content: ", createNote.content);
   createNote.id = notes.length + 1;
   setNotes([createNote, ...notes]);
   setCreateNote(initialNote);
 };

 const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter(note => id != note.id))
 };

 const [favList, setFavList] = useState([initialNote]);

 
 const heartCheck = (note: Note) => {
    if (note.fav == false) {
        return require("./images/grey.png");
    }
    else {
        return require("./images/red.png");
    }
 }
 const favNoteHandler = (note: Note) => {

    if (note.fav == false) {
        note.fav = true;
        setFavList([...favList, note]);
    }
    else {
        note.fav = false;
        setFavList(favList.filter(note => note.fav != false));
    }
 };

 const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

 const updateNoteHandler = (input: Note) => {
    selectedNote.id = input.id;
    selectedNote.fav = input.fav;
    
    if (selectedNote.fav == true) {
        var tempList = favList.filter(note => note.title != input.title);
        setFavList([...tempList, selectedNote]);
    }
    setNotes(notes.map(note => (note.id === selectedNote.id ? selectedNote : note)));
 }


  return (
    
    <div style={{
        background: currentTheme.background,
        color: currentTheme.foreground,
        padding: "20px"
      }}className='app-container' >
  	<form className="note-form" onSubmit={createNoteHandler} >
    	<div>
      	<input
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea 
            placeholder="Note Content"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
        	required>
      	</textarea>
    	</div>
   
  <div style={{
        background: currentTheme.background,
        color: currentTheme.foreground,
      }}>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label })}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

    	<div><button type="submit">Create Note</button></div>
  	</form>
  	<div className="notes-grid" >
    	{notes.map((note) => (
      	<div style={{
            background: currentTheme.background,
            color: currentTheme.foreground,
            padding: "20px"
          }}
        	key={note.id}
        	className="note-item">
        	<div className="notes-header">
            <button aria-label="heartButton" onClick={() => favNoteHandler(note)}>
                <img id="heart" src= {heartCheck(note)} width="15px"></img>
            </button>
          	<button onClick={() => deleteNoteHandler(note.id)}>x</button>
        	</div>
            
        	    <h2 data-testid="noteTitle" contentEditable="true" onInput={(event : React.FormEvent<HTMLParagraphElement>) =>
          	    setSelectedNote({ ...selectedNote, title: event.currentTarget.innerText})}> {note.title} </h2>
        	    <p data-testid="noteContent" contentEditable="true" onInput={(event : React.FormEvent<HTMLParagraphElement>) =>
          	    setSelectedNote({ ...selectedNote, content: event.currentTarget.innerText })}>  {note.content} </p>
        	    <p data-testid="noteLabel" contentEditable="true" onInput={(event : React.FormEvent<HTMLParagraphElement>) =>
          	    setSelectedNote({ ...selectedNote, label: event.currentTarget.innerText as Label})}> {note.label} </p>
                <div><button type="button" onClick={() => updateNoteHandler(note)}>Update</button></div>    
      	</div>
    	))}
  	</div>
    <div style={{
        background: currentTheme.background,
        color: currentTheme.foreground,
        padding: "20px"
      }}>
        <h1> List of Favorites:" </h1>
        {favList.map((note) => (
            <p> {note.title} </p>
        ))}
    </div>
    <div style={{
        background: currentTheme.background,
        color: currentTheme.foreground,
        padding: "20px"
      }}>
        <ThemeContext.Provider value={currentTheme}>
        <button onClick={toggleTheme}> Toggle Theme </button>
        </ThemeContext.Provider>
    </div>
	</div>  
  );
}
