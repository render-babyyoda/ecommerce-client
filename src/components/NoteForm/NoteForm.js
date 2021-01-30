import React from 'react'

const NoteForm = ({ note, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      required
      placeholder='Enter note title'
      // This name should line up with the state we want to change
      name='title'
      value={note.title}
      onChange={handleChange}
    />
    <label>Description</label>
    <input
      required
      placeholder='Enter note description'
      // This name should line up with the state we want to change
      name='description'
      value={note.description}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
  </form>
)

export default NoteForm
