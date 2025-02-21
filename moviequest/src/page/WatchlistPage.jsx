import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieList } from '../components/MovieList';
import { Header1 } from '../layouts/Header1'; // Adjust path as needed
import { Footer } from '../layouts/Footer'; // Adjust path as needed

export function WatchlistPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header1 />
     
        <MovieList onSelectList={(id) => navigate(`/watchlist/${id}`)} />
      
      <Footer />
    </div>
  );
}
