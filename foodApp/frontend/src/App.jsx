import Navbar from "./components/Navbar";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Footer from "./components/Footer";
import Signup from "./screens/Signup";
import { ContextProvider } from './components/ContextReducer'; // Import the provider, not the reducer itself
import Cart from "./screens/Cart";
import Myorder from "./screens/Myorder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create router with different routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Navbar />
        <Login />
      </div>
    ),
  },
  {
    path: "/createuser",
    element: (
      <div>
        <Navbar />
        <Signup />
      </div>
    ),
  },
  {
    path: "/cart",
    element: (
      <div>
        <Navbar />
        <Cart />
      </div>
    ),
  },
  {
    path: "/myOrder",
    element: (
      <div>
        <Navbar />
        <Myorder />
      </div>
    ),
  },
]);

function App() {
  return (
    <ContextProvider> {/* Wrap the app with the ContextProvider */}
      <RouterProvider router={router} />
      <ToastContainer /> {/* Global toast notification container */}
    </ContextProvider>
  );
}

export default App;
