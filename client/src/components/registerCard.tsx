import { useState } from "react";
import { registerNewUser } from "../api";
import { useNavigate } from "react-router-dom";

function RegisterCard() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleUserRegistration = async () => {
    if (userPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const validatePassword = (password: string) => {
      const minLength = 6;
      const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>_\-~]/;

      return (
        password.length >= minLength && specialCharacterPattern.test(password)
      );
    };

    if (!validatePassword(userPassword)) {
      setErrorMessage(
        "Password must be at least 6 characters long and contain at least one special character"
      );
      return;
    }

    try {
      const result = await registerNewUser({
        name: userName,
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
      setErrorMessage(`Registration failed: ${err.message}`);
    }
  };
  return (
    <div className="flex justify-center p-8 mx-auto ">
      <div className="flex flex-col w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-center">Register</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserRegistration();
          }}
        >
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </div>
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
          <div className="flex flex-col mb-4">
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
          <div className="flex flex-col mb-6">
            <label
              className="mb-2 text-sm font-medium"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterCard;
