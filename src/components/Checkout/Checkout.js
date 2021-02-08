import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import { purchaseUpdate } from '../../api/cookieCalls'
import Spinner from 'react-bootstrap/Spinner'

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      purchase: null,
      updated: false
    }
  }

  componentDidMount () {
    console.log('We made it')
    // const { user, match, msgAlert } = this.props
    //
    // purchaseShow(match.params.id, user)
    //   .then(res => {
    //     this.setState({ purchase: res.data.purchases })
    //     return res
    //   })
    //   // .then(res => console.log('This is res, ', res))
    //   .then(() => msgAlert({
    //     heading: 'Here is your cookie',
    //     message: 'just the one here',
    //     variant: 'success'
    //   }))
    //   .catch(error => [
    //     msgAlert({
    //       heading: 'No cookie for u = (',
    //       message: 'cannot show u bc: ' + error.message,
    //       variant: 'danger'
    //     })
    //   ])
  }

  handleClick = (event) => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    const { purchase } = this.state
    purchaseUpdate(match.params.id, purchase, user)
      .then(res => this.setState({ updated: true }))
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
    event.persist()
    this.setState((state) => {
      return {
        purchase: { ...state.purchase, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    const { purchase, updated } = this.state
    if (!purchase) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    if (updated) {
      // redirect to the purchases index page
      return <Redirect to ={'/purchases'} />
    }

    return (
      <div id="cookie-show-div">
        <h3>This is successfully checking out</h3>
      </div>
    )
  }
}

export default withRouter(Checkout)
