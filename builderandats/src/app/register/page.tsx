"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RegisterPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const toastStyle = {
    background: "var(--surface)",
    color: "#F0F2F5",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: "14px",
  };

  const handleRegister = async () => {
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long', { style: toastStyle });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        toast.success('Registration successful! Redirecting to login...', { style: toastStyle });
        setTimeout(() => {
          router.push('/login')
        }, 3000)
        setEmail('');
        setPassword('');
      } else {
        console.log("error")
        toast.error('An error occurred while registering', {
          duration: 1200,
          position: "top-right",
          style: toastStyle,
        });
      }
    } catch (error) {
      console.log('Registration error:', error);
      toast.error('An error occurred while registering', {
        duration: 1200,
        position: "top-right",
        style: toastStyle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position='top-right' />
      <div className="page-ambient flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "rgba(78,204,163,0.06)",
                border: "1px solid rgba(78,204,163,0.15)",
              }}
            >
              <Image src="/logo.svg" alt="Builder&ATS Logo" width={44} height={44} className="relative z-10" />
            </div>
          </div>
          <h2
            className="mt-6 text-center text-3xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "var(--text-primary)" }}
          >
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            Create a new account and build your professional resume
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="glass-card py-8 px-6 sm:px-10">
            <form className="space-y-5" onSubmit={(e) => {
              e.preventDefault();
              handleRegister()
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                    placeholder="you@example.com"
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
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>Must be at least 8 characters.</p>
              </div>

              <div className="flex items-start mt-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded cursor-pointer accent-[#E8754A]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.12)",
                    }}
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="terms" className="font-medium cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                    I agree to the{' '}
                    <a
                      href="#"
                      style={{ color: "var(--accent)", transition: "opacity 150ms ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                    >Terms of Service</a>
                    {' '}and{' '}
                    <a
                      href="#"
                      style={{ color: "var(--accent)", transition: "opacity 150ms ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                    >Privacy Policy</a>.
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type='submit'
                  disabled={isLoading}
                  className="w-full btn-primary py-3 px-4 text-sm"
                >
                  Create Account
                  {isLoading ? (
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
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold"
                  style={{ color: "var(--accent)", transition: "opacity 150ms ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
