import { useEffect, useState } from "react";
import { getCurrentUser } from "../api";
import NavBar from "../components/navBar";

interface User {
  name: string;
  email: string;
}

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser.user);
      } catch (error: any) {
        throw new Error(`Getting User Data failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="flex flex-col justify-center ">
      <NavBar />
      <main className="flex flex-col items-center justify-center flex-grow p-5 md:p-12">
        {loading && (
          <div className="text-2xl font-semibold text-gray-700 md:text-4xl">
            Loading...
          </div>
        )}
        {!loading && !user && (
          <div className="text-xl text-center text-gray-600 md:text-2xl">
            User data could not be loaded.
          </div>
        )}
        {!loading && user && (
          <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-md md:p-8">
            <h1 className="mb-6 text-3xl font-semibold text-center">
              User Profile
            </h1>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Name:</span>
                <span className="text-gray-600">
                  {user.name || "No user name"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Email:</span>
                <span className="text-gray-600">
                  {user.email || "No email provided"}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfilePage;
