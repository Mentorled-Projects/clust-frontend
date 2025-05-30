

 "use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, CheckCircle,  XCircle } from 'lucide-react'

export default function ResetPassword() {
  const router = useRouter()
  const [email] = useState('Example@gmail.com') 
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  

  const isPasswordValid = password.length >= 8
  const doPasswordsMatch = password === confirmPassword

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isPasswordValid || !doPasswordsMatch) return

    try {
      
      const response = await fetch('http://188.166.174.141:8000/api/v1/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error('Failed to reset password')

      router.push('/verify-email')
    } catch (error) {
      alert('An error occurred: ' + error.message)
    }
  }

    function handleContinue(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error('Function not implemented.')
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="absolute underline underline-offset-1 top-4 left-4 cursor-pointer text-blue-600" onClick={() => router.push('/sign-in')}>
        <p>Back</p>
      </div>

      <div className="w-full max-w-md border py-15 px-8  rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-2">Reset password</h2>
        <p className="mb-6">Changing your password for: <strong>{email}</strong></p>

        <form onSubmit={handleSubmit} className="space-y-6">
 
          {/* for the new Password */}   
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
         
                           <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-9">
                             {showConfirmPassword ? <EyeOff size={16}/> : <Eye size={18} />}
                           </button>
                           {!doPasswordsMatch && confirmPassword.length > 0 && (
                             <p className="text-red-500 mt-2">Passwords do not match</p>
                           )}
                    </div>

          {/* for the very submit Button */}
          <button
           onClick={handleContinue}
           className={`w-full py-2 text-xs rounded mb-2 text-white ${password || confirmPassword  ? 'bg-[#0794E2]' : 'bg-[#E6E5E5]'}`}>
           Verify
           </button>
        </form>

          {/**sign in link */}
          <p className="text-center text-xs text-gray-600 mb-6">
                       Don't have an account?{' '}
                       <a href="/signin" className="text-[#0794E2] font-medium">
                       Sign up
                       </a>
                      </p>
      </div>
    </div>
  )
}  
