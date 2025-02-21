import React, { useRef, useState, useEffect } from "react";
import { Check, Bookmark, ChevronRight, ChevronLeft } from "lucide-react";

export function MovieSection({ title, movies }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setCanScrollLeft(scrollRef.current.scrollLeft > 0);
        setCanScrollRight(
          scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        );
      }
    };

    setTimeout(checkScroll, 100); 

    const scrollContainer = scrollRef.current;
    scrollContainer?.addEventListener("scroll", checkScroll);
    return () => scrollContainer?.removeEventListener("scroll", checkScroll);
  }, [movies]); 

  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 -ml-32">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full z-10 hover:bg-gray-700 transition"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex space-x-12 overflow-hidden p-4"
            style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="flex-none w-56 relative group">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-72 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="absolute bottom-0 p-4 w-full">
                    <h4 className="text-white font-medium">{movie.title}</h4>
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="p-2 rounded-full bg-gray-700 hover:bg-red-500 transition-colors"
                        aria-label="Mark as Watched"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </button>
                      <button
                        className="p-2 rounded-full bg-gray-700 hover:bg-red-500 transition-colors"
                        aria-label="Bookmark Movie"
                      >
                        <Bookmark className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {canScrollRight && (
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 p-3 rounded-full z-10 hover:bg-gray-700 transition"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
