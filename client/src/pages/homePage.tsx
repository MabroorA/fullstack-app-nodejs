import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <div className="py-5 text-3xl font-semibold text-center md:text-5xl">
        Home Page
      </div>
      {isLoggedIn ? (
        <div className="p-4 text-center">
          <div className="">You are logged in!</div>
          <button
            onClick={handleLogout}
            className="p-2 text-white bg-red-500 border border-transparent rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-4 text-center">
          <div className="">Please log in to access this page.</div>
          <button
            onClick={() => navigate("/login")}
            className="p-2 text-white bg-teal-400 border border-transparent rounded-lg hover:bg-teal-700"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
