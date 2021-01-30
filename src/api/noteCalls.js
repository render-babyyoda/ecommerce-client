import apiUrl from '../apiConfig'
import axios from 'axios'

export const noteCreate = (user, notes) => {
  return axios({
    url: apiUrl + '/notes',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { notes }
  })
}

export const purchaseUpdate = (id, purchases, user) => {
  return axios({
    url: apiUrl + '/purchases/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { purchases }
  })
}

export const purchaseShow = (id, user) => {
  return axios({
    url: apiUrl + '/purchases/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
    // data: { purchases }
  })
}
