"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import animationData from "../../public/lottie/WarningStatus.json";
const NotLoggedIn = () => {
  const router = useRouter();
  useEffect(() => {
    toast.error("Redirecting to login page...", {
      duration: 1200,
      position: "top-right",
      style: {
        background: "#1e1e1e",
        color: "#fff",
        borderRadius: "10px",
        border: "1px solid #333",
      }
    });
    setTimeout(() => {
      router.push("/login");
    }, 1500)
  }, [])
  return (
    <div className='h-screen w-full flex flex-col  items-center justify-center '>
      <Toaster />
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-150 h-150"
      />
      <h1 className='text-3xl font-extrabold tracking-wider uppercase  text-white'>You are not logged in !!</h1>
    </div>
  )
}

export default NotLoggedIn