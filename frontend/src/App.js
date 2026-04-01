import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "pages/LoginPage";
import SignUpPage from "pages/SignUpPage";
import ErrorPage from "pages/ErrorPage";
import MainPage from "pages/MainPage";
import SentMessagePage from "pages/SentMessagePage";
import Layout from "components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "signUp",
          element: <SignUpPage />,
        },
        { path: "main", element: <MainPage /> },
        { path: "sentMessage", element: <SentMessagePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
