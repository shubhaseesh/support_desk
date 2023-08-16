import axios from "axios";

const API_URL = "/api/users/";
const API_URL_LOGIN = "/api/users/login";

interface FormData {
  name: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}
// register user
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
    throw new Error(error);
  }
};

// login user
const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(API_URL_LOGIN, loginData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

// logout user
const logout = async () => localStorage.removeItem('user');

const authService = { register, login, logout };
export default authService;
