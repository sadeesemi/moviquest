import React from "react";
import { Header1 } from "../layouts/Header1";
import { HeroSection } from "../components/HeroSection";
import { GenreSection } from "../components/GenreSection";
import { MovieSection } from "../components/MovieSection";
import { Footer } from "../layouts/Footer";

import anastasia from "../Images/Popularpic/Anastasia.jpg";
import bagman from "../Images/Popularpic/Bagman.jpg";
import cruella from "../Images/Popularpic/Cruella.jpg";
import dark from "../Images/Popularpic/Dark.jpg";
import drDolittle from "../Images/Popularpic/Dr.Dolittle.jpg";
import ferngully from "../Images/Popularpic/Ferngully.jpg";
import flash from "../Images/Popularpic/Flash.jpg";
import hobbit from "../Images/Popularpic/Hobbit.jpg";
import the100 from "../Images/Popularpic/The100.jpg";
import theJungleBook from "../Images/Popularpic/TheJungleBook.jpg";
import theQuietPlace from "../Images/Popularpic/Thequietplace.jpg";
import wednesday from "../Images/Popularpic/Wednesday.jpg";

import redOne from "../Images/Recomendedpic/redOne.jpg";
import bgf from "../Images/Recomendedpic/Bgf.jpg";
import homeAlone from "../Images/Recomendedpic/Homealone.jpg";
import itsChristmasAgain from "../Images/Recomendedpic/ItsCristmasAgain.jpg";
import jumanji from "../Images/Recomendedpic/Jumanji.jpg";
import megan from "../Images/Recomendedpic/Megan.jpg";
import mulan from "../Images/Recomendedpic/Mulan.jpg";
import nightbooks from "../Images/Recomendedpic/Nightbooks.jpg";
import secretGarden from "../Images/Recomendedpic/Secretgarden.jpg";
import theWitcher from "../Images/Recomendedpic/TheWitcher.jpg";
import titanic from "../Images/Recomendedpic/Titanic.jpg";
import womanInBlack from "../Images/Recomendedpic/WomanInBlack.jpg";

const recommendedMovies = [
  { id: 1, title: "Red One", image: redOne },
  { id: 2, title: "The BFG", image: bgf },
  { id: 3, title: "Home Alone", image: homeAlone },
  { id: 4, title: "It's Christmas Again", image: itsChristmasAgain },
  { id: 5, title: "Jumanji", image: jumanji },
  { id: 6, title: "Megan", image: megan },
  { id: 7, title: "Mulan", image: mulan },
  { id: 8, title: "Nightbooks", image: nightbooks },
  { id: 9, title: "Secret Garden", image: secretGarden },
  { id: 10, title: "The Witcher", image: theWitcher },
  { id: 11, title: "Titanic", image: titanic },
  { id: 12, title: "Woman in Black", image: womanInBlack },
];

const popularMovies = [
  { id: 1, title: "Anastasia", image: anastasia },
  { id: 2, title: "Bagman", image: bagman },
  { id: 3, title: "Cruella", image: cruella },
  { id: 4, title: "Dark", image: dark },
  { id: 5, title: "Dr. Dolittle", image: drDolittle },
  { id: 6, title: "Ferngully", image: ferngully },
  { id: 7, title: "Flash", image: flash },
  { id: 8, title: "Hobbit", image: hobbit },
  { id: 9, title: "The 100", image: the100 },
  { id: 10, title: "The Jungle Book", image: theJungleBook },
  { id: 11, title: "The Quiet Place", image: theQuietPlace },
  { id: 13, title: "Wednesday", image: wednesday },
];

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header1 />
      <HeroSection />
      <GenreSection />
      <MovieSection title="Recommended Movies" movies={recommendedMovies} />
      <MovieSection title="Popular Movies" movies={popularMovies} />
      <Footer />
    </div>
  );
}

export default Home;
