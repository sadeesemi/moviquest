import React from 'react';
import { MovieCard } from '../components/MovieCard';

export const Action = ({ movies, watchlist, watched, onAddToWatchlist, onMarkAsWatched }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-semibold">Action</h2>
        <a href="#" className="text-red-600 hover:text-red-500">View all →</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            isInWatchlist={watchlist.includes(movie.id)}
            isWatched={watched.includes(movie.id)}
            onAddToWatchlist={onAddToWatchlist}
            onMarkAsWatched={onMarkAsWatched}
          />
        ))}
      </div>
    </main>
  );
};
