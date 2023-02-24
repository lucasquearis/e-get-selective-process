import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorHandler from "./pages/ErrorHandler";
import "./global.css";

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
