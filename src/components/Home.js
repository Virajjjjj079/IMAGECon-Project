import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './Home.css';
import Navbar from './Navbar';

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Navbar />
     <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <div className="Home">
        <h2 className='tagline'>Private, Secure, and Serverless Image Conversion!</h2>
        <div className="container2">
          <p>Transform images into multiple formats effortlessly with <span>ImageCon.</span></p>
          <p>We ensure your privacy by processing image conversions entirely client-side, without storing any images on servers or databases.</p>
          <Link to="/image-type-converter"><button>Get Started</button></Link>
        </div>
        <hr />
        <h2>Your image conversion superpower</h2>
        <div className="container2 pdf">
          <p>Effortlessly convert images into PDFs </p>
          <Link to="/image-to-pdf"><button>Get Started</button></Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
