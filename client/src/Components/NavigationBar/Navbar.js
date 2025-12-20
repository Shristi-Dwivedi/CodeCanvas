import React from 'react'
import "./Navbar.css"
import logo from "../../Images/ProjectLogo.png"
import user from "../../Images/user.png"

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <div className='navbar'>
        <a href="/"><img src={logo} className='main-logo' alt='logo'/></a>
        {/* Editor Name */}
        <p className='main-name'>CodeCanvas</p>
        {/* User Login Image */}
        <a href='/'><img src={user} className='user-before-login' alt='user'/></a>
      </div>
    </>
  )
}

export default Navbar