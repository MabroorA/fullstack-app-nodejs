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
    <div className="flex justify-center p-16 mx-auto ">
      <div className="flex flex-col p-16 border border-gray-300 rounded-lg w-fit ">
        <div className="text-3xl font-semibold">Login</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserLogin();
          }}
        >
          {/* Email Section */}
          <div className="flex flex-col py-4">
            <label className="py-2" htmlFor="email">
              Email
            </label>
            <input
              className="py-1 border-b-2 border-gray "
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          {/* Password Section */}
          <div className="flex flex-col py-4">
            <label className="py-2" htmlFor="password">
              Password
            </label>
            <input
              className="py-1 border-b-2 border-gray "
              type="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="py-2">
            <button
              type="submit"
              className="w-full p-2 text-gray-300 bg-black border border-transparent rounded-lg hover:bg-white hover:text-black hover:border-gray-700 hover:border"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
