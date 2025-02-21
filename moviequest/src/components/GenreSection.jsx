import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import action1 from '../Images/Genrepic/Action1.jpg';
import action2 from '../Images/Genrepic/Action2.jpg';
import action3 from '../Images/Genrepic/Action3.jpg';
import action4 from '../Images/Genrepic/Action4.jpg';

import comedy1 from '../Images/Genrepic/Comedy1.jpg';
import comedy2 from '../Images/Genrepic/Comedy2.jpg';
import comedy3 from '../Images/Genrepic/Comedy3.jpg';
import comedy4 from '../Images/Genrepic/Comedy4.jpg';

import adventure1 from '../Images/Genrepic/Adventure1.jpg';
import adventure2 from '../Images/Genrepic/Adventure2.jpg';
import adventure3 from '../Images/Genrepic/Adventure3.jpg';
import adventure4 from '../Images/Genrepic/Adventure4.jpg';

import horror1 from '../Images/Genrepic/Horror1.jpg';
import horror2 from '../Images/Genrepic/Horror2.jpg';
import horror3 from '../Images/Genrepic/Horror3.jpg';
import horror4 from '../Images/Genrepic/Horror4.jpg';

import mystery1 from '../Images/Genrepic/Mystery1.jpg';
import mystery2 from '../Images/Genrepic/Mystery2.jpg';
import mystery3 from '../Images/Genrepic/Mystery3.jpg';
import mystery4 from '../Images/Genrepic/Mystery4.jpg';

import drama1 from '../Images/Genrepic/Drama1.jpg';
import drama2 from '../Images/Genrepic/Drama2.jpg';
import drama3 from '../Images/Genrepic/Drama3.jpg';
import drama4 from '../Images/Genrepic/Drama4.jpg';

import romance1 from '../Images/Genrepic/Romance1.jpg';
import romance2 from '../Images/Genrepic/Romance2.jpg';
import romance3 from '../Images/Genrepic/Romance3.jpg';
import romance4 from '../Images/Genrepic/Romance4.jpg';

import thriller1 from '../Images/Genrepic/Thriller1.jpg';
import thriller2 from '../Images/Genrepic/Thriller2.jpg';
import thriller3 from '../Images/Genrepic/Thriller3.jpg';
import thriller4 from '../Images/Genrepic/Thriller4.jpg';

import history1 from '../Images/Genrepic/History1.jpg';
import history2 from '../Images/Genrepic/History2.jpg';
import history3 from '../Images/Genrepic/History3.jpg';
import history4 from '../Images/Genrepic/History4.jpg';

const genres = [
  { name: 'Action', images: [action1, action2, action3, action4] },
  { name: 'Comedy', images: [comedy1, comedy2, comedy3, comedy4] },
  { name: 'Adventure', images: [adventure1, adventure2, adventure3, adventure4] },
  { name: 'Horror', images: [horror1, horror2, horror3, horror4] },
  { name: 'Mystery', images: [mystery1, mystery2, mystery3, mystery4] },
  { name: 'Drama', images: [drama1, drama2, drama3, drama4] },
  { name: 'Romance', images: [romance1, romance2, romance3, romance4] },
  { name: 'Thriller', images: [thriller1, thriller2, thriller3, thriller4] },
  { name: 'History', images: [history1, history2, history3, history4] },
];

export function GenreSection() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-dark py-12 mt-12  ">
      <div className="container mx-auto px-0 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 -ml-32">
          <h3 className="text-2xl font-bold text-white">Genres</h3>
        </div>

        {/* Scrollable Genre List */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 p-3 rounded-full hover:bg-gray-700"
            onClick={scrollLeft}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            className="flex overflow-hidden gap-16 px-48"
            style={{ scrollBehavior: 'smooth' }}
          >
            {genres.map((genre) => (
              <div key={genre.name} className="flex-shrink-0 w-64 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {genre.images.map((image, index) => (
                    <img key={index} src={image} alt={genre.name} className="w-full h-32 object-cover rounded-lg" />
                  ))}
                </div>
                <h4 className="text-white text-center font-medium text-xl">{genre.name}</h4>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10  bg-gray-800 p-3 rounded-full hover:bg-gray-700"
            onClick={scrollRight}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
