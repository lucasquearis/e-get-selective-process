import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import ErrorHandler from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorHandler />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorHandler />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
