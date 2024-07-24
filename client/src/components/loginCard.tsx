import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
function LoginCard() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleUserLogin = async () => {
    try {
      const result = await loginUser({
        email: userEmail,
        password: userPassword,
      });
      if (result.success) {
        setErrorMessage("");
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        setErrorMessage(result.message || "An unknown error occurred");
      }
    } catch (err: any) {
      setErrorMessage(`${err.message}`);
    }
  };
  return (
    <div className="flex items-center justify-center p-8 ">
      <div className="flex flex-col w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-center">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserLogin();
          }}
        >
          {/* Email Section */}
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          {/* Password Section */}
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 text-lg text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
