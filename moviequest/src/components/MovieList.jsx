import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Download, Plus, Check, ChevronDown } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { CreateWatchlist } from '../page/CreateWatchlist';

export function MovieList() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch watchlists from localStorage
    const watchlists = JSON.parse(localStorage.getItem('watchlists') || '[]');
    setLists(watchlists);
  }, []);

  const handleCreateList = (name) => {
    const newList = {
      id: lists.length + 1,
      name,
      count: 0,
      lastUpdate: 'Just now',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    };
    setLists([...lists, newList]);
    setShowCreateModal(false);

    // Update the watchlists in localStorage
    localStorage.setItem('watchlists', JSON.stringify([...lists, newList]));
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-700 h-24">
        <h1 className="text-2xl font-bold ml-8">Your Watchlists</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-700"
        >
          <Plus className="w-5 h-5" />
          <span>Create New List</span>
        </button>
      </div>

      {/* Watchlists */}
      <div className="space-y-10 ml-24 mr-40 mt-10 ">
        {lists.map((list) => (
          <div
            key={list.id}
            className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-700"
            onClick={() => navigate(`/watchlist/${list.id}`, { state: { listName: list.name } })}
          >
            <img src={list.image} alt={list.name} className="w-24 h-36 object-cover rounded-md" />
            <div>
              <h3 className="text-lg font-semibold">{list.name}</h3>
              <p className="text-gray-400">{list.movies ? list.movies.length : 0} Movies</p> {/* Display movie count here */}
              <p className="text-gray-400 text-sm">Updated {list.lastUpdate}</p>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && <CreateWatchlist onClose={() => setShowCreateModal(false)} onSubmit={handleCreateList} />}
    </div>
  );
}
