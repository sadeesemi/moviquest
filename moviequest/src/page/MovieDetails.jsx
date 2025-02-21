import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Globe, 
  Film, 
  User, 
  Send, 
  Eye,
  Calendar, 
  Bookmark 
} from 'lucide-react';
import { getMovieById, addReview, updateReview } from '../components/Data/Data';
import { Check } from 'lucide-react';

// Import Header and Footer components
import  {Header1} from '../layouts/Header1';
import{ Footer} from '../layouts/Footer';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [watched, setWatched] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  // Fetch the movie details when the component mounts or when movieId changes
  useEffect(() => {
    const movie = getMovieById(movieId || '');
    setMovieData(movie);
  }, [movieId]);

  // Check if a review already exists for the entered user name
  useEffect(() => {
    if (movieData && userName.trim() !== '') {
      const foundReview = movieData.reviews.find((review) => review.userName === userName);
      if (foundReview) {
        setHasReviewed(true);
        setUserReview(foundReview);
      } else {
        setHasReviewed(false);
        setUserReview(null);
      }
    }
  }, [movieData, userName]);

  if (!movieData) return <div>Movie not found</div>;

  // Handle new review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userName && comment && rating > 0 && !hasReviewed) {
      addReview(movieData.id, { 
        userName, 
        rating, 
        comment, 
        date: new Date().toISOString().split('T')[0]
      });
      // Update local state to trigger a re-render
      setMovieData({ ...getMovieById(movieData.id) });
      setComment('');
      setRating(0);
      setHasReviewed(true);
    }
  };

  // Handle updating an existing review
  const handleSubmitEditReview = (e) => {
    e.preventDefault();
    if (userName && comment && rating > 0 && userReview) {
      updateReview(movieData.id, userReview.id, { 
        rating, 
        comment, 
        date: new Date().toISOString().split('T')[0]
      });
      // Update local state after editing the review
      setMovieData({ ...getMovieById(movieData.id) });
      setIsEditing(false);
      setUserReview({ ...userReview, rating, comment, date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Component */}
      <Header1 />

      <div className="container mx-auto px-4 py-12">
        <Link to= '/' className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back 
        </Link>

        {/* Movie Poster & Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <img src={movieData.image} alt={movieData.title} className="w-full rounded-lg shadow-lg" />
          </div>

          <div className="md:col-span-2 space-y-6">
            <h1 className="text-5xl font-bold mb-4">{movieData.title} </h1>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {movieData.genres.map((genre, index) => (
                  <span key={index} className="px-8 py-3 bg-red-600 rounded-full text-m">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex flex-col space-y-2">
                {/* Watched Button */}
                <button
                  onClick={() => setWatched(!watched)}
                  className={`w-48 px-4 py-2 text-white rounded-md transition-colors flex items-center justify-center mb-6 ${
                    watched ? "bg-green-600 hover:bg-green-700" : "bg-red-800 hover:bg-red-700"
                  }`}
                >
                  {watched && <Check className="w-5 h-5 mr-2" />}
                  {watched ? "Watched" : "Mark as Watched"}
                </button>

                {/* Watchlist Button */}
                <button
                  onClick={() => setInWatchlist(!inWatchlist)}
                  className={`w-48 px-4 py-2 text-white rounded-md transition-colors flex items-center justify-center ${
                    inWatchlist ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {!inWatchlist && <Bookmark className="w-5 h-5 mr-2" />} {/* Show icon when not in watchlist */}
                  {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" /> {movieData.year}
              </span>
              <span className="flex items-center">
                <Clock className="w-5 h-5 mr-2" /> {movieData.duration}
              </span>
              <span className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className={`w-6 h-6 ${index < Math.floor(movieData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                ))}
                <span className="ml-2 text-yellow-400">{movieData.rating}</span>
              </span>
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">{movieData.synopsis}</p>

            <div className="space-y-2">
              <p><strong>Country:</strong> {movieData.country}</p>
              <p><strong>Production:</strong> {movieData.production}</p>
              <p><strong>Cast:</strong> {movieData.cast.join(', ')}</p>
            </div>
          </div>
        </div>
    
        {/* Reviews Section */}
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>

          {/* Add / Edit Review Form */}
          {hasReviewed && !isEditing ? (
            <div className="bg-gray-900 rounded-lg p-6 mb-8 w-full">
              <h3 className="text-xl font-semibold mb-4">Your Review</h3>
              <p className="text-gray-300 mb-4">You have already submitted a review for this movie.</p>
              <button
                onClick={() => {
                  setIsEditing(true);
                  if (userReview) {
                    setRating(userReview.rating);
                    setComment(userReview.comment);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Edit Review
              </button>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-6 mb-8 w-full">
              <h3 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit Your Review' : 'Add Your Review'}
              </h3>
              <form onSubmit={isEditing ? handleSubmitEditReview : handleSubmitReview} className="space-y-4">
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        onMouseEnter={() => setHoveredRating(value)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <Star className={`w-6 h-6 ${value <= (hoveredRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Comment
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  {isEditing ? 'Update Review' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}

<div>
      {movieData.reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet.</p>
      ) : (
        movieData.reviews.map((review, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-gray-400" />
                <p className="text-lg font-semibold">{review.userName}</p>
              </div>
              <div className="flex items-center">
                {/* Only iterate through 5 stars */}
                {[...Array(5)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`w-4 h-4 ${starIndex < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-300 mt-2">{review.comment}</p>
            <p className="text-xs text-gray-500 mt-2">{review.date}</p>
          </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}