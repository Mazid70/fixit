import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home.jsx/Home";

export const routers = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element:<Home />
        }
      ]
  }
]
)