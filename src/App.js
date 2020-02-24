import React, { Component } from "react";
import "./App.css";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import { DB_CONFIG } from "./Config/config";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  constructor() {
    super();
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app
      .database()
      .ref()
      .child("notes");
    // We're going to setup the React state of our component
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    const notes = [...this.state.notes];

    // DataSnapshot
    this.db.on("child_added", snap => {
      notes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({
        notes
      });
    });

    this.db.on("child_removed", snap => {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === snap.key) {
          notes.splice(i, 1);
        }
      }
      this.setState({
        notes
      });
    });
  }

  addNote = note => {
    this.db.push().set({ noteContent: note });
  };

  removeNote = noteId => {
    this.db.child(noteId).remove();
  };

  render() {
    const { notes } = this.state;
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="notesBody">
          {notes.map(note => (
            <Note
              noteContent={note.noteContent}
              noteId={note.id}
              key={note.id}
              removeNote={this.removeNote}
            />
          ))}
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
