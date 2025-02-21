import React from "react";
import { Header1 } from "../layouts/Header1";
import { HeroSection } from "../components/HeroSection";
import GenreSection from "../components/GenreSection";
import { MovieSection } from "../components/MovieSection";
import { Footer } from "../layouts/Footer";
import { movies } from '../components/Data/Data'; // Importing movies from Data

function Home() {
  // Defining Popular and Recommended Movies
  const popularMovies = movies.slice(0, 10); // Movies 0-9
  const recommendedMovies = movies.slice(10, 20); // Movies 10-19

  return (
    <div className="min-h-screen bg-black text-white">
      <Header1 />
      <HeroSection />
      <GenreSection />
      
      {/* Passing the movie lists as props to MovieSection */}
      <MovieSection title="Recommended Movies" movies={recommendedMovies} />
      <MovieSection title="Popular Movies" movies={popularMovies} />
      
      <Footer />
    </div>
  );
}

export default Home;

