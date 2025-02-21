import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Home } from './Home';
import { Instagram, Facebook, Twitter } from 'lucide-react';

// Sample movie data with reviews
export const initialMovies = [
  {
    id: 1,
    title: 'Raya and the Last Dragon',
    posterUrl:
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80',
    coverUrl:
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80',
    genres: ['Animation', 'Fantasy', 'Action'],
    description:
      'In a mystical land called Kumandra, a dark force emerges. During these troubling times one brave warrior named Raya decides to search for the last dragon to finally stop the Druun for good.',
    year: 2021,
    runtime: '1h 57m',
    rating: 'PG',
    country: 'United States',
    production: 'Walt Disney Animation Studios',
    cast: ['Kelly Marie Tran', 'Awkwafina', 'Gemma Chan'],
    reviews: [
      {
        id: 1,
        userId: 1,
        username: 'Emily S.',
        rating: 4.5,
        comment:
          'Absolutely stunning animation and a beautiful story! The message about trust and unity was really touching.',
        date: '2024-02-20',
      },
    ],
  },
  {
    id: 2,
    title: 'Guardians of the Galaxy Vol. 3',
    posterUrl:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80',
    coverUrl:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80',
    genres: ['Action', 'Adventure', 'Comedy'],
    description:
      'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.',
    year: 2023,
    runtime: '2h 30m',
    rating: 'PG-13',
    country: 'United States',
    production: 'Marvel Studios',
    cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista'],
    reviews: [
      {
        id: 2,
        userId: 2,
        username: 'Mark R.',
        rating: 5,
        comment:
          'The perfect ending to an amazing trilogy. The emotional depth in this one really hits hard.',
        date: '2024-02-15',
      },
    ],
  },
];

const Action1 = () => {
  const [movies] = useState(initialMovies);
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);

  const addToWatchlist = (movieId) => {
    if (!watchlist.includes(movieId)) {
      setWatchlist([...watchlist, movieId]);
    }
  };

  const markAsWatched = (movieId) => {
    if (!watched.includes(movieId)) {
      setWatched([...watched, movieId]);
      // Remove from watchlist if it was there
      setWatchlist(watchlist.filter((id) => id !== movieId));
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter((id) => id !== movieId));
  };

  const removeFromWatched = (movieId) => {
    setWatched(watched.filter((id) => id !== movieId));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar watchlistCount={watchlist.length} watchedCount={watched.length} />

      {/* Render the Home component (or your desired layout) with the current state */}
      <Home
        movies={movies}
        watchlist={watchlist}
        watched={watched}
        onAddToWatchlist={addToWatchlist}
        onMarkAsWatched={markAsWatched}
      />

      <footer className="bg-gray-900 border-t border-gray-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={24} />
            </a>
          </div>
          <p className="text-center text-gray-500 text-sm">
            © 2024 Movie Quest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Action1;
 