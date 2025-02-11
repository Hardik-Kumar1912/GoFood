import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto bottom-0 w-full">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Company Details */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-3">GoFood</h5>
            <p className="text-gray-400">
              Building innovative solutions for a better future. Stay connected
              for updates and offers.
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2025 GoFood. All rights reserved.</p>
          <p className="text-gray-400">
            Made with ❤️ by <Link to="/" className="hover:underline">GoFood</Link> by HK
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
