import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect } from "react-router-dom";
import RootLayout from "./layout/routerLayout";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import App from "./App";
import store from "../store";
import { Provider } from "react-redux";

import CoinList from "./pages/CartPage";
import MyCoinPage from "./pages/MyCoinPage";
import UpdateCoinPage from "./pages/UpdateCoinPage";




const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/CardPage",
            element:<CoinList/>
          },
          {
            path: "/MyCoinPage",
            element: <MyCoinPage />,
          },
          {
            path: "/update-cart/:id",
            element:<UpdateCoinPage/>
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> 
      <App router={router} />
    </Provider>
  </React.StrictMode>
);
