
"use client"
import Link from "next/link"
import { Star } from 'lucide-react'
import router from "next/router"




export default function PasswordChanged() {
 

  

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {/* for the back link */}
      <p className="text-sm text-blue-600 underline underline-offset-1 font-bold cursor-pointer mb-4" onClick={() => router.push('/reset-password')}>
        Back
      </p>
      <div className="flex-grow flex items-center justify-center">
        <div className="border border-[#666666] rounded-lg p-6 w-full max-w-md text-center">
              <div className="relative mb-6 flex items-center justify-center">
          <Star className="text-blue-500 w-16 h-16" />
          <Star className="text-blue-300 w-12 h-12 absolute top-4 left-4" />
        </div>
          
          <h2 className="text-xl pt-13 font-semibold mb-2">Password changed</h2>
          <p className="text-sm text-gray-600 mb-6">Your password has been successfully changed</p>

     

         

          {/* for the verify Button */}
          <Link
         href="/sign-in"
          className="inline-block mb-4 w-[50%] py-3 bg-blue-300 text-white rounded-lg hover:bg-blue-400 transition"
          >
            Back to sign in
          </Link>

  
        </div>
      </div>
    </div>
  );
}
