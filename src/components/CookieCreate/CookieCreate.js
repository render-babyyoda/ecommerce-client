import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
// import apiUrl from '../apiConfig'
import purchases from '../../data/purchases'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { purchaseCreate } from '../../api/cookieCalls'
import messages from '../AutoDismissAlert/messages'
// import { Elements } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
// import CheckoutForm from './CheckoutForm/CheckoutForm'
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'

toast.configure()

// const stripePromise = loadStripe('pk_test_51IHMdiGycoFI2vKg153aSQWh5vqeQeJECeHOJrfezr3jSrzQb7F7V9d6zHhIdX84yR63UC4EeSZqOftZXoQSvYdJ00qveVEqe7')

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
        owner: null,
        status: false
      },
      createdId: null
    }
  }
  //
  // handleClick = () => {
  //   const { cookie } = this.props
  //   const cookieNum = cookie.id
  //
  //   purchaseCreate(cookieNum)
  //     .then(res => {
  //       this.setState({
  //         name: cookie.name,
  //         price: cookie.price
  //       })
  //     })
  //     .catch()
  // }

  handleClick = event => {
    // event.preventDefault()
    const { user, msgAlert } = this.props
    const cookieNum = event.target.dataset.cookieid

    console.log('This is user ', user)
    // console.log('Cookies extraction ', purchases)
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
      // .then(res => console.log('This is res: ', res))
      .then(() => msgAlert({
        heading: 'Cookie purchased!',
        message: messages.purchaseSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'No cookie for you = (',
          message: messages.purchaseFailure + error.message,
          variant: 'danger'
        })
      })
  }

  cookieCards = purchases.map(cookie => {
    async function handleToken (token) {
      // console.log({ token })
      await axios.post('http://localhost:4741/checkout', {
        token,
        cookie
      })
      // console.log('This is response data: ', response.data)
      // const { status } = response.data
      // this.setState({
      //   status: true
      // })
      if (cookie) {
        toast('Success! Check email for details',
          { type: 'success' })
        // this.handleClick()
      } else {
        toast('Something went wrong. Please try again.',
          { type: 'error' })
      }
    }

    return (
      <Card key={cookie.id} style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={cookie.photo} style={{ height: '18rem' }} />
        <Card.Body id="card-body">
          <Card.Title>{cookie.name}</Card.Title>
          <Card.Text>{cookie.description}</Card.Text>
          <Card.Text>${cookie.price}</Card.Text>
          <Button onClick={this.handleClick} data-cookieid={cookie.id} >Purchase {cookie.name}</Button>
          <StripeCheckout
            stripeKey='pk_test_51IHMdiGycoFI2vKg153aSQWh5vqeQeJECeHOJrfezr3jSrzQb7F7V9d6zHhIdX84yR63UC4EeSZqOftZXoQSvYdJ00qveVEqe7'
            token={handleToken}
            billingAddress
            shippingAddress
            amount={cookie.price * 100}
            name={cookie.name}
            // opened={this.handleClick}
          />
          {/* // <Elements stripe={stripePromise}>
          //   <CheckoutForm />
          // </Elements> */}
        </Card.Body>
      </Card>
    )
  })

  render () {
    const { purchase } = this.state
    if (purchase) {
      return (
        <StripeCheckout />
      )
    }

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
