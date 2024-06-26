import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import ErrorPage from "./error-page.jsx";
import ReactflowComp from "./react-flow/index.jsx";
import SearchComp from "./search/index.jsx";
import MainContent from "./MainContent.jsx";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MainContent />,
      },
      {
        path: "react-flow",
        element: <ReactflowComp />,
      },
      {
        path: "search",
        element: <SearchComp />,
      },
    ],
  },
]);

export default router;
