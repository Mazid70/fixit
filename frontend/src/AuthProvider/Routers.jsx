import { createBrowserRouter } from "react-router";
import App from "../App";
import Logger from "../Pages/Logger/Logger";
import Home from "../Pages/Home/Home";

export const routers = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element:<Home/>
        }, {
          path: '/login',
          element:<Logger/>
        }
      ]
  }
]
)