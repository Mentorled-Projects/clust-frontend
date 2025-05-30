

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(20);

  {/** for the countdown logic*/}
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  {/**for the input change handler */} 
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; {/** Only digits are  allowed here */} 
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

   { /** auto focus the next box */}
    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const isTyping = code.some((char) => char !== '');

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {/* for the back link */}
      <p className="text-sm text-blue-600 underline underline-offset-1 font-bold cursor-pointer mb-4" onClick={() => router.push('/sign-in')}>
        Back
      </p>
      <div className="flex-grow flex items-center justify-center">
        <div className="border border-[#666666] rounded-lg p-6 w-full max-w-md text-center">
          <h2 className="text-xl pt-13 font-semibold mb-2">Please check your email</h2>
          <p className="text-sm text-gray-600 mb-6">We have sent a code to <strong>Example@gmail.com</strong></p>

          {/* the boxes */}
          <div className="flex justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className={`w-15 h-15 text-center rounded-xl border font-semibold text-xl outline-none transition-colors ${
                  digit ? 'border-[#98D9FC]' : 'border-[#D8DADC]'
                }`}
              />
            ))}
          </div>

          {/* for the timer */}
          <p className="text-sm text-gray-500 mb-6">
            Send code again <span className="font-semibold">{`00:${timer.toString().padStart(2, '0')}`}</span>
          </p>

          {/* for the verify Button */}
          <button
            className={`w-full py-2 rounded-md font-medium text-white transition-colors ${
              isTyping ? 'bg-[#0794E2]' : 'bg-[#E0E0E0]'
            }`}
          >
            Verify
          </button>

          {/* for the sign up link */}
          <p className="text-sm text-gray-600 mt-4 mb-">
            Don’t have an account?{' '}
            <span
              className="text-[#0794E2] cursor-pointer"
              onClick={() => router.push('/sign-up')}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}