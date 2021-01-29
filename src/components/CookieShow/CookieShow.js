import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button
// import messages from '../AutoDismissAlert/messages'
// import { Link } from 'react-router-dom'
import { purchaseShow } from '../../api/cookieCalls'
import Spinner from 'react-bootstrap/Spinner'

class CookieShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      purchase: null
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    purchaseShow(match.params.id, user)
      .then(res => {
        this.setState({ purchase: res.data.purchases })
        return res
      })
      .then(res => console.log('This is res, ', res))
      .then(() => msgAlert({
        heading: 'THIS SHOW WORKS',
        message: 'just the one here',
        variant: 'success'
      }))
      .catch(error => [
        msgAlert({
          heading: 'show fail',
          message: 'cannot show u bc: ' + error.message,
          variant: 'danger'
        })
      ])
  }

  render () {
    const { purchase } = this.state

    if (!purchase) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    return (
      <div>
        <h3>{purchase.name}</h3>
        <h4>price: {purchase.price}</h4>
        <button>update purchase</button>
      </div>
    )
  }
}

export default withRouter(CookieShow)
