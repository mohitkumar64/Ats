"use client"
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useUser } from '@/Providers/userProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
              background: "var(--surface)",
              color: "#F0F2F5",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "14px",
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
              background: "var(--surface)",
              color: "#F0F2F5",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "14px",
            }
          })
        }
      } catch (error) {
        toast.error("An error occurred during login", {
          duration: 1200,
          position: "top-right",
          style: {
            background: "var(--surface)",
            color: "#F0F2F5",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: "14px",
          }
        })
      }
    }
    setIsLoading(false);
  }

  return (
    <>
      <Toaster position='top-right' />
      <div className="page-ambient flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "rgba(232,117,74,0.06)",
                border: "1px solid rgba(232,117,74,0.15)",
              }}
            >
              <Image src="/logo.svg" alt="Builder&ATS Logo" width={44} height={44} className="relative z-10" />
            </div>
          </div>
          <h2
            className="mt-6 text-center text-3xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "var(--text-primary)" }}
          >
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            Sign in to your account to access all features
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="glass-card py-8 px-6 sm:px-10">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  Email address
                </label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4" style={{ color: "var(--text-tertiary)" }} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  Password
                </label>
                <div className="mt-1.5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4" style={{ color: "var(--text-tertiary)" }} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
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
                    className="h-4 w-4 rounded cursor-pointer accent-[#E8754A]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.12)",
                    }}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium"
                    style={{ color: "var(--accent)", transition: "opacity 150ms ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isloading}
                  className="w-full btn-primary py-3 px-4 text-sm"
                >
                  Sign in to Dashboard
                  {isloading ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="font-semibold"
                  style={{ color: "var(--accent)", transition: "opacity 150ms ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
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
