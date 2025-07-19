
"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";


//Our Home Page is supposed to be here
export default function Home() {
  const router = useRouter()
  return (
<div className="flex items-center justify-center h-screen">
  <button
    className="flex border text-center justify-center px-4 py-2"
    onClick={() => router.push("./signup")}
  >
    Signup
  </button>
</div>
  );
}
