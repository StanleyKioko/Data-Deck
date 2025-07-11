import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close the menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Blobe Logistics</div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-green-500" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="text-white hover:text-green-500" onClick={closeMenu}>About Us</Link>
          <Link to="/services" className="text-white hover:text-green-500" onClick={closeMenu}>Services</Link>
          <Link to="/track" className="text-white hover:text-green-500" onClick={closeMenu}>Track Parcel</Link>
          <Link to="/dashboard" className="text-white hover:text-green-500" onClick={closeMenu}>Client Dashboard</Link>
          <Link to="/careers" className="text-white hover:text-green-500" onClick={closeMenu}>Careers</Link>
          <Link to="/contact" className="text-white hover:text-green-500" onClick={closeMenu}>Contact</Link>
        </div>
        
        {/* Login/Quote Button */}
        <div className="hidden md:block">
          <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
            Login
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-gray-700 rounded-lg p-4">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-white hover:text-green-500" onClick={closeMenu}>Home</Link>
            <Link to="/about" className="text-white hover:text-green-500" onClick={closeMenu}>About Us</Link>
            <Link to="/services" className="text-white hover:text-green-500" onClick={closeMenu}>Services</Link>
            <Link to="/track" className="text-white hover:text-green-500" onClick={closeMenu}>Track Parcel</Link>
            <Link to="/dashboard" className="text-white hover:text-green-500" onClick={closeMenu}>Client Dashboard</Link>
            <Link to="/careers" className="text-white hover:text-green-500" onClick={closeMenu}>Careers</Link>
            <Link to="/contact" className="text-white hover:text-green-500" onClick={closeMenu}>Contact</Link>
            <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-center" onClick={closeMenu}>
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;