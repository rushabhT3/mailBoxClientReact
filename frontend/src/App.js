import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
// import DummyPage from "./pages/DummyPage";
// import ProfilePage from "./pages/ProfilePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      // element: <RootLayout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signUp",
          element: <SignUpPage />,
        },
        { path: "/main", element: <MainPage /> },
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
