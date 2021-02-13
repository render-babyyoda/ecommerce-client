import React, { Component } from 'react'
import messages from '../AutoDismissAlert/messages'
import { Link } from 'react-router-dom'
import { purchaseUpdate, purchaseIndex } from '../../api/cookieCalls'
import Spinner from 'react-bootstrap/Spinner'

class CookieIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      purchases: null
    }
  }

  componentDidMount () {
    const { msgAlert, user, purchases } = this.props

    purchaseIndex(user, purchases)
      .then(res => this.setState({ purchases: res.data.purchases }))
      .then(() => msgAlert({
        heading: 'Here are your past purchases',
        message: messages.purchaseIndexSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to retrieve purchases',
          message: messages.purchaseIndexFailure + error.message,
          variant: 'danger'
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { purchases } = this.state
    purchaseUpdate(user, purchases)
      .then(res => {
        this.setState({ purchases: res.data.purchases })
        return res
      })
      .then(res => msgAlert({
        heading: 'Past Purchases',
        message: messages.purchaseIndexSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to retrieve purchases',
          message: messages.purchaseIndexFailure + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { purchases } = this.state
    if (!purchases) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const cookiesJsx = purchases.map(purchase => (
      <Link to={`/purchases/${purchase._id}`} key={purchase._id}>
        <li>
            Cookie: {purchase.name}
          <br />
            Price: {purchase.price}
        </li>
      </Link>
    ))

    return (
      <div>
        <h3>Purchase History</h3>
        <h5>Click on a purchase to view reviews or make edits</h5>
        <ol>
          {cookiesJsx}
        </ol>
      </div>
    )
  }
}

export default CookieIndex
