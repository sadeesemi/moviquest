import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WatchlistDetail } from '../components/WatchlistDetail';
import { Header1 } from '../layouts/Header1'; // Adjust path as needed
import { Footer } from '../layouts/Footer'; // Adjust path as needed

export function WatchlistDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header1 />
      <div className="flex-grow container mx-auto px-6 py-8">
        <WatchlistDetail
          title={`Watchlist ${id}`}
          onBack={() => navigate('/watchlist')}
        />
      </div>
      <Footer />
    </div>
  );
}
