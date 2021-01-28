import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import apiUrl from '../apiConfig'
// import purchases from '../../data/purchases'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button
import { Link } from 'react-router-dom'
import { purchaseIndex } from '../../api/cookieCalls'
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
        heading: 'fetched films for fun',
        message: 'do what u want with this',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'failed to fetch films',
          message: 'please refer to this error: ' + error.message,
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
      <Link to={'/purchases'} key={purchases._id}>
        <li>
          {purchases.name}
        </li>
      </Link>
    ))

    return (
      <div>
        <h3>purchases</h3>
        <ul>
          {cookiesJsx}
        </ul>
      </div>
    )
  }
}

export default CookieIndex
