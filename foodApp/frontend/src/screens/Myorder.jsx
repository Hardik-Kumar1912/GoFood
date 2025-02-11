import React, { useEffect, useState } from "react";

const Myorder = () => {
  const [orderData, setorderData] = useState({});
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

  const fetchMyOrder = async () => {
    const res = await fetch(`${BACKEND_URI}/api/orderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });
    const response = await res.json();
    setorderData(response);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">My Orders</h1>
      <div>
        {orderData.orderData?.order_data ? (
          orderData.orderData.order_data
            .slice(0)
            .reverse()
            .map((dayOrders, index) => (
              <div key={index} className="mb-10">
                {/* Date Header */}
                {dayOrders[0]?.Order_date && (
                  <div className="text-center my-5">
                    <p className="text-xl font-bold text-gray-700">
                      {dayOrders[0].Order_date}
                    </p>
                    <hr className="border-gray-300 my-3" />
                  </div>
                )}

                {/* Orders for the date */}
                <div className="flex flex-wrap justify-center gap-4">
                  {dayOrders
                    .filter((arrayData) => !arrayData.Order_date) // Exclude the date entry from the orders
                    .map((arrayData, idx) => (
                      <div
                        key={idx}
                        className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 w-full md:w-1/2 lg:w-1/4"
                      >
                        <img
                          src={arrayData.img}
                          alt={arrayData.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h5 className="text-lg font-bold text-gray-800">
                            {arrayData.name}
                          </h5>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-medium text-gray-600">
                              Qty: {arrayData.qty}
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              Size: {arrayData.size}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xl font-semibold text-green-500">
                              ₹{arrayData.price}/-
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Myorder;
