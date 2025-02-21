import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";  
import Register from "./page/Register"; 
import Login from "./page/Login";
import GenrePage from "./page/GenrePage";
import MovieDetails from "./page/MovieDetails"; 
import {WatchlistPage} from "./page/WatchlistPage";
import {WatchlistDetailPage} from "./page/WatchlistDetailsPage";
import {Watched} from "./page/Watched";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/genre/:genreId" element={<GenrePage />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/Watchlist" element={<WatchlistPage />} />
        <Route path="/watchlist/:id" element={<WatchlistDetailPage />} />
        <Route path="/watched" element={<Watched />} />
      </Routes>
    </Router>
  );
}

export default App;
