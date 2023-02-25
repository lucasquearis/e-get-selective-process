import { ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import ErrorHandler from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./template/Footer";
import Header from "./template/Header";

const DefaultWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
