import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { genres } from '../components/Data/Data';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function GenreSection() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-[50vh] bg-black text-white mt-24 ">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 -ml-32">Genres</h1>
        
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-16 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {genres.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className="flex-none relative group"
              >
                <div className="w-48 h-72 relative rounded-lg overflow-hidden">
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-xl font-bold text-white">{genre.name}</h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
