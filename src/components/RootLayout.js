import React from 'react'
import Navibar from './navibar/Navibar';
import { Outlet } from 'react-router-dom';
function RootLayout() {
  return (
    <div>
        <Navibar/>
        <div className='container '>
        <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout