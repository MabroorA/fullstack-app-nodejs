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
  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="text-3xl font-semibold text-center md:text-5xl">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <div className="flex flex-col mx-auto text-center ">
        <div className="text-3xl font-semibold text-center md:text-5xl">
          User Page
        </div>
        <div className="flex flex-col py-10 mx-auto text-center">
          <div className="flex flex-row">
            <div className="p-2 font-bold "> Name:</div>
            <div className="p-2 text-black">{user?.name || "No user name"}</div>
          </div>
          <div className="flex flex-row">
            <div className="p-2 font-bold "> Email:</div>
            <div className="p-2 text-black">{user?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
