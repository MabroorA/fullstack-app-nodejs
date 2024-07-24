import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const loggedInContent = (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-lg font-medium text-gray-700 md:text-xl">
        You are logged in!
      </div>
      <div className="text-sm ">
        Only logged users can see this secret database file{" "}
      </div>
      <img className="rounded-lg " src="/databasefile.png" />

      <div className="text-xs ">
        The shown database users will have been deleted when you see this
      </div>
      <button
        onClick={handleLogout}
        className="px-6 py-3 text-lg text-white transition-colors bg-red-500 rounded-lg shadow-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );

  const notLoggedInContent = (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-lg font-medium text-gray-700 md:text-xl">
        Please log in to access this page.
      </div>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 text-lg text-white transition-colors bg-teal-500 rounded-lg shadow-md hover:bg-teal-600"
      >
        Login
      </button>
    </div>
  );

  return (
    <div className="flex flex-col ">
      <NavBar />
      <main className="flex flex-col items-center justify-center flex-grow p-6 text-center md:p-12">
        <div className="mb-6 text-3xl font-extrabold text-gray-800 md:text-5xl">
          Welcome to the Home Page
        </div>
        {isLoggedIn ? loggedInContent : notLoggedInContent}
      </main>
    </div>
  );
}

export default HomePage;
