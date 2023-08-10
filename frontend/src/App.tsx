import type { RouteObject } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";

const App = () => {
  let routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ];
  let element = useRoutes(routes);
  return (
    <div className="h-auto w-auto">
      {element}
    </div>
  );
};

export default App;
