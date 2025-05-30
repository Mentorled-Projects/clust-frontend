

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
{/**import { sendPasswordResetEmail } from '@/lib/api';*/}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await sendPasswordResetEmail(email);
      setMessage('If the email exists, a reset link has been sent.');
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="absolute font-semibold underline underline-offset-1 px-15 py-6 top-4 left-4 text-sm text-blue-600 cursor-pointer" onClick={() => router.push('/signin')}>
         Back
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border-[#666666] rounded-2xl p-12 shadow-sm space-y-4"
      >
        <h2 className="text-lg mt-6  font-bold">Forgot password?</h2>
        <p className="text-gray-600 w-[95%] text-xs ">
          Don't worry! It happens. Please enter the email associated with your account.
        </p>

        <div>
          <h3 className=" text-sm mb-2 font-medium">Email</h3>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required
            className={`w-full p-2 text-sm rounded-lg border transition-colors duration-300
              ${
                focused || email
                  ? 'border-[#2F2B36] '
                  : 'border-[#EDEDF3]'
              }
              hover:border-[#0794E2] focus:outline-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0794E2] text-xs text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          {loading ? 'Sending...' : 'Reset password'}
        </button>

        {message && <p className="text-sm text-center text-gray-600">{message}</p>}

        <p className="text-xs mb-5 text-center text-gray-600">
          Remember password?{' '}
          <span
            onClick={() => router.push('/signin')}
            className="text-[#0794E2] text-xs cursor-pointer"
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}

function sendPasswordResetEmail(email: string) {
    throw new Error('Function not implemented.');
}
