import React from 'react'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
// import './ScrollToTop.css'

function ScrollToTop() {
  return (
    <div className="flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 bg-black text-white">
      <div className="flex space-x-4">
        <Facebook className="social-icon" />
        <Instagram className="social-icon" />
        <Twitter className="social-icon" />
        <Youtube className="social-icon" />
      </div>
      <div className="text-sm sm:text-base">+250 790 857 019</div>
      <div className="text-sm sm:text-base">KG 345, St 12 Kigali</div>
    </div>
  );
}

export default ScrollToTop;
