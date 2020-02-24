import React, { Component } from "react";
import "./NoteForm.css";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: ""
    };
  }

  // When the user input changes, set the newNoteContent
  // to the value of what's in the input box.
  handleUserInput = ({ target: input }) => {
    const newNoteContent = input.value; // the value of the text input
    this.setState({
      newNoteContent
    });
  };

  writeNote = event => {
    // call a method that sets the noteContent for a note to
    // the value of the input
    this.props.addNote(this.state.newNoteContent);
    // set newNoteContent back to an empty string
    this.setState({
      newNoteContent: ""
    });
  };

  render() {
    const { newNoteContent } = this.state;
    return (
      <div className="formWrapper">
        <input
          className="noteInput"
          placeholder="Write a new note..."
          value={newNoteContent}
          onChange={this.handleUserInput}
        />
        <button className="noteButton" onClick={this.writeNote}>
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
