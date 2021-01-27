import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
import cookieData from '../../data/cookieData'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import { purchaseCreate } from '../../api/cookieCalls'

const cardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap'
}

const CookieCards = props => {
  const [name, setName] = useState(null)
  const [purchased, setPurchased] = useState(false)
  const [purchaseCount, setPurchaseCount] = useState(0)

  const handleClick = (event) => {
    const { user } = this.props
    const cookieNum = event.target.dataset.cookieid
    console.log('This is user ', user)
    setPurchaseCount(purchaseCount + 1)
    setPurchased(true)
    console.log('Cookies extraction ', cookieData)
    setName(cookieData[cookieNum].name)
    console.log('Purchased: ' + purchased)
    console.log('Cookie name: ' + name)
    // purchaseCreate(user, cookieData)
    // event.preventDefault()
  }

  const cookieCards = cookieData.map(cookie => {
    return (
      <Card key={cookie.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={cookie.photo} />
        <Card.Body>
          <Card.Title>{cookie.name}</Card.Title>
          <Card.Text>{cookie.description}</Card.Text>
          <Button onClick={handleClick} data-cookieid={cookie.id} >Purchase {cookie.name}</Button>
        </Card.Body>
      </Card>
    )
  })
  return (
    <div style={cardContainerLayout}>
      { cookieCards }
      <p>Purchase Count is {purchaseCount}</p>
    </div>
  )
}

export default withRouter(CookieCards)
