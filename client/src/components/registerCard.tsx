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

  
      return password.length >= minLength && specialCharacterPattern.test(password);
    };
    
    if (!validatePassword(userPassword)) {
      setErrorMessage("Password must be at least 6 characters long and contain at least one special character");
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
    <div className="flex justify-center p-16 mx-auto ">
      <div className="flex flex-col p-16 border border-gray-300 rounded-lg w-fit ">
        <div className="text-3xl font-semibold">Register</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserRegistration();
          }}
        >
          <div className="flex flex-col py-4">
            <label className="py-2" htmlFor="name">
              Name
            </label>
            <input
              className="py-1 border-b-2 border-gray "
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </div>
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
          <div className="flex flex-col py-4">
            <label className="py-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="py-1 border-b-2 border-gray "
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <div className="py-2">
            <button
              type="submit"
              className="w-full p-2 text-white bg-black border border-transparent rounded-lg hover:bg-white hover:text-black hover:border-gray-700 hover:border"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterCard;
