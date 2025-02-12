import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BACKEND_URI}/api/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      // Read response as text first to check its content
      const responseText = await response.text();
  
      if (!response.ok) {
        throw new Error(responseText || "Something went wrong");
      }
  
      const json = JSON.parse(responseText);
  
      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userEmail",credentials.email);
        navigate("/");
      } else {
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert(`Login failed: ${error.message}`);
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
          Login
        </h2>

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
          Log In
        </button>

        {/* Footer */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/createuser" className="text-green-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
