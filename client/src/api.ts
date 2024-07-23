const API_URL = "http://localhost:5000";

export const registerNewUser  = async (userData: {
  name: string,
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
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
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const loginUser  = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    console.log(result);
    return result;
  } catch (error: any) {
    throw new Error(`Login Failed: ${error.message}`);
  }
};