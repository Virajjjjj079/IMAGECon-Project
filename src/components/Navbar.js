import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS file
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [icon, setIcon]= useState('☰');
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setIcon(menuOpen ? '☰' : 'X');
  };

  
  return (
    <div className={`navbar ${menuOpen ? 'expanded' : ''}`}>
    <nav>
      <div className="logo"><h1>IMGCon.</h1></div>
      <div className="menu-icon" onClick={toggleMenu}>
      {icon}
      </div>
      <div className="list">
        <ul>
        <Link className='Links' to="/" > <li>Home </li></Link>
          <Link className='Links' to="/image-type-converter" > <li>Image Type Converter </li></Link>

          <Link   className='Links' to="/image-to-pdf"><li>Image to Pdf</li>  </Link>
          <Link  className='Links' to="https://www.linkedin.com/in/viraj-gaonkar-32b3842b7/"><li>LinkedIn</li>   </Link>
          <Link  className='Links' to="http://x.com/ViraaajG?t=7wXvnyRcDmpl1p35xpqjAA&s=09"><li>Twitter</li>  </Link> 
          
          
          
        </ul>
      </div>
    </nav>
  </div>
  );
}

export default Navbar;



