import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
import purchases from '../../data/purchases'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { purchaseCreate } from '../../api/cookieCalls'

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
      }
    }
  }

  handleClick = event => {
    event.preventDefault()
    const { user } = this.props
    const cookieNum = event.target.dataset.cookieid
    // setPurchaseCount(purchaseCount + 1)
    // setPurchased(true)
    console.log('This is user ', user)
    console.log('Cookies extraction ', purchases)
    // console.log('Purchased: ' + purchased)
    // console.log('Cookie name: ' + name)
    purchaseCreate(user, purchases[cookieNum])
      .then(res => {
        this.setState({
          name: purchases[cookieNum].name,
          purchased: true,
          price: purchases[cookieNum].price,
          owner: user._id
        })
      })
      .catch(console.error)
  }

  cookieCards = purchases.map(cookie => {
    return (
      <Card key={cookie.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={cookie.photo} />
        <Card.Body>
          <Card.Title>{cookie.name}</Card.Title>
          <Card.Text>{cookie.description}</Card.Text>
          <Button onClick={this.handleClick} data-cookieid={cookie.id} >Purchase {cookie.name}</Button>
        </Card.Body>
      </Card>
    )
  })

  render () {
    return (
      <div style={cardContainerLayout}>
        { this.cookieCards }
      </div>
    )
  }
}

export default withRouter(CookieCreate)
