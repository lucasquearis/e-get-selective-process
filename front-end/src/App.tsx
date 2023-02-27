import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import ErrorHandler from "./pages/Error";
import Home from "./pages/Home";
import DashBoard from "./pages/Home/Dashboard";
import RegisterProducts from "./pages/Home/RegisterProducts";
import Stock from "./pages/Home/Stock";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultWrapper from "./template/Wrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultWrapper>
        <Login />
      </DefaultWrapper>
    ),
    errorElement: <ErrorHandler />,
  },
  {
    path: "/register",
    element: (
      <DefaultWrapper>
        <Register />
      </DefaultWrapper>
    ),
    errorElement: <ErrorHandler />,
  },
  {
    path: "/home",
    element: (
      <DefaultWrapper>
        <Home />
      </DefaultWrapper>
    ),
    errorElement: <ErrorHandler />,
  },
  {
    path: "/home/register",
    element: (
      <DefaultWrapper>
        <RegisterProducts />
      </DefaultWrapper>
    ),
    errorElement: <ErrorHandler />,
  },
  {
    path: "/home/dashboard",
    element: (
      <DefaultWrapper>
        <DashBoard />
      </DefaultWrapper>
    ),
    errorElement: <ErrorHandler />,
  },
  {
    path: "/home/stock",
    element: (
      <DefaultWrapper>
        <Stock />
      </DefaultWrapper>
    ),
    errorElement: <ErrorHandler />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
