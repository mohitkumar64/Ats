"use client"
import React, {  useEffect } from 'react'
import { useRouter } from 'next/navigation';
import  toast , {Toaster} from 'react-hot-toast';

const NotLoggedIn = () => {
    const router = useRouter();
    useEffect(() => {
        toast.error("Redirecting to login page...");
        setTimeout(() => {
            router.push("/login");
        }, 1000)
    }, [])
  return (
    <div className='h-full w-full flex items-center justify-center '>
        <Toaster />
        <h1 className='text-2xl font-bold text-blue-400'>You are not logged in</h1>
    </div>
  )
}

export default NotLoggedIn