import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log(password, passwordConfirmation);
    if (password !== passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    try {
      console.log(userData);
      const response = await axios.post(
        "http://localhost:3001/signUp",
        userData
      );
      console.log(response.data);

      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">
              Sign Up Here 👑
            </h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={submitHandler}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
            {/* <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a> */}
            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <button
                className="text-purple-600 hover:underline"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
