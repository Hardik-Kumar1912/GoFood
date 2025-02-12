import React, { useEffect, useState } from "react";

const Myorder = () => {
  const [orderData, setOrderData] = useState([]);
  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

  const fetchMyOrder = async () => {
    try {
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

      if (!response.success) {
        console.error("Error fetching orders:", response.message);
        setOrderData([]);
        return;
      }

      setOrderData(response.orderData || []);
    } catch (error) {
      console.error("Fetch order error:", error);
      setOrderData([]);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-5">My Orders</h1>
      <div>
        {orderData.length > 0 ? (
          orderData
            .slice(0)
            .reverse()
            .map((orderGroup, index) => (
              <div key={index} className="mb-10">
                {/* Date Header */}
                {orderGroup?.Order_date && (
                  <div className="text-center my-5">
                    <p className="text-xl font-bold text-gray-700">
                      {orderGroup.Order_date}
                    </p>
                    <hr className="border-gray-300 my-3" />
                  </div>
                )}

                {/* Orders for the date */}
                <div className="flex flex-wrap justify-center gap-4">
                  {Array.isArray(orderGroup.orders) &&
                    orderGroup.orders.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 w-full md:w-1/2 lg:w-1/4"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h5 className="text-lg font-bold text-gray-800">
                            {item.name}
                          </h5>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-medium text-gray-600">
                              Qty: {item.qty}
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              Size: {item.size}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xl font-semibold text-green-500">
                              ₹{item.price}/-
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
