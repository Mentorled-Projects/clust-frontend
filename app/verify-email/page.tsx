
'use client'

import {  useState } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'
import axios from "axios"

const baseURL = "http://188.166.174.141:8000/api/v1/auth/verify-email"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(Array(5).fill(''))
  const [activeIndex, setActiveIndex] = useState(0)
  const [email] = useState('jumiandana@gmail.com') 
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp]
      newOtp[index] = val
      setOtp(newOtp)
      if (val && index < 4) setActiveIndex(index + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveIndex(index - 1)
    }
  }

  const handleVerify = async () => {
    const token = otp.join('')
    try {
      const res = await axios.post(baseURL, { token }) // the token i sent to the backend
      if (res.data.message === "Email verified successfully") {
        setMessage("✅ Email verified successfully")
        setError("")
        
      } else {
        setError("⚠️ " + res.data.message)
        setMessage("")
      }
    } catch (err: any) {
      setError("⚠️ Verification failed. Please try again.")
      setMessage("")
      console.error("Verification error:", err)
    }
  }

  return (
    <div className="flex h-screen">
      {/* for the image Side */}
      <div
        className="w-[45%] h-full relative bg-cover bg-center flex flex-col justify-center items-center p-12"
        style={{ backgroundImage: "url('/image/GENTL AND HYERS PHOTOGRAPHY _ DRINKS _ 45 (1).webp')" }}
      >
        <div className="absolute bottom-[20px] inset-x-0 bg-gradient-to-t flex justify-center from-black/100 to-transparent">
          <h1 className="text-center text-white text-2xl font-bold max-w-sm">
            Plan small gatherings, big moments, and everything in between.
          </h1>
        </div>
      </div>

      <p className='underline underline-offset-1 text-blue-600 cursor-pointer text-sm font-semibold px-12 py-12' onClick={() => router.push('/signup')}>
        Back
      </p>

      <div className="min-h-screen flex flex-col px-6 py-30">
        <div className='mt-2'>
          <h1 className='text-2xl font-bold mb-2'>Verify your email address</h1>
          <p className="mb-14 font-thin text-xs text-gray-700 w-[380px]">
            {'We\'ve sent an OTP with an activation code to your email'} <span className="font-thin">{email}</span>
          </p>

          <div className='flex gap-4 justify-start mb-5'>
            {otp.map((digit, index) => (
              <input
                key={index}
                type='text'
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-15 h-15 text-center rounded-xl border outline-none text-xl font-semibold transition-colors ${
                  digit ? 'border-[#98D9FC]' : 'border-[#D8DADC]'
                }`
              
              }
                autoFocus={index === activeIndex}

                
              />
            ))}
          </div>

          <div className="max-w-md flex justify-around items-center mb-6">
            <label className="flex items-center space-x-2">
              <div className="flex items-center font-thin text-xs">
                <span>
                  {'I didn\'t receive a code'}{' '}
                  <a href="/forgot-password" className="text-blue-600 font-thin text-xs">
                    Resend
                  </a>
                </span>
              </div>
            </label>
          </div>

          {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <button
            disabled={otp.some((d) => d === '')}
            onClick={handleVerify}
            className={`w-[97%] py-3 text-white rounded ${
              otp.some((d) => d === '') ? 'bg-[#E0E0E0]' : 'bg-[#0794E2]'
            }`}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}


























// 'use client'

// import {  useState } from 'react'
// import { useRouter } from 'next/navigation'
// import React from 'react'
// import axios from "react";

// {/**I need corrections on this page */}

// const baseURL = "http://188.166.174.141:8000/api/v1/auth/verify-email"

// export default function Page() {
//   const router = useRouter()
//   const [otp, setOtp] = useState(Array(5).fill(''))
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [email] = useState('jumiandana@gmail.com') 
//   const [post, setPost] = React.useState(null);

//   // React.useEffect(() => {
//   //   axios.get(baseURL).then((response) => {
//   //     setPost(response.data);
//   //   });
//   // }, [])

//   // if(!post) return null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const val = e.target.value
//     if (/^[0-9]?$/.test(val)) {
//       const newOtp = [...otp]
//       newOtp[index] = val
//       setOtp(newOtp)
//       if (val && index < 4) setActiveIndex(index + 1)
//     }
//   }

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       setActiveIndex(index - 1)
//     }
//   }

//   return(
//     <div className="flex h-screen">
//       {/* for the image Side */}
//       <div className="w-[45%] h-full relative bg-cover bg-center  flex flex-col justify-center items-center p-12"
//       style={{backgroundImage: "url('/image/GENTL AND HYERS PHOTOGRAPHY _ DRINKS _ 45 (1).webp"}}>
//         <div className="absolute bottom-[20px] inset-x-0 bg-gradient-to-t flex justify-center from-black/100 to-transparent">
//         <h1 className="   text-center text-white text-2xl font-bold  max-w-sm">
//             Plan small gatherings, big moments, and everything in between.
//         </h1>
//         </div>
//         </div>
//         <p className='underline underline-offset-1 text-blue-600 cursor-pointer text-sm font-semibold px-12 py-12' onClick={() => router.push('/signup')}>Back</p>

//         <div className="min-h-screen flex flex-col  px-6 py-30 ">   
//              <div className='mt-2'>
//                  <h1 className='text-2xl  font-bold mb-2'>Verify your email address</h1>
//                  <p className="mb-14 font-thin text-xs text-gray-700 w-[380px] ">
//           {/* We've sent an OTP with an activation code to your email <span className="font-thin">{email}</span> */}
//         </p>
//              <div className='flex gap-4 justify-start mb-5'>
//                    {otp.map((digit, index) => (
//                     <input 
//                     key={index}
//                     type='text'
//                     maxLength={1}
//                     value={digit}
//                     onChange={(e) => handleChange(e, index)}
//                     onKeyDown={(e) => handleKeyDown(e, index)}
//                     className={`w-15 h-15 text-center rounded-xl border outline-none text-xl font-semibold transition-colors ${
//                 digit ? 'border-[#98D9FC]' : 'border-[#D8DADC]'
//               }`}
//               autoFocus={index === activeIndex}
//                     />
//                    ))}
//              </div>


//              <div className=" max-w-md flex justify-around items-center mb-6">
//           <label className="flex items-center space-x-2">
//             <div className="flex items-center  font-thin text-xs">
              
//               <span>I didn't receive a code { '  ' }

//               <a href="/forgot-password" className="  text-blue-600 font-thin text-xs">
//                 Resend
//             </a>
//               </span>
//             </div>
//           </label>
          
//         </div>

//         <button
//           disabled={otp.some((d) => d === '')}
//           className={`w-[97%] py-3 text-white rounded ${
//             otp.some((d) => d === '') ? 'bg-[#E0E0E0]' : 'bg-[#0794E2]'
//           }`}
//         >
//           Create Account
//         </button>
                      
                      

//              </div>
        
//         </div>
//       </div>

     
       


//   )
// }




