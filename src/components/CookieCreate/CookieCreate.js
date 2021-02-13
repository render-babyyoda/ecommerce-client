import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import purchases from '../../data/purchases'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { purchaseCreate } from '../../api/cookieCalls'
import messages from '../AutoDismissAlert/messages'

import StripeCheckout from 'react-stripe-checkout'

const cardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap'
}

class CookieCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cookie: {
        name: null,
        purchased: false,
        price: 0,
        owner: null
      },
      createdId: null
    }
  }

  handleClick = event => {
    const { user, msgAlert } = this.props
    const cookieNum = event.target.dataset.cookieid
    purchaseCreate(user, purchases[cookieNum])
      .then(res => {
        this.setState({
          name: purchases[cookieNum].name,
          purchased: true,
          price: purchases[cookieNum].price,
          owner: user._id,
          createdId: res.data.purchases._id
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'No cookie for you = (',
          message: messages.purchaseFailure + error.message,
          variant: 'danger'
        })
      })
  }

  cookieCards = purchases.map(cookie => {
    const { msgAlert } = this.props
    async function handleToken (token) {
      await axios.post(apiUrl + '/checkout', {
        token,
        cookie
      })
      try {
        msgAlert({
          heading: 'Cookie purchased!',
          message: messages.purchaseSuccess,
          variant: 'success'
        })
      } catch (error) {
        msgAlert({
          heading: 'No cookie for you = (',
          message: messages.purchaseFailure,
          variant: 'danger'
        })
      }
    }

    return (
      <Card key={cookie.id} style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={cookie.photo} style={{ height: '18rem' }} />
        <Card.Body id="card-body">
          <Card.Title>{cookie.name}</Card.Title>
          <Card.Text>{cookie.description}</Card.Text>
          <Card.Text>${cookie.price}</Card.Text>
          <StripeCheckout
            stripeKey='pk_test_51IHMdiGycoFI2vKg153aSQWh5vqeQeJECeHOJrfezr3jSrzQb7F7V9d6zHhIdX84yR63UC4EeSZqOftZXoQSvYdJ00qveVEqe7'
            token={handleToken}
            billingAddress
            shippingAddress
            amount={cookie.price * 100}
            name={cookie.name}
          >
            <Button className="btn btn-primary" onClick={this.handleClick} data-cookieid={cookie.id} >Purchase {cookie.name}</Button>
          </StripeCheckout>
        </Card.Body>
      </Card>
    )
  })

  render () {
    return (
      <div>
        <h3>Purchase a cookie</h3>
        <h5>Check out our awesome selection!</h5>
        <div id="cookie-catalog" style={cardContainerLayout}>
          { this.cookieCards }
        </div>
      </div>
    )
  }
}

export default withRouter(CookieCreate)
