
"use client"

import { useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import React from "react";
import { useRouter } from 'next/navigation';
import  Image  from 'next/image'

type FormData = {
    email: string;
    first_name: string;
    last_name: string;
}


export default function SignupForm(){
    
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleContinue = () => {
        localStorage.setItem("signupData", JSON.stringify(formData))
    router.push('/signup/password')
};



return(
    <div className="flex h-screen  ">
        {/**for the image side */}
        <div className="w-[45%] h-full relative bg-cover bg-center  flex flex-col justify-center items-center p-12" 
        style={{backgroundImage: "url('/image/GENTL AND HYERS PHOTOGRAPHY _ DRINKS _ 45 (1).webp"}}>
         <div className="absolute bottom-[20px] inset-x-0 flex justify-center bg-gradient-to-t from-black/100 to-transparent">
        <h1 className="text-center text-white  text-2xl font-bold max-w-sm">
            Plan small gatherings, big moments, and everything in between.
        </h1>
        </div>
        </div>
        


        {/**the signup form side */}
        <div className=" h-full w-[50%] flex flex-col px-36 py-30">
            <div className="w-full max-w-md  ">
                <h1 className="text-2xl font-bold   text-[#1A202C]">Create an account</h1>
                <p className="text-sm font-thin  text-[#2C3442]">Join us now and start planning effortlessly.</p>
           
           {/**Email */}
           <div className="mt-5">
            <h2 className="text-sm font-medium  text-[#00072D]">Email Address</h2>
            <input 
            type="email"
            placeholder="Valid Email required"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border text-xs px-3 mt-2 py-2 rounded 
                focus:outline-none ${ formData.email ? 'border-[#2F2B36]' 
                    : 'focus:border-[#98D9FC] border-[#E6E5E5]'}`}
            />
           </div>


           {/**First and Last name */}
           <div className="flex gap-4">
            <div className="flex-1">
                <h3 className="text-sm mt-3 font-medium text-[#00072D] ">First name</h3>
                <input 
                type="text"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
                className={`w-full mt-2 text-xs border px-3  py-2 rounded focus:outline-none ${formData.first_name ? 'border-[#2F2B36]': 'focus:border-[#98D9FC] border-[#E6E5E5]'}`}
                />
            </div>

                 <div className="flex-1">
                    <h3 className="text-sm mt-3 font-medium text-[#00072D] ">Last name</h3>
                      <input
                      type="text"
                      placeholder="John"
                      value={formData.last_name}
                      onChange={handleChange}
                      className={`w-full text-xs mt-2 border  px-3 py-2 rounded focus:outline-none ${formData.last_name ? 'border-[#2F2B36]' : 'focus:border-[#98D9FC] border-[#E6E5E5]'}`}
                      />
                 </div>
           </div>

           {/** continue button */}
           <button
          disabled={!(formData.email && formData.first_name && formData.last_name)}
           onClick={handleContinue}
           className={`w-full py-2 mt-4 text-sm rounded mb-5 text-white ${formData.email || formData.first_name || formData.last_name ? 'bg-[#0794E2]' : 'bg-[#E6E5E5]'}`}>
           Continue
           </button>

          

          

           {/** or separator */}
           <div className="text-center  ">
            <h2 className=" text-gray-500">Or</h2>
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
                 <button className="w-full text-xs flex items-center justify-center border border-gray-200 py-2 my-5 rounded">
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

