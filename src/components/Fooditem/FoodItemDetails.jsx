import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cart/cartSlice'; // Import the addToCart action
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function FoodItemDetails() {
  const { id } = useParams(); // Extract 'id' from the URL
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5050/food/${id}`);
        setFood(response.data.food); // Access the food object inside response.data
        setError(null);
      } catch (err) {
        setError('Failed to fetch food details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (food) {
      dispatch(addToCart({ id: food._id, name: food.name, price: food.price })); // Add the item to the cart
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#FFA500" size={50} />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-400"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-400"
      >
        Go Back
      </button>
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">{food.name}</h1>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        {/* Image Section */}
        <img
          src={food.image?.imgUrl || 'https://via.placeholder.com/500'}
          alt={food.name}
          className="w-full lg:max-w-md rounded-lg shadow-lg"
        />

        {/* Details Section */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-lg text-gray-300 mb-2">{food.description}</p>
          <p className="text-xl font-bold text-orange-400 mb-2">Price: ${food.price}</p>
          <p className="text-lg text-gray-300 mb-2">Category: {food.category}</p>
          <p className="text-lg text-gray-300 mb-2">
            Available Quantity: {food.availableQuantity}
          </p>
          <p className="text-lg text-gray-300 mb-2">
            Vegetarian: {food.isVeg ? 'Yes' : 'No'}
          </p>
          {food.discount > 0 && (
            <p className="text-lg text-orange-400 mb-2">Discount: {food.discount}%</p>
          )}
          <p className="text-lg text-gray-300 mb-4">Rating: {food.rating}/5</p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-400"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {food.reviews && food.reviews.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-orange-500 font-bold text-xl mb-4">Reviews:</h2>
          <ul className="list-disc ml-6 text-gray-300">
            {food.reviews.map((review, index) => (
              <li key={index} className="mb-4">
                <p>
                  <strong>User:</strong> {review.user || 'Anonymous'}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p>
                  <strong>Review:</strong> {review.review || 'No review provided.'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-400 mt-8">No reviews yet.</p>
      )}
    </div>
  );
}

export default FoodItemDetails;
