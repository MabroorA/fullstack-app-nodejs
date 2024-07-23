import { useState } from "react";
import { registerNewUser } from "../api";

function RegisterCard() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleUserRegistration = async () => {
    try {
      await registerNewUser({
        email: userEmail,
        password: userPassword,
      });
    } catch (err: any) {
      throw new Error(`Handling Registration failed: ${err.message}`);
    }
  };
  return (
    <div className=" flex  justify-center  p-16 mx-auto">
      <div className="flex flex-col border border-gray-300 p-16 w-fit  rounded-lg ">
        <div className="text-3xl font-bold">Register</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserRegistration();
          }}
        >
          {/* Email Section */}
          <div className="flex flex-col py-4">
            <label className="py-2" htmlFor="email">
              Email
            </label>
            <input
              className="border-b-2 border-gray py-1 "
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
              className="border-b-2 border-gray py-1 "
              type="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="py-2">
            <button
              type="submit"
              className="bg-black text-gray-300 border border-transparent rounded-lg p-2 hover:bg-white hover:text-black hover:border-gray-700 hover:border w-full"
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
