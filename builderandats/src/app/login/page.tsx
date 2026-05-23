"use client"
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Lock, Bot, Sparkles } from 'lucide-react';
import { useUser } from '@/Providers/userProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isloading, setIsLoading] = React.useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    if (password && email) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log("response from login api", data);

        if (res.ok) {
          toast.success("Login successful!", {
            duration: 1200,
            position: "top-right",
            style: {
              background: "#1e1e1e",
              color: "#fff",
              borderRadius: "10px",
              border: "1px solid #333",
            }
          })
          setUser(data);
          router.refresh();
          setTimeout(() => {
            router.push("/")
          }, 3000)
        } else {
          toast.error("Login failed", {
            duration: 1200,
            position: "top-right",
            style: {
              background: "#1e1e1e",
              color: "#fff",
              borderRadius: "10px",
              border: "1px solid #333",
            }
          })
          // console.log("login failed", data.error)
        }
      } catch (error) {
        // console.log("error in login", error);
      }
    }
    setIsLoading(false);
  }

  return (
    <>
      <Toaster position='top-right' />
      <div className="min-h-screen bg-[#020617] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[150px]" />
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-indigo-500/8 blur-[150px]" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 shadow-2xl shadow-indigo-500/10 flex items-center justify-center relative group overflow-hidden backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Bot className="w-8 h-8 text-indigo-400 relative z-10" />
              <Sparkles className="w-4 h-4 text-indigo-300 absolute top-3 right-3 animate-pulse" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Sign in to your account to access all features
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="glass-card py-8 px-4 shadow-2xl sm:px-10">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block outline-0 w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-600" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block outline-0 w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded cursor-pointer bg-white/5"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white btn-primary transition-all active:scale-[0.98]"
                >
                  Sign in to Dashboard
                  {isloading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
