import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// ? parseJwt function
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const { token } = await response.data;
      localStorage.setItem("token", token);
      const decodedToken = parseJwt(token);
      console.log(decodedToken);

      // ? Access payload data (example: userId, email)
      const userId = decodedToken.userId;
      const userEmail = decodedToken.email;

      console.log("Decoded Token:", decodedToken);

      setEmail("");
      setPassword("");
      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://images.unsplash.com/photo-1545529468-42764ef8c85f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-3 w-full border rounded-md"
                  placeholder="Your email"
                  required
                />
              </div>

              {/* Password input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-3 w-full border rounded-md"
                  placeholder="Your password"
                  required
                />
              </div>

              <div className="mb-6 flex items-center justify-between">
                {/* Remember me checkbox */}
                {/* <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-primary border-primary"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label> */}

                {/* Forgot password link */}
                {/* <Link to="/forgot-password" className="text-primary">
              Forgot password?
            </Link> */}
              </div>

              {/* Login button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block rounded bg-primary text-black px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Login
                </button>
              </div>

              {/* Register link */}
              <p className="mt-4 text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <NavLink
                  to="/signUp"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-primary-active"
                      : "text-primary hover:underline"
                  }
                >
                  📌 Sign Up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
