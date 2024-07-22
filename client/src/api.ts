const API_URL = "http://localhost:5000";

export const sendRegisterDetailstoServer = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error("Response.ok :" + response.ok);
    }

    console.log(result);
    return result;
  } catch (error: any) {
    console.error("Error sending registration details:", error.message);
    throw new Error(`Registration failed: ${error.message}`);
  }
};
