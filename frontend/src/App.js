import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import SentMessagePage from "./pages/SentMessagePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <RootLayout />,
      children: [
        {
          path: "/login",
          // exact: true,
          element: <LoginPage />,
        },
        {
          path: "/signUp",
          element: <SignUpPage />,
        },
        { path: "/main", element: <MainPage /> },
        { path: "/sentMessage", element: <SentMessagePage /> },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      <div className="App"></div>
    </RouterProvider>
  );
}

export default App;
