import React from 'react';
import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* Column 1: Title */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">SilverTechPulse</h2>
          <p className="text-gray-400 mt-2">Your source for the latest in technology.</p>
        </div>

        {/* Column 2: Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Bookmarks</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Write</a></li>
            <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FaDiscord size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        &copy; 2024 SilverTechPulse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
