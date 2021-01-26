import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import cookieData from '../../data/cookieData'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { purchaseCreate } from '../../api/cookieCalls'

const cardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap'
}

const CookieCards = props => {
  const [name, setName] = useState('')

  // const { cookie } = this.state
  const handleClick = (event) => {
    const { user, match } = this.props

    purchaseCreate(match.params.id, user)
    console.log('purchased cookie!')
    console.log('this is cookie data ', cookieData)
    event.preventDefault()
      .then(() => setName({ name }))
      .catch(console.error)
  }

  const cookieCards = cookieData.map(cookie => {
    return (
      <Card key={cookie.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={cookie.photo} />
        <Card.Body>
          <Card.Title>{cookie.name}</Card.Title>
          <Card.Text>{cookie.description}</Card.Text>
          <Button onClick={handleClick}>Purchase {cookie.name}</Button>
        </Card.Body>
      </Card>
    )
  })
  return (
    <div style={cardContainerLayout}>
      { cookieCards }
    </div>
  )
}

export default withRouter(CookieCards)
