import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const LOCATIONIQ_API_KEY = "pk.77cf8bdf709fe7b9d57a347d5ee0127b";

  // Function to fetch address from LocationIQ
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setCredentials((prev) => ({ ...prev, location: data.display_name }));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Function to get user's location
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("Location access denied. Please enter address manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Something went wrong");
      }

      if (json.success) {
        navigate("/login");
      } else {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch: Please check your server or network.");
    }
  }

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <form
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Form Header */}
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Create an Account
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label
            htmlFor="exampleInputName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="exampleInputName"
            placeholder="Enter your name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="exampleInputEmail1"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="exampleInputEmail1"
            placeholder="Enter your email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            aria-describedby="emailHelp"
          />
          <p id="emailHelp" className="mt-2 text-sm text-gray-500">
            We'll never share your email with anyone else.
          </p>
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label
            htmlFor="exampleInputLocation"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="flex">
            <input
              type="text"
              id="exampleInputLocation"
              placeholder="Enter your address"
              name="location"
              value={credentials.location}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={getLocation}
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              📍
            </button>
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="exampleInputPassword1"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="exampleInputPassword1"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
