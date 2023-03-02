import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import ErrorHandler from "./pages/Error";
import Home from "./pages/Home";
import DashBoard from "./pages/Home/Dashboard";
import RegisterProducts from "./pages/Home/RegisterProducts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DefaultWrapper from "./template/Wrapper";
import ClassInterceptor from "./components/ClassInterceptor";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultWrapper>
        <Login />
      </DefaultWrapper>
    ),
    errorElement: (
      <DefaultWrapper>
        <ErrorHandler />
      </DefaultWrapper>
    ),
  },
  {
    path: "/register",
    element: (
      <DefaultWrapper>
        <Register />
      </DefaultWrapper>
    ),
    errorElement: (
      <DefaultWrapper>
        <ErrorHandler />
      </DefaultWrapper>
    ),
  },
  {
    path: "/home",
    element: (
      <DefaultWrapper>
        <Home />
      </DefaultWrapper>
    ),
    errorElement: (
      <DefaultWrapper>
        <ErrorHandler />
      </DefaultWrapper>
    ),
  },
  {
    path: "/home/register",
    element: (
      <DefaultWrapper>
        <RegisterProducts />
      </DefaultWrapper>
    ),
    errorElement: (
      <DefaultWrapper>
        <ErrorHandler />
      </DefaultWrapper>
    ),
  },
  {
    path: "/home/dashboard",
    element: (
      <DefaultWrapper>
        <DashBoard />
      </DefaultWrapper>
    ),
    errorElement: (
      <DefaultWrapper>
        <ErrorHandler />
      </DefaultWrapper>
    ),
  },
  {
    path: "/home/stock",
    element: (
      <DefaultWrapper>
        <ClassInterceptor />
      </DefaultWrapper>
    ),
    errorElement: (
      <DefaultWrapper>
        <ErrorHandler />
      </DefaultWrapper>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
