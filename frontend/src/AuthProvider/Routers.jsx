import { createBrowserRouter } from "react-router";
import App from "../App";
import Logger from "../Pages/Logger/Logger";
import Home from "../Pages/Home/Home";
import ExploreView from "../Pages/ExploreView";

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Logger />,
      },
      {
        path: '/explore',
        element: <ExploreView />,
      },
    ],
  },
]);