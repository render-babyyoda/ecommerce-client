import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import messages from '../AutoDismissAlert/messages'
// import { Link } from 'react-router-dom'
import { purchaseShow, purchaseUpdate } from '../../api/cookieCalls'
import Spinner from 'react-bootstrap/Spinner'

class CookieShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      purchase: null,
      updated: false
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
      <div>
        <Card key={purchase.id} style={{ width: '18rem', margin: '10px' }}>
          <Card.Body id="card-body">
            <Card.Title>
            Purchase: {purchase.name}
              <input
                placeholder='Edit Name'
                name='name'
                value={purchase.name}
                onChange={this.handleChange}
              />
            </Card.Title>
            <Card.Text>
            Price: {purchase.price}
              <input
                placeholder='Edit Price'
                name='price'
                value={purchase.price}
                onChange={this.handleChange}
              />
            </Card.Text>
            <Button
              onClick={this.handleClick}
              data-cookieid={purchase.id}>
            Update Purchase
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default withRouter(CookieShow)

// <h3>{purchase.name}</h3>
// <h4>price: {purchase.price}</h4>
// <button>update purchase</button>
