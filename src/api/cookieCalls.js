import apiUrl from '../apiConfig'
import axios from 'axios'

export const purchaseCreate = (cookie, user) => {
  return axios({
    url: apiUrl + '/create-purchase',
    method: 'POST',
    headers: {
      // we need the user so we have access to their token
      'Authorization': `Token token=${user.token}`
    },
    // send the cookie object as our data for creating a movie
    data: { cookie }
  })
}
