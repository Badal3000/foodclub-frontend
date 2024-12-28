import { useState, useEffect } from "react";
import image1 from "../../assets/imageCarausel1.jpg";
import image2 from "../../assets/imageCarausel2.jpg";
import image3 from "../../assets/imageCarausel3.jpg";
import image4 from "../../assets/imageCarausel4.jpg";
import image5 from "../../assets/imageCarausel5.jpg";
import FoodItemDetails from "../Fooditem/FoodItemDetails"; // Ensure this is correctly imported
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/cart";

function Home() {
  const images = [image1, image2, image3, image4, image5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const [selectedFood, setSelectedFood] = useState(null); // For showing FoodItemDetails
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5050/food");
        setFoodItems(response.data.food);
        setError(null);
      } catch (error) {
        setError("Failed to fetch food items: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const incrementCount = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const decrementCount = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] > 0 ? prevCart[id] - 1 : 0,
    }));
  };

  const handleFoodClick = (food) => {
    navigate(`/food/${food._id}`);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalItem = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="flex-1 pt-20 pb-20 w-full bg-[#272E3A] text-white">
      {/* Welcome Banner */}
      <div className="text-center text-3xl font-bold text-[#FFA500] mb-8">
        Welcome to FoodClub
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center mb-10">
        <button
          onClick={prevSlide}
          className="absolute left-10 text-white bg-[#FFA500] px-4 py-2 rounded-full shadow-lg hover:bg-[#FF7F50] z-10"
        >
          Prev
        </button>
        <img
          src={images[currentIndex]}
          alt="Slide"
          className="w-full max-w-4xl object-cover h-[500px] rounded-lg shadow-lg"
        />
        <button
          onClick={nextSlide}
          className="absolute right-10 text-white bg-[#FFA500] px-4 py-2 rounded-full shadow-lg hover:bg-[#FF7F50] z-10"
        >
          Next
        </button>
      </div>

      {/* Cart Toggle Button */}
      <button
        onClick={toggleCart}
        className="fixed top-16 right-5 bg-[#FFA500] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#FF7F50]"
      >
        Cart ({getTotalItem()})
      </button>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg relative w-96 max-h-[80vh] overflow-y-auto">
            <Cart
              cart={cart}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
            />
            <button
              onClick={toggleCart}
              className="absolute top-2 right-2 text-black hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Food Items List */}
      <div className="fooditems flex flex-wrap justify-center gap-6 p-6">
        {loading && <div className="text-[#FFA500]">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {foodItems.length > 0 &&
          foodItems.map((food) => (
            <div
              key={food._id}
              className="fooditem flex flex-col items-center bg-[#333] text-white w-[250px] p-4 rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleFoodClick(food)}
            >
              <div className="w-full h-[150px] mb-4">
                <img
                  src={food.image?.imgUrl || "https://via.placeholder.com/250"}
                  alt={food.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="font-semibold text-lg text-[#FFA500]">{food.name}</span>
              <span className="text-sm text-gray-300 mb-2">{food.description}</span>
              <span className="font-bold text-[#FFA500] mb-2">${food.price}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
