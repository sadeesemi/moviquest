import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Search, User, Star, MessageSquare, FilmIcon, UserCog, LogIn } from 'lucide-react';
import Headroom from 'react-headroom';

export function Header1() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Headroom> {/* Sticky header */}
      <nav className="bg-gray-800 p-4 w-full z-50">
        <div className="container mx-auto flex items-center">
          {/* Left side: MovieQuest Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">
              <span className="text-black border-2 border-[#B11123] bg-[#B11123] text-white px-2 py-1">Movie</span>
              <span className="text-[#B11123] pl-2">Quest</span>
            </h1>
          </div>

          {/* Middle: Navigation links */}
          <div className="hidden md:flex items-center space-x-6 ml-20">
            <Link to="/" className="text-white hover:text-red-400 transition-colors">Home</Link>
            <div className="h-6 border-l border-gray-500"></div>
            <Link to="/moviepicker" className="text-white hover:text-red-400 transition-colors">MoviePicker</Link>
            <div className="h-6 border-l border-gray-500"></div>
            <Link to="/reviews" className="text-white hover:text-red-400 transition-colors">Reviews</Link>
            <div className="h-6 border-l border-gray-500"></div>
            <Link to="/watchlist" className="text-white hover:text-red-400 transition-colors">Watchlist</Link>
            <div className="h-6 border-l border-gray-500"></div>
            <Link to="/watched" className="text-white hover:text-red-400 transition-colors">Watched</Link>
          </div>

          {/* Right side: Search bar and User icon */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Search Bar */}
            <div className="relative ml-10">
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 w-[550px]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            {/* User Icon Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-white hover:text-red-400 transition-colors focus:outline-none"
              >
                <User className="w-6 h-6" />
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-700">
                  <Link to="/ratings" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                    <Star className="w-4 h-4 mr-2" />
                    Your Ratings
                  </Link>
                  <Link to="/reviews" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Your Reviews
                  </Link>
                  <Link to="/request-movie" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                    <FilmIcon className="w-4 h-4 mr-2" />
                    Request Movie
                  </Link>
                  <Link to="/edit-profile" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                    <UserCog className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <Link to="/login" className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </Headroom>
  );
}
