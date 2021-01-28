import apiUrl from '../apiConfig'
import axios from 'axios'

export const purchaseCreate = (user, purchases) => {
  return axios({
    url: apiUrl + '/purchases',
    method: 'POST',
    headers: {
      // we need the user so we have access to their token
      'Authorization': `Bearer ${user.token}`
    },
    // send the cookie object as our data for creating a movie
    data: { purchases }
    // data: {
    //   name: cookieData.name,
    //   purchases}
  })
}

export const purchaseIndex = (user, purchases) => {
  return axios({
    url: apiUrl + '/purchases',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
    // data: { purchases }
  })
}
