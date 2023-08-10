import { useState, useEffect } from "react";
import {
  useAppSelector,
  useAppDispatch,
  RootState,
} from "../../store/features/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../store/features/auth/authSlice";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const dispatch = useAppDispatch();
  const { user, isLoading, isSuccess, message, isError } = useAppSelector(
    (state: RootState) => state.auth
  );
  // console.log({ user, isLoading, isSuccess, message, isError });

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Redirect when logged in
    if (isSuccess || user) {
      // navigate("/");
    }
    dispatch(reset());
  }, [user, isLoading, isSuccess, message, isError, navigate, dispatch]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password did not matched.");
      // throw new Error('Password did not matched.')
    } else {
      toast("Success");
      dispatch(register({ name, email, password }));
    }
    dispatch(reset());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">Register</h2>
          <p className="mb-4 font-medium">Please create an account.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={onChange}
              required
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
