import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../home/Navbar'
import NotFoundComponent from '../../StyledComponents/pages/NotFound'

const NotFound = () => {
  return (
    <>
      <Navbar notfound />
      <NotFoundComponent>
        <h2>
          Oh, sh*t 😪 <br /> The page you requested might have been deleted or
          never existed.{" "}
        </h2>

        <div className="not-found-btn-wrapper">
          <Link className="not-found-btn" to="/">
            Go home
          </Link>
        </div>
      </NotFoundComponent>
    </>
  );
}

export default NotFound
