import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "features/auth/api/authApi";
import { parseJwt } from "features/auth/utils/parseJwt";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      const { token } = data;
      localStorage.setItem("token", token);
      const decodedToken = parseJwt(token);
      console.log("Decoded Token:", decodedToken);

      setEmail("");
      setPassword("");
      navigate("/main");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sticky Left Section */}
      <div className="lg:w-1/2 p-12 lg:sticky lg:top-0 h-fit lg:h-screen flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1a1a1a]">
        <div>
          <h1 className="text-[12vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mb-8">
            Log<br/>In
          </h1>
          <p className="text-gray-400 max-w-sm uppercase tracking-widest text-xs font-bold">
            Access your secure communications. Minimal, fast, and private.
          </p>
        </div>
        <div className="mt-12 lg:mt-0">
          <button 
            onClick={() => navigate("/signUp")}
            className="text-xs font-bold uppercase tracking-widest hover:text-purple-500 transition-colors"
          >
            Create an account →
          </button>
        </div>
      </div>

      {/* Scrollable Right Section (Form) */}
      <div className="lg:w-1/2 p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="group relative">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-focus-within:text-purple-500 transition-colors">
                Identification
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full bg-transparent border-b-2 border-[#1a1a1a] py-4 focus:outline-none focus:border-purple-600 transition-colors text-xl font-medium"
                placeholder="EMAIL@ADDRESS.COM"
                required
              />
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-focus-within:text-purple-500 transition-colors">
                Passphrase
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-transparent border-b-2 border-[#1a1a1a] py-4 focus:outline-none focus:border-purple-600 transition-colors text-xl font-medium"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-6 text-sm font-black uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all duration-300 transform active:scale-[0.98]"
            >
              Authorize Access
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
