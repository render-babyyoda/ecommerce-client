import React from 'react'
import purchases from '../../data/purchases'

const cookiesJsx = purchases.map(cookie => {
  return (
    <div key={cookie.id}>
      <div>
        <h3>{cookie.name}</h3>
      </div>

      <p>
        {cookie.description}
      </p>
      <p>
        {cookie.photo}
      </p>
      <p>
        {cookie.price}
      </p>
    </div>
  )
})

// const Cookies = () => (
//   <div>
//     {cookiesJsx}
//   </div>
// )

export default cookiesJsx
