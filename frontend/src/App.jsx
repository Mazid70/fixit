import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Layout/Navbar'

const App = () => {
  return (
    <>
      <Navbar/>
    <Outlet/>
    </>
  )
}

export default App