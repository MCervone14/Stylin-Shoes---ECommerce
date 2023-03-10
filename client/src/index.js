import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsCatalog from "./Pages/ProductsCatalog";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import ShoppingCart from "./Pages/ShoppingCart";
import ProductDetails from "./Pages/ProductDetails";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Checkout from "./Pages/Checkout";
import UserOrders from "./Pages/UserOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "products",
        element: <ProductsCatalog />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
        loader: async ({ params }) => {
          let id = params.id;
          return id;
        },
      },
      {
        path: "cart",
        element: <ShoppingCart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "userOrders",
        element: <UserOrders />,
      },
    ],
  },
]);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
