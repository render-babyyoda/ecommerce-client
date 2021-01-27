import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../apiConfig'
import cookieData from '../../data/cookieData'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// import cookiesJsx from './Cookies'
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

  // const { cookie } = this.state
  let cookieNum // = the id of the cookie associated with that card
  const handleClick = (event) => {
    setPurchaseCount(purchaseCount + 1)
    setPurchased(true)
    console.log(props)
    console.log('Cookies extraction ', cookieData)
    setName(cookieData[cookieNum].name)
    console.log('Purchased: ' + purchased)
    console.log('Cookie name: ' + name)
  }
  // purchaseCreate(match.params.id, user)
  // console.log('purchased cookie!')
  // console.log('this is cookie data ', cookieData)
  // event.preventDefault()
  //   .then(() => setName({ name }))
  //   .catch(console.error)
  // useEffect(() => {
  //   axios(`${apiUrl}/purchases/${props.match.params.id}`)
  //     .then(res => purchaseCreate(cookieData))
  //     .catch(console.error)
  // }, [])

  const cookieCards = cookieData.map(cookie => {
    return (
      <Card key={cookie.id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={cookie.photo} />
        <Card.Body>
          <Card.Title>{cookie.name}</Card.Title>
          <Card.Text>{cookie.description}</Card.Text>
          <Button onClick={handleClick} >Purchase {cookie.name}</Button>
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

// const cookieCards = cookieData.map(cookie => {
//   return (
//     <Card key={cookie.id} style={{ width: '18rem' }}>
//       <Card.Img variant="top" src={cookie.photo} />
//       <Card.Body>
//         <Card.Title>{cookie.name}</Card.Title>
//         <Card.Text>{cookie.description}</Card.Text>
//         <Button onClick={() => {
//           setPurchaseCount(purchaseCount + 1)
//           setPurchased(true)
//           setName(cookie.name)
//           console.log('Purchased: ' + purchased)
//           console.log('Cookie name: ' + name)
//         }} >Purchase {cookie.name}</Button>
//       </Card.Body>
//     </Card>
//   )
// })
