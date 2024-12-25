import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FoodItemDetails() {
  const { id } = useParams();
  console.log(id); // Get the food ID from the route
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5050/food/${id}`);
        setFood(response.data);
        console.log(`http://localhost:5050/food/${id}`);
        setError(null);
      } catch (err) {
        setError('Failed to fetch food details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  if (loading) return <div className="text-orange-500 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">{food.name}</h1>
      <div className="flex flex-col items-center gap-6">
        <img
          src={food.image?.imgUrl || 'https://via.placeholder.com/500'}
          alt={food.name}
          className="w-full max-w-md rounded-lg shadow-lg"
        />
        <p className="text-lg text-gray-300">{food.description}</p>
        <p className="text-xl font-bold text-orange-400">Price: ${food.price}</p>
        <p className="text-lg text-gray-300">Category: {food.category}</p>
        <p className="text-lg text-gray-300">Rating: {food.rating}/5</p>

        {food.reviews && food.reviews.length > 0 && (
          <div className="w-full">
            <h2 className="text-orange-500 font-bold">Reviews:</h2>
            <ul className="list-disc ml-6 text-gray-300">
              {food.reviews.map((review, index) => (
                <li key={index} className="mb-4">
                  <p><strong>User:</strong> {review.user || 'Anonymous'}</p>
                  <p><strong>Rating:</strong> {review.rating}</p>
                  <p><strong>Review:</strong> {review.review || 'No review provided.'}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodItemDetails;
