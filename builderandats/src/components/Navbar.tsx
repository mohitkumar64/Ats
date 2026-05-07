"use client";

import React from 'react'
import Link from 'next/link'
import { useUser } from '../Providers/userProvider'
import { useRouter } from 'next/navigation'
import {  LockIcon} from 'lucide-react';

const Navbar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/logout' , {
      method : "POST" 
    })

    if(res.ok){
    setUser(null);
    router.push('/login');
    router.refresh();
  }}

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
          <nav className="w-full  px-10 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer "  onClick={()=>{
              router.push('/')
            }}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <div className="text-xl font-semibold tracking-tight text-foreground">
                Builder<span className="text-primary">&</span>ATS
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="text-foreground/80  hover:text-white p-2 rounded-lg hover:bg-gray-500 transition-colors">
                Home
              </Link>
              <Link
                href="/resumeBuilder"
                className="text-foreground/80 flex  text-md items-center gap-2 hover:text-white p-2 rounded-lg hover:bg-gray-500 transition-colors"
               

              > {!user && <LockIcon width={18}  />}
                Resume Builder
                
              </Link>
              <Link
                href="/ats"
                className=" flex items-center gap-2  text-foreground/80 hover:text-white p-2 rounded-lg hover:bg-gray-500   transition-colors"
              >
                {!user && <LockIcon width={18}  />}
                Ats Checker
              </Link>
              
              {!user ? (
                <Link
                  href="/login"
                  className="  border border-primary hover:bg-primary/90 hover:text-white      text-primary px-4 py-2 rounded-lg  transition-colors shadow-sm"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-primary cursor-pointer text-white hover:bg-primary/80 text-destructive-foreground px-4 py-2 rounded-lg hover:bg-destructive/90 transition-colors shadow-sm"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </header>
  )
}

export default Navbar