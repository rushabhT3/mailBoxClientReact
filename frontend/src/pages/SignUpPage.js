import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "features/auth/api/authApi";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { email, password };

    try {
      await signUp(userData);
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sticky Left Section */}
      <div className="lg:w-1/2 p-12 lg:sticky lg:top-0 h-fit lg:h-screen flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#1a1a1a]">
        <div>
           <h1 className="text-[12vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase mb-8">
            Sign<br/>Up
          </h1>
          <p className="text-gray-400 max-w-sm uppercase tracking-widest text-xs font-bold">
            Join the elite messaging platform. Purely monochromatic, highly efficient.
          </p>
        </div>
        <div className="mt-12 lg:mt-0">
          <button 
            onClick={() => navigate("/login")}
            className="text-xs font-bold uppercase tracking-widest hover:text-purple-500 transition-colors"
          >
            ← Already a member
          </button>
        </div>
      </div>

      {/* Scrollable Right Section (Form) */}
      <div className="lg:w-1/2 p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <form onSubmit={submitHandler} className="space-y-12">
            <div className="group relative">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-focus-within:text-purple-500 transition-colors">
                Email Address
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full bg-transparent border-b-2 border-[#1a1a1a] py-4 focus:outline-none focus:border-purple-600 transition-colors text-xl font-medium"
                placeholder="MAIL@DOMAIN.COM"
                required
              />
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-focus-within:text-purple-500 transition-colors">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-transparent border-b-2 border-[#1a1a1a] py-4 focus:outline-none focus:border-purple-600 transition-colors text-xl font-medium"
                placeholder="********"
                required
              />
            </div>

            <div className="group relative">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 group-focus-within:text-purple-500 transition-colors">
                Confirm Password
              </label>
              <input
                type="password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="block w-full bg-transparent border-b-2 border-[#1a1a1a] py-4 focus:outline-none focus:border-purple-600 transition-colors text-xl font-medium"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-6 text-sm font-black uppercase tracking-[0.3em] hover:bg-purple-600 hover:text-white transition-all duration-300 transform active:scale-[0.98]"
            >
              Initialize Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
