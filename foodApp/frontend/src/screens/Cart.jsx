import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react"; // Import the trash icon

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-2xl font-bold text-center mb-6">My Cart</h1>
        <div className="text-center text-gray-600">
          <p>Your cart is currently empty.</p>
        </div>
      </div>
    );
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    toast.success("Order Placed Successfully!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      style: {
        background: "#1E3A8A",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "16px",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        boxShadow: "0px 4px 12px rgba(30, 58, 138, 0.4)",
      },
      progressStyle: {
        background: "#FACC15",
      },
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Cart</h1>

      {/* Table for Large Screens */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 rounded-lg">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-300">#</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Qty</th>
              <th className="px-4 py-2 border border-gray-300">Option</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="text-center even:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-300">{food.name}</td>
                <td className="px-4 py-2 border border-gray-300">{food.qty}</td>
                <td className="px-4 py-2 border border-gray-300">{food.size}</td>
                <td className="px-4 py-2 border border-gray-300">₹{food.price}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} /> {/* Trash icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked Cards for Small Screens */}
      <div className="lg:hidden space-y-4">
        {data.map((food, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{food.name}</h2>
              <button
                onClick={() => dispatch({ type: "REMOVE", index })}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <p className="text-gray-600">Quantity: {food.qty}</p>
            <p className="text-gray-600">Size: {food.size}</p>
            <p className="text-gray-800 font-bold">₹{food.price}</p>
          </div>
        ))}
      </div>

      {/* Total and Checkout Button */}
      <div className="mt-6 text-center">
        <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
        <button
          className="bg-blue-500 text-white px-6 py-2 mt-2 rounded hover:bg-blue-600"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
