import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <nav className="flex flex-row justify-between w-full p-5 mx-auto text-lg text-black md:flex-row max-w-7xl">
      <div className="flex flex-row justify-between w-full space-x-4 md:mb-0">
        <div className="flex ">
          <button
            onClick={() => navigate("/")}
            className="px-1.5 py-1.5 text-lg font-medium text-white transition duration-200 bg-gray-800 border border-transparent rounded-lg shadow-md md:px-3 md:py-2 hover:bg-gray-500 hover:border-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Home
          </button>
        </div>
        <div>
          {isLoggedIn && (
            <div className="flex space-x-2">
              <button
                onClick={() => navigate("/profile")}
                className="px-1.5 py-1.5 text-lg font-medium text-white transition duration-200 bg-blue-500 rounded-lg shadow-md md:px-3 md:py-2 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-1.5 py-1.5 text-lg font-medium text-white transition duration-200 bg-red-500 rounded-lg shadow-md md:px-3 md:py-2 hover:bg-red-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Logout
              </button>
            </div>
          )}
          {!isLoggedIn && (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="px-1.5 py-1.5 text-lg font-medium text-white transition duration-200 border border-transparent rounded-lg shadow-lg md:px-3 md:py-2 bg-slate-800  hover:bg-slate-700 hover:border-slate-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-1.5 py-1.5 text-lg font-medium text-black transition duration-200 bg-white border border rounded-lg shadow-md md:px-3 md:py-2 hover:bg-gray-300 hover:border-gray-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
