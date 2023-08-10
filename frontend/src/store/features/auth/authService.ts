import axios from "axios";

const API_URL = "/api/users/";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const register = async (userData: FormData) => {
  try {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    // todo find out silent error handling
    console.error("Error during registration:", error.response.data);
    throw error;
  }
};

const authService = { register };
export default authService;
