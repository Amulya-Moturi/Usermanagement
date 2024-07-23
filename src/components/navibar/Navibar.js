import React from 'react'
import './Navibar.css'
import { NavLink } from 'react-router-dom'
import {FaUsers,FaUsersSlash} from 'react-icons/fa'
function Navibar() {
  const activeLink={
    color:"#EEF0F1",
    fontSize:"1.2 rem",
    fontWeight:"bold"
  };
  const inactiveLink={
    color:"#ffe4c6",
    fontSize:"1.2 rem",
    fontWeight:"bold"
  };
  return (
    <div className='Nabar mb-3'>
<nav className="navbar navbar-expand-sm bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" href="#"><img src="https://cdn4.iconfinder.com/data/icons/green-shopper/1068/user.png" width="50px" alt=""/></NavLink>
    <div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" style={({isActive})=>{
            return isActive? activeLink : inactiveLink;
          }} to="/users">
            <FaUsers className='users-icon' />
            Users
            </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" style={({isActive})=>{
            return isActive? activeLink : inactiveLink;
          }} to="/removedusers" ><FaUsersSlash className='removed-users'/>
          Removed Users</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navibar