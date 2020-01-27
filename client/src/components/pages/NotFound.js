import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      oh sh*t, The page you requested might have been deleted or never existed. 

      <Link to="/">Go home</Link>
    </div>
  )
}

export default NotFound
