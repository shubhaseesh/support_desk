import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
// type Props = {};

const Layout = () => {
  const user = true;
  return (
    <div className="h-auto">
      <div className="flex justify-between items-center shadow-lg bg-white-200">
        <div className="flex items-center justify-center">
          <div className="ml-3 px-3 text-xl tracking-wide hover:text-black text-red-800 font-bold">
            <Link to="/">Support Desk</Link>
          </div>
        </div>
        <div>
          <h3 className="text-gray-700 text-2xl font-bold">
            What do you need help with ?
          </h3>
        </div>
        {!user ? (
          <div className="flex w-96 justify-end mr-8 p-3">
            <div className="flex text-center mr-2">
              <Link
                to="/logout"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex w-96 justify-end mr-8 p-3">
            <div className="flex text-center mr-2">
              <Link
                to="/register"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Register
              </Link>
            </div>
            <div className="flex text-center mr-2">
              <Link
                to="/login"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
