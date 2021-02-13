import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import purchases from '../../data/purchases'
import Card from 'react-bootstrap/Card'

const cardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap'
}

class UnAuthHomepage extends Component {
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

  cookieCards = purchases.map(cookie => {
    return (
      <Card key={cookie.id} style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={cookie.photo} style={{ height: '18rem' }} />
        <Card.Body id="card-body">
          <Card.Title>{cookie.name}</Card.Title>
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

export default withRouter(UnAuthHomepage)
