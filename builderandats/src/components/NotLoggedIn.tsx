"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import animationData from "../../public/lottie/WarningStatus.json";
import { ArrowRight } from 'lucide-react';

const NotLoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    toast.error("Redirecting to login page...", {
      duration: 1200,
      position: "top-right",
      style: {
        background: "var(--surface)",
        color: "#F0F2F5",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.08)",
        fontSize: "14px",
      }
    });
    setTimeout(() => {
      router.push("/login");
    }, 3000)
  }, [])

  return (
    <div className='page-ambient flex flex-col items-center justify-center'>
      <Toaster />
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-60 h-60"
      />
      <h1
        className='text-2xl font-extrabold tracking-wider uppercase mb-4'
        style={{
          fontFamily: "'Syne', system-ui, sans-serif",
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        You are not logged in
      </h1>
      <p className='text-sm mb-6' style={{ color: "var(--text-secondary)" }}>
        Please sign in to access this page.
      </p>
      <button
        onClick={() => router.push("/login")}
        className="btn-primary px-6 py-3 text-sm"
      >
        Go to Login
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default NotLoggedIn