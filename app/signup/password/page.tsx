



"use client"



import { useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import React from "react";
import { useRouter } from 'next/navigation';
import  Image  from 'next/image'
import { signupUser } from "../../utils/api";




export default function SignupForm(){
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmpassword] = useState(false);
    
    

    const isPasswordValid = password.length >= 8;
    const doPasswordsMatch = password && confirmPassword && password === confirmPassword;

    const router = useRouter()
const handleContinue = () => {
    router.push('/signup/password')
}

return(
    <div className="flex h-screen  ">
        {/**for the image side */}
        <div className="w-[45%] h-full relative bg-cover bg-center flex flex-col justify-center items-center p-12" 
        
        style={{backgroundImage: "url('/image/GENTL AND HYERS PHOTOGRAPHY _ DRINKS _ 45 (1).webp"}}>
            <div className="absolute bottom-[20px] inset-x-0 bg-gradient-to-t flex justify-center from-black/100 to-transparent">
        <h1 className="  text-center text-white text-2xl font-bold  max-w-sm">
            Plan small gatherings, big moments, and everything in between.
        </h1>
        </div>
        </div>


        {/**the signup form side */}
        <div className=" h-full w-[50%]  flex items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl mb- font-bold  text-[#1A202C]">Create an account</h1>
                <p className="text-sm font-thin mb-5   text-[#2C3442]">Join us now and start planning effortlessly</p>
          
 {/**password */}
 <div className="relative ">
           <h3 className="text-sm font-medium  text-[#00072D]">Password</h3>
            <input 
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border mt-2 text-xs px-3 py-2 rounded- focus:outline-none ${ 
                password.length === 0 
                ? 'border-[#E6E5E5]' 
                : password.length < 8 
                ? 'focus:border-[#98D9FC]': 
                'focus:border-[#2F2B36]' 
            }`}
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9">
                   {showPassword ? <EyeOff size={16}/> : <Eye size={18}/>}
            </button>

            {password.length > 0 && !isPasswordValid && (
                <div className="flex text-sm items-center text-red-600 mt-2">
                    <XCircle className="mr-2 bg-red-600 text-white rounded-full" size={16}/>
                    <span>8 characters minimum</span>
                </div>
            )}
            {isPasswordValid && (
                <div className="flex text-sm items-center text-green-600 mt-2">
                  <CheckCircle className="mr-2" size={16}/>
                  <span>8 characters complete</span>
                </div>
            )}
           </div>



           
 {/** confirm password */}
 <div className="relative">
                  <h3 className="text-sm font-medium mt-3 text-[#00072D]">Confirm Password</h3>
                  <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full mt-2 border text-xs px-3 py-2 rounded focus:outline-none ${confirmPassword.length === 0 ? 'border-[#E6E5E5]' : doPasswordsMatch ? 'focus:border-[#98D9FC]': 'border-[#2F2B36] focus:border-red-500'
                  }`}
                  />

                  <button onClick={() => setshowConfirmpassword(!showConfirmPassword)} className="absolute right-3 top-9">
                    {showConfirmPassword ? <EyeOff size={16}/> : <Eye size={20} />}
                  </button>
                  {!doPasswordsMatch && confirmPassword.length > 0 && (
                    <p className="text-red-500 mt-2">Passwords do not match</p>
                  )}
           </div>

             {/** continue button */}
             <button
           onClick={handleContinue}
           className={`w-full py-2 text-xs rounded mt-5 text-white ${password || confirmPassword  ? 'bg-[#0794E2]' : 'bg-[#E6E5E5]'}`}>
           Continue
           </button>


           {/** or separator */}
                      <div className="w-full max-w-md text-center">
                       <h2 className="mt-3 text-sm text-[#979797]">Or</h2>
                      </div>
           
                      {/**Google and Apple */}
                      <div className="space-y-3">
                            <button className="w-full mt-3 text-xs flex items-center justify-center border border-gray-200 py-2 rounded">
                            <Image 
                            src="/image/google.svg" 
                            alt="Google" 
                            width={15}
                            height={15}
                            className="mr-2"
                            />
                            Continue with Google
                            </button>
                            <button className="w-full text-xs mt-3 flex items-center justify-center border border-gray-200 py-2 rounded">
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
                       Already have an account?{' '}
                       <a href="/signin" className="text-[#0794E2] font-medium">
                       Sign in
                       </a>
                      </p>
                       </div>
                   </div>
               </div>
           )

          

           
       
}




















