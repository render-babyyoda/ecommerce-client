import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import purchases from '../../data/purchases'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
import { noteCreate } from '../../api/noteCalls'
// import messages from '../AutoDismissAlert/messages'
import NoteForm from '../NoteForm/NoteForm'

class CreateNote extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: ''
    }
  }

  handleClick = (event) => {
    // console.log('You got to HandleClick')
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { note } = this.state
    noteCreate(user, note)
      .then(res => this.setState({ note: note }))
      .then(() => {
        msgAlert({
          heading: 'Updated Purchase Successfully',
          message: 'Purchase has been updated',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'Updating Purchase Failed',
          message: 'Purchase was not updated due to error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleChange = event => {
    // console.log('You got to change')
    event.persist()
    this.setState((state) => {
      return {
        purchase: { ...state.purchase, [event.target.name]: event.target.value }
      }
    })
  }
  render () {
    const { note } = this.state

    return (
      <div>
        <h3>Create Note</h3>
        <NoteForm
          note={note}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default CreateNote
