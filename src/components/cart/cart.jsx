import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "./cartSlice";

const Cart = ({ closeCart }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Shopping Cart</h2>
        <p className="text-gray-400">Your cart is empty. Add some delicious food items!</p>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-5 bg-gray-900 text-white w-96 p-4 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={closeCart}
        className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-400"
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-orange-500 mb-6">Shopping Cart</h2>
      <div className="cart-items space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow"
          >
            {/* Item Name */}
            <div>
              <p className="text-lg font-semibold text-orange-400">{item.name}</p>
              <p className="text-sm text-gray-400">Price: ${item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, quantity: Math.max(item.quantity - 1, 1) }))
                }
                className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-400"
              >
                −
              </button>
              <span className="text-lg">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                }
                className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-400"
              >
                +
              </button>
            </div>

            {/* Remove Item */}
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <h3 className="text-xl font-bold text-orange-500 mt-6">
        Total: ${getTotalPrice()}
      </h3>
    </div>
  );
};

export default Cart;
