import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import ErrorHandler from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorHandler />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
