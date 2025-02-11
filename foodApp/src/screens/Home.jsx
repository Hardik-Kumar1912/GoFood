import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const slides = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=1200",
      alt: "Burger",
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=1200",
      alt: "Pancake",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=1200",
      alt: "Pasta",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/1051399/pexels-photo-1051399.jpeg?w=1200",
      alt: "Roti",
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?w=1200",
      alt: "Samosa",
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/20422133/pexels-photo-20422133/free-photo-of-triangular-bread-on-plate.jpeg?w=1200",
      alt: "Dosa",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide === slides.length - 1) {
        setIsTransitioning(false);
        setCurrentSlide(0);
      } else {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();

      // Ensure response contains valid arrays
      setFoodItem(Array.isArray(response[0]) ? response[0] : []);
      setFoodCat(Array.isArray(response[1]) ? response[1] : []);

    } catch (error) {
      console.error("Error fetching food data:", error);
      setFoodItem([]); // Fallback to empty array
      setFoodCat([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen mb-12">
      {/* Carousel Section */}
      <div className="relative w-full">
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
          <div
            className={`flex ${isTransitioning ? "transition-transform duration-500" : ""}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="flex-none w-full relative">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="block w-full object-contain h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Search Bar Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-2/3">
            <div className="relative bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="container mx-auto mt-12 px-8">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">
          Featured Items
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {foodCat?.length > 0 ? (
            foodCat.map((data) => (
              <div key={data._id} className="w-full mb-8">
                <h3 className="text-3xl font-semibold text-gray-700 mb-6 border-b-4 border-gray-300 pb-3">
                  {data.CategoryName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {foodItem?.length > 0 ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                      )
                      .map((filterItems) => (
                        <div
                          key={filterItems._id}
                          className="transition-transform transform hover:scale-105 duration-300"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options?.[0] || {}}
                          />
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-500">No items found</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No categories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
