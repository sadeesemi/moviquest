import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import { MovieSearch } from './MoviSearch'; // Assuming this component exists for searching movies
import { Pencil, Trash2, Download, Plus, Check, ChevronDown } from 'lucide-react';

export function WatchlistDetail() {
  const location = useLocation();
  const { listName } = location.state || {}; 
  const { id } = useParams(); // Get the selected watchlist ID from the URL
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showMovieSearch, setShowMovieSearch] = useState(false);

  useEffect(() => {
    // Get the watchlist from localStorage
    const watchlists = JSON.parse(localStorage.getItem('watchlists') || '[]');
    const selectedWatchlist = watchlists.find((list) => list.id === parseInt(id));

    if (selectedWatchlist) {
      setWatchlist(selectedWatchlist);
      setMovies(selectedWatchlist.movies || []); // Assuming `movies` is part of the watchlist data
    }
  }, [id]);

  const handleAddMovie = (movie) => {
    // Add the movie to the watchlist's movie list
    const updatedMovies = [...movies, movie];
    setMovies(updatedMovies);
    setShowMovieSearch(false);

    // Update the watchlist in localStorage
    const watchlists = JSON.parse(localStorage.getItem('watchlists') || '[]');
    const updatedWatchlists = watchlists.map((list) =>
      list.id === parseInt(id) ? { ...list, movies: updatedMovies } : list
    );
    localStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));
  };

  const handleMarkAsWatched = (movie) => {
    // Remove the movie from the current watchlist and add it to the watched list
    const updatedMovies = movies.filter((m) => m.id !== movie.id);
    setMovies(updatedMovies);

    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    localStorage.setItem('watchedMovies', JSON.stringify([...watchedMovies, movie]));

    // Update the watchlist in localStorage
    const watchlists = JSON.parse(localStorage.getItem('watchlists') || '[]');
    const updatedWatchlists = watchlists.map((list) =>
      list.id === parseInt(id) ? { ...list, movies: updatedMovies } : list
    );
    localStorage.setItem('watchlists', JSON.stringify(updatedWatchlists));

    navigate('/watched'); // Navigate to the watched page
  };

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <button onClick={() => navigate('/watchlist')} className="text-gray-400 hover:text-white mb-4">← Back to lists</button>

      {/* Watchlist Title */}
      <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold ml-8">{listName || 'Watchlist'} movies</h1>
      <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white"><Pencil className="w-5 h-5" /></button>
          <button className="text-gray-400 hover:text-white"><Trash2 className="w-5 h-5" /></button>
          <button className="text-gray-400 hover:text-white"><Download className="w-5 h-5" /></button>
          <button onClick={() => setShowMovieSearch(true)} className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-700">
            <Plus className="w-5 h-5" /><span>Add Movies</span>
          </button>
        </div>
      </div>
       

      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-400">You Want To Watch {movies.length} Movies</span>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white"><span>Genre</span><ChevronDown className="w-4 h-4" /></button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white"><span>Title</span><ChevronDown className="w-4 h-4" /></button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white"><span>When Added</span><ChevronDown className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="space-y-6">
        {movies.map((movie) => (
          <div key={movie.id} className="flex space-x-4 p-12 bg-gray-900 rounded-lg  mb-7">
            <img src={movie.image} alt={movie.title} className="w-24 h-36 object-cover rounded-md" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                <button onClick={() => handleMarkAsWatched(movie)} className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-700">
                  <Check className="w-4 h-4" /><span>Mark As Watched</span>
                </button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span>★ {movie.rating}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {movie.genres.map((genre) => (
                  <span key={genre} className="text-sm bg-zinc-800 px-2 py-1 rounded text-gray-400">{genre}</span>
                ))}
              </div>
              <p className="text-gray-400 mt-4 text-sm">{movie.synopsis}</p>
            </div>
          </div>
        ))}
      </div>
      {showMovieSearch && <MovieSearch onClose={() => setShowMovieSearch(false)} onAddMovie={handleAddMovie} />}
    </div>
  );
}
