import React, { useState, useEffect } from 'react';
import { Clock, Star } from 'lucide-react';
import {Header1} from '../layouts/Header1' // Adjust path as needed
import {Footer }from '../layouts/Footer'; // Adjust path as needed

export function Watched() {
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    setWatchedMovies(movies);
  }, []);

  return (
    <>
      <Header1 />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Watched Movies</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchedMovies.map((movie) => (
            <div key={movie.id} className="bg-zinc-900 rounded-lg overflow-hidden">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-xs bg-zinc-800 px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {movie.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {watchedMovies.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <p className="text-xl mb-2">No watched movies yet</p>
            <p className="text-sm">Movies you mark as watched will appear here</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
