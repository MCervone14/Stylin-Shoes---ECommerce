import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import {
  ActionFunction,
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
  ShouldRevalidateFunction,
} from "react-router-dom";
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
import ShippingInfo from "./Components/ShippingInfo/ShippingInfo";
import UserOrders from "./Pages/UserOrders";

interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  shouldRevalidate?: ShouldRevalidateFunction;
}

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
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
