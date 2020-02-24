import React, { Component } from "react";
import "./Note.css";
import PropTypes from "prop-types";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteContent: props.noteContent,
      noteId: props.noteId
    };
  }
  handleRemoveNote = noteId => {
    this.props.removeNote(noteId);
  };
  render() {
    const { noteContent, noteId } = this.state;
    return (
      <div className="note fade-in">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(noteId)}
        >
          &times;
        </span>
        <p className="noteContent">{noteContent}</p>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};

export default Note;
