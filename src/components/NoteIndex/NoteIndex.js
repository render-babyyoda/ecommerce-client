import React, { Component } from 'react'
import { noteIndex } from '../../api/noteCalls'
import { Link, withRouter } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import messages from '../AutoDismissAlert/messages'
// import NoteForm from '../NoteForm/NoteForm'

class NoteIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notes: null
    }
  }
  componentDidMount () {
    const { msgAlert, user, purchase } = this.props
    console.log('this is purchase ', purchase)
    noteIndex(user, purchase._id)
      .then(res => console.log('this is Notesres ', res))
      .then(res => this.setState({ notes: res.data.purchases.notes }))
      .then(() => msgAlert({
        heading: 'All Notes',
        message: messages.purchaseIndexSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to retrieve notes',
          message: messages.purchaseIndexFailure + error.message,
          variant: 'danger'
        })
      })
    console.log('we got this far')
  }
  render () {
    const { notes, purchase } = this.state
    if (!notes) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    const notesJsx = notes.map(note => (
      <Link to={`/${purchase._id}/notes/${note._id}`} key={note._id}>
        <li>
            Title: {note.title}
          <br />
            Description: {note.description}
        </li>
      </Link>
    ))

    return (
      <div>
        <h3>notes</h3>
        <ol>
          {notesJsx}
        </ol>
      </div>
    )
  }
}

export default withRouter(NoteIndex)
