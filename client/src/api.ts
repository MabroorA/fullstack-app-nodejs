const API_URL = "http://localhost:5000/api";

export const createUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      mode:"no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error creating user: " + Error);
  }
};
