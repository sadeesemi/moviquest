import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMoviesByGenre, genres } from '../components/Data/Data';
import { Header1 } from '../layouts/Header1'; // Import Header
import { Footer } from '../layouts/Footer'; // Import Footer
import { Eye, Bookmark } from 'lucide-react'; // Import Eye and Bookmark from lucide-react

const GenrePage = () => {
  const { genreId } = useParams();
  const genre = genres.find(g => g.id === genreId);
  const movies = getMoviesByGenre(genreId || '');

  if (!genre) return <div>Genre not found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header1 /> {/* Add Header */}

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Genre title and total movies above vertical line */}
        <div className="flex justify-between items-center mb-4">
          {/* Genre Name */}
          <div className="text-4xl font-bold text-white">{genre.name} Movies</div>
          {/* Total Movies */}
          <div className="text-sm text-white -mb-4">Total Movies: {movies.length}</div>
        </div>

        {/* Vertical line below the genre name and total movies */}
        <div className="border-t border-white mb-8"></div>

        {/* Movie grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="group rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 relative bg-gray-800"
            >
              {/* Movie Image */}
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Movie Title - Left aligned */}
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">{movie.title}</h2>

                {/* Icons (Eye and Bookmark) - Right aligned */}
                <div className="flex space-x-4">
                  {/* Bookmark Icon */}
                  <button className="text-gray-400 hover:text-red-700">
                    <Bookmark size={24} />
                  </button>

                  {/* Eye Icon */}
                  <button className="text-gray-400 hover:text-red-700">
                    <Eye size={24} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default GenrePage;
