


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Check, CheckCircle, XCircle } from "lucide-react";
import { useSignUpState } from "../../store/signup";
import axios from "axios";
import { registerNewUser } from "../services/auth.services";
  import { ToastContainer, toast } from 'react-toastify';


export default function SignupForm() {
  const { setSignUpState, signUpState } = useSignUpState();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isEmailValid = signUpState.email.includes("@");
  const isFirstNameValid = signUpState.first_name.trim() !== "";
  const isLastNameValid = signUpState.last_name.trim() !== "";
  const [response, setResponse] = useState(null);
  const doPasswordsMatch =
    signUpState.password &&
    signUpState.password === signUpState.password_verify;

  const handleContinue = async () => {
    if (step === 1) {
      if (!isEmailValid || !isFirstNameValid || !isLastNameValid) {
        setError("Please complete all fields correctly.");
        return;
      }
      setError("");
      setStep(2);
    } else {
      if (!doPasswordsMatch) {
        setError("Passwords do not match.");
        return;
      }

      setError("");
      const signupData = {
        ...signUpState,
      };

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
          }
        );

        const data = await res.json();
        console.log(data);
        if(data.success ) {
          toast("Wow so easy!")
        }
        else{
          toast(data.detail)
        }
      } catch (err) {
        console.error("Error:", err);
    
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  });

  const getInputClasses = (isValid: boolean, value: string) => {
    return `w-full text-xs border px-3 py-2 mt-2 rounded focus:outline-none ${
      value
        ? isValid
          ? "border-[#2F2B36]"
          : "border-red-500"
        : "focus:border-[#98D9FC] border-[#E6E5E5]"
    }`;
  };

  return (
    <div className="flex flex-col md:flex-row h-full md:h-screen">
      {/* for the image section */}
      <div
        className="w-full md:w-[45%] h-[300px] md:h-full relative bg-cover bg-center flex flex-col justify-center items-center p-6 md:p-12"
        style={{
          backgroundImage:
            "url('/image/GENTL AND HYERS PHOTOGRAPHY _ DRINKS _ 45 (1).webp')",
        }}
      >
        <div className="absolute bottom-[20px] inset-x-0 flex justify-center bg-gradient-to-t from-black/100 to-transparent">
          <h1 className="text-center text-white text-xl md:text-2xl font-bold max-w-sm">
            Plan small gatherings, big moments, and everything in between.
          </h1>
        </div>
      </div>

      {/* Back button */}
      {step === 2 && (
        <p
          className="underline underline-offset-1 text-blue-600 cursor-pointer text-sm font-semibold px-6 md:px-12 py-6 md:py-12"
          onClick={() => setStep(1)}
        >
          Back
        </p>
      )}

      {/* Signup form */}
      <div className="w-full md:w-[50%] h-full flex flex-col px-6 md:px-36 py-10 md:py-30">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-[#1A202C]">
            Create an account
          </h1>
          <p className="text-sm font-thin text-[#2C3442]">
            Join us now and start planning effortlessly.
          </p>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {step === 1 ? (
            <>
              {/* Email */}
              <div className="mt-5 relative">
                <h2 className="text-sm font-medium text-[#00072D]">
                  Email Address
                </h2>
                <input
                  type="email"
                  placeholder="Valid Email required"
                  value={signUpState.email}
                  onChange={(e) =>
                    setSignUpState({
                      ...signUpState,
                      email: e.target.value,
                    })
                  }
                  className={getInputClasses(isEmailValid, signUpState.email)}
                />
                {isEmailValid && (
                  <Check
                    className="absolute right-3 top-9 focus:border-[#98D9FC]"
                    size={16}
                  />
                )}
              </div>

              {/* First & Last Name */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <h3 className="text-sm mt-3 font-medium text-[#00072D]">
                    First name
                  </h3>
                  <input
                    type="text"
                    placeholder="John"
                    value={signUpState.first_name}
                    onChange={(e) =>
                      setSignUpState({
                        ...signUpState,
                        first_name: e.target.value,
                      })
                    }
                    className={getInputClasses(
                      isFirstNameValid,
                      signUpState.first_name
                    )}
                  />
                </div>
                <div className="flex-1 relative">
                  <h3 className="text-sm mt-3 font-medium text-[#00072D]">
                    Last name
                  </h3>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={signUpState.last_name}
                    onChange={(e) =>
                      setSignUpState({
                        ...signUpState,
                        last_name: e.target.value,
                      })
                    }
                    className={getInputClasses(
                      isLastNameValid,
                      signUpState.last_name
                    )}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Password */}
              <div className="relative mt-5">
                <h3 className="text-sm font-medium text-[#00072D]">Password</h3>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={signUpState.password}
                  onChange={(e) =>
                    setSignUpState({
                      ...signUpState,
                      password: e.target.value,
                    })
                  }
                  className={getInputClasses(true, signUpState.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

                {signUpState.password.length > 0 && !doPasswordsMatch && (
                  <div className="flex text-sm items-center text-red-600 mt-2">
                    <XCircle
                      className="mr-2 bg-red-600 text-white rounded-full"
                      size={16}
                    />
                    <span>8 characters minimum</span>
                  </div>
                )}
                {doPasswordsMatch && (
                  <div className="flex text-sm items-center text-green-600 mt-2">
                    <CheckCircle className="mr-2" size={16} />
                    <span>8 characters complete</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative mt-5">
                <h3 className="text-sm font-medium text-[#00072D]">
                  Confirm Password
                </h3>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={signUpState.password_verify}
                  onChange={(e) =>
                    setSignUpState({
                      ...signUpState,
                      password_verify: e.target.value,
                    })
                  }
                  className={getInputClasses(
                    true,
                    signUpState.password_verify
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-9 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {doPasswordsMatch && (
                  <Check
                    className="absolute right-8 top-9 focus:border-[#98D9FC]"
                    size={16}
                  />
                )}
              </div>
            </>
          )}

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className={`w-full py-2 mt-4 text-sm rounded mb-5 text-white ${
              (step === 1 &&
                isEmailValid &&
                isFirstNameValid &&
                isLastNameValid) ||
              (step === 2 && doPasswordsMatch)
                ? "bg-[#0794E2]"
                : "bg-[#E6E5E5]"
            }`}
          >
            Continue
          </button>

          {/* Or separator */}
          <div className="text-center">
            <h2 className="text-gray-500">Or</h2>
          </div>

          {/* Google & Apple */}
          <div className="space-y-3">
            <button className="w-full mt-3 text-xs flex items-center justify-center border border-gray-200 py-2 rounded">
              <div
                id="google_onload"
                data-client_id="953490389679-1328a2pnbu3e7cg4e2knas3epjo4umgi.apps.googleusercontent.com"
                data-login_uri="http://localhost:8000/auth/google"
                data-auto_prompt="false"
              ></div>
              <Image
                src="/image/google.svg"
                alt="Google"
                width={15}
                height={15}
                className="mr-2"
              />
              Continue with Google
            </button>
            <button className="w-full text-xs flex items-center justify-center border border-gray-200 py-2 my-5 rounded">
              <Image
                src="/image/apple.svg"
                alt="Apple"
                width={15}
                height={15}
                className="mr-2"
              />
              Continue with Apple
            </button>
          </div>

          {/* Sign In */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/signin" className="text-[#0794E2] font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
              <ToastContainer />

    </div>
  );
}

