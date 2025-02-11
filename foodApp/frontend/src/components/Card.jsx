import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setsize] = useState("");

  useEffect(() => {
    setsize(priceRef.current.value);

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      JSON.parse(savedCart).forEach(item => dispatch({ type: "ADD", ...item }));
    }
  }, []);

  const handleAddToCard = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/login");
      return;
    }

    const food = data.find((item) => item.id === props.foodItem._id);

    toast.success("Added to Cart", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        return;
      }
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
  };

  const finalPrice = qty * parseInt(options[size]);

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
      <img
        src={props.foodItem.img}
        alt="Card Image"
        className="w-full object-cover h-48"
      />
      <div className="p-6">
        <h5 className="font-bold text-xl mb-3 text-gray-800">
          {props.foodItem.name}
        </h5>
        <div className="flex items-center justify-between mb-3">
          <label className="text-gray-700 font-medium">Quantity:</label>
          <select
            onChange={(e) => setQty(e.target.value)}
            className="bg-gray-100 text-gray-800 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {Array.from(Array(6), (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-gray-700 font-medium">Size:</label>
          <select
            onChange={(e) => setsize(e.target.value)}
            ref={priceRef}
            className="bg-gray-100 text-gray-800 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
        <div className="text-gray-800 font-bold text-lg mt-4">
          Total Price: <span className="text-green-600">{finalPrice}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <button
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors"
          onClick={handleAddToCard}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
