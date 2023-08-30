import { useState, useEffect } from "react";
import { login } from "../../store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/features/store";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/features/store";

const Login = () => {
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const dispatch = useAppDispatch();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading ? (
        <p className="text-black">Loading...</p>
      ) : (
        <>
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-center">
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
