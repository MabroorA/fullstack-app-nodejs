import { useState } from "react";
import { createUser } from "../api";



function Register() {
  const [userEmail, SetUserEmail] = useState("");
  const [userPassword, SetUserPassword] = useState("");

  const handleRegistration = async () => {
    await createUser({ email: userEmail, password: userPassword });
  }
  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <div className="text-3xl font-bold">Register</div>
      {/* Email Section */}
      <div className=" flex flex-col py-2">
        <div className="py-2">Email</div>
        <div>
          <input
            className="border border-black rounded-lg p-1"
            type="text"
            value={userEmail}
            onChange={(e) => SetUserEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
      </div>
      {/* Password Section */}
      <div className=" flex flex-col py-2">
        <div className="py-2">Password</div>
        <div>
          <input
            className="border border-black rounded-lg p-1"
            type="text"
            value={userPassword}
            onChange={(e) => SetUserPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
      </div>
      <div className="py-2 ">
        <button 
          onClick={handleRegistration}
          className="bg-black text-gray-300 border border-transparent rounded-lg p-2 hover:bg-white hover:text-black hover:border-gray-700 hover:border w-full">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
