import React from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <nav className="navbar">

      
      <div className="logo" onClick={()=>navigate('/')}  style={{"cursor":"pointer"}}>FlOW</div>

     
      <div className="nav-center">
        <ul className="nav-links">
          <li onClick={()=>navigate('/')}>Home</li>
          <li onClick={()=>navigate('/table')}>List</li>
          <li onClick={()=>navigate('/profile')}>Profile</li>
     
        </ul>
      </div>

  
      <div className="signin"   onClick={()=>navigate('/add')}>ADD </div>

    </nav>
  );
};

export default Navbar;