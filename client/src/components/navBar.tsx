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
      <div className="flex items-center justify-center w-full space-x-4 md:mb-0">
        <div className="">
          <button
            onClick={() => navigate("/")}
            className="p-2 text-white bg-gray-800 border rounded-lg hover:bg-white hover:text-black hover:border-gray-300 hover:border hover:cursor-pointer"
          >
            Home
          </button>
        </div>
        <div>
          {isLoggedIn ? (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/profile")}
                className="p-2 text-white bg-blue-400 rounded hover:bg-blue-700"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="p-2 text-white bg-gray-800 border rounded-lg hover:bg-white hover:text-black hover:border-gray-300 hover:border hover:cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="p-2 text-white bg-gray-400 border rounded-lg hover:bg-white hover:text-black hover:border-gray-300 hover:border hover:cursor-pointer"
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
