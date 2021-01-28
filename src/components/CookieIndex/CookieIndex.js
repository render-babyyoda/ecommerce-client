import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import apiUrl from '../apiConfig'
// import purchases from '../../data/purchases'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button
import { Link } from 'react-router-dom'
import { purchaseIndex, purchaseUpdate } from '../../api/cookieCalls'
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

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { purchases } = this.state
    // create a movie, pass it the movie data and the user for its token
    purchaseUpdate(user, purchases)
      // set the createdId to the id of the movie we just created
      // .then(res => this.setState({ createdId: res.data.movie._id }))
      .then(res => {
        this.setState({ purchases: res.data.purchases })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Movie Successfully',
        message: `Movie has been created successfully. Now viewing ${res.data.movie.title}.`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Movie',
          message: 'Could not create movie with error: ' + error.message,
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
      <Link to={`/purchases/${purchase._id}`} key={purchase.id}>
        <form onSubmit={this.handleSubmit}>
          <li>
            Cookie: {purchase.name}
            <br />
            Price: {purchase.price}
            <input
              placeholder="Edit Price"
              name="price-edit"
              value={purchase.price}
              onChange={this.handleChange}
            />
            <button type='submit'>submit</button>
          </li>
        </form>
      </Link>
    ))

    return (
      <div>
        <h3>purchases</h3>
        <ol>
          {cookiesJsx}
        </ol>
      </div>
    )
  }
}

export default CookieIndex
