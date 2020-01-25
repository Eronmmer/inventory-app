import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import HomeComponent from '../../StyledComponents/home/Home'

const Home = () => {
  return (
    <HomeComponent>
      <Navbar />
      <Main />
    </HomeComponent>
  )
}

export default Home

