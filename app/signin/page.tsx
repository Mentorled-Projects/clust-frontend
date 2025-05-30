


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import React from "react";
import  Image  from 'next/image'

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStatus, setEmailStatus] = useState("idle");
  const [passwordStatus, setPasswordStatus] = useState("idle");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const isTyping = email !== "" && password !== "";

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        const data = await res.json();
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        }
        router.push("/dashboard");
      } else {
        setError("Credentials do not match our records");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* for the image Side */}
      <div className="w-[45%] h-full relative bg-cover bg-center  
      flex flex-col justify-center items-center p-12"
      style={{backgroundImage: "url('/image/GENTL AND HYERS PHOTOGRAPHY _ DRINKS _ 45 (1).webp"}}>
        <div className="absolute bottom-[20px] inset-x-0 bg-gradient-to-t flex justify-center from-black/100 to-transparent">
        <h1 className="   text-center text-white text-2xl font-bold  max-w-sm">
          Plan small gatherings, big moments, and everything in between.
        </h1>
        </div>
        
      </div>

      {/* the signup form Side */}
      <div className="w-[50%] h-full flex flex-col px-36 py-30">
        <h1 className="text-2xl font-bold">
          Welcome back, Ola <span>👋</span>
        </h1>

        {/* Email Field */}
        <div className="w-full max-w-md mb-4 mt-8">
          <h2 className="text-sm font-medium  text-[#00072D]">Email Address</h2>
          <input
            type="email"
            placeholder="Valid email required"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailStatus("typing");
            }}
            onBlur={() => setEmailStatus("done")}

            className={`w-full border text-xs px-3 mt-2 py-2 rounded 
                focus:outline-none ${ email ? 'border-[#2F2B36]' 
                    : 'focus:border-[#98D9FC] border-[#E6E5E5]'}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Password Field */}
        <div className="w-full max-w-md mb-4">
          <h2 className="text-sm mt-3 font-medium text-[#00072D]">Password</h2>
          <div className="flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={`w-full border mt-2 text-xs px-3 py-2 rounded focus:outline-none ${ 
                password.length === 0 
                ? 'border-[#E6E5E5]' 
                : password.length < 8 
                ? 'focus:border-[#98D9FC]': 
                'focus:border-[#2F2B36]' 
            }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 mt-3 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot password */}
        <div className="w-full max-w-md flex justify-between items-center mb-6">
          <label className="flex items-center space-x-2">
            <div className="flex items-center text-xs">
              <CheckCircle size={14} className="mr-2  text-blue-600" />
              <span>Remember me</span>
            </div>
          </label>
          <a href="/forgot-password" className=" text-xs">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          disabled={!isTyping}
          onClick={handleLogin}
          className={`w-full text-sm max-w-md p-3 rounded-md text-white transition-colors mb-4 ${
            isTyping ? "bg-[#0794E2]" : "bg-[#E0E0E0]"
          }`}
        >
          Login
        </button>

        
            {/** or separator */}
            <div className="w-full max-w-md text-center">
          <h1 className="mb-2 text-sm text-[#979797]">Or</h1>
          </div>
         {/**Google and Apple */}
                   <div className="space-y-3">
                         <button className="w-full text-xs text-[#979797] flex items-center justify-center border border-gray-200 py-2 rounded">
                         <Image 
                         src="/image/google.svg" 
                         alt="Google" 
                         width={15}
                         height={15}
                         className="mr-2"
                         />
                         Continue with Google
                         </button>
                         <button className="w-full text-xs text-[#979797] flex items-center justify-center border border-gray-200 py-2 rounded">
                         <Image 
                         src="/image/apple.svg" 
                         alt="Apple" 
                         width={15}
                         height={15}
                         className=" mr-2"/>
                         Continue with Apple
                         </button>
                   </div>
                    {/**sign in link */}
           <p className="text-center text-xs text-gray-600 mt-6">
              Don't have an account?{' '}
            <a href="/signin" className="text-[#0794E2] text-xs font-medium">
              Create an Account
            </a>
           </p>
      </div>
    </div>
  );
}
