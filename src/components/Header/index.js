import React from 'react'
import "./style.css";

function Header() {
  function logoutFunc(){
   alert("Logout!")
  }
  return (
    <div className='Navbar'>
      <p className='logo'>Financely.</p>
      <p className='logo link' onClick={logoutFunc}>Logout</p>
    </div>
  )
}

export default Header;