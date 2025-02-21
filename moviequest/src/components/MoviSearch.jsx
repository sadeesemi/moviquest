import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { movies } from "../components/Data/Data"; // Import movie data

export function MovieSearch({ onClose, onAddMovie }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredMovies = movies.filter((movie) =>
        query.length === 1
          ? movie.title.toLowerCase().startsWith(query.toLowerCase()) // Start with the letter
          : movie.title.toLowerCase().includes(query.toLowerCase())  // Contains the query
      );
      setSearchResults(filteredMovies);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-2xl relative max-h-[80vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Add Movies to Watchlist</h2>

        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-zinc-800 rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Search for movies..."
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="flex items-start space-x-4 p-4 bg-zinc-800 rounded-lg"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-24 h-36 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold truncate">
                    {movie.title}
                  </h3>
                  <button
                    onClick={() => onAddMovie(movie)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md flex items-center space-x-1 hover:bg-red-700 flex-shrink-0 ml-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                  <span>{movie.year}</span>
                  <span>{movie.duration}</span>
                  <span>★ {movie.rating}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-sm bg-zinc-700 px-2 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 mt-2 text-sm line-clamp-2">
                  {movie.synopsis}
                </p>
              </div>
            </div>
          ))}
          {searchQuery.length > 0 && searchResults.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No movies found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
