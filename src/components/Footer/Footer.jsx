import React from 'react';

function Footer() {
  return (
    <footer className="p-6 bg-black text-white text-center">
      <div className="container mx-auto">
        {/* Footer Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/about" className="hover:text-orange-500">About Us</a>
          <a href="/contact" className="hover:text-orange-500">Contact</a>
          <a href="/privacy" className="hover:text-orange-500">Privacy Policy</a>
          <a href="/terms" className="hover:text-orange-500">Terms of Service</a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
