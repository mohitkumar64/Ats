"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Lock, BrainCircuit, Sparkles, TerminalSquare } from 'lucide-react';
import toast , {Toaster} from 'react-hot-toast';
import { set } from 'mongoose';
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter()
 
  const handleRegister = async () =>{
    if(password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      const res = await fetch('/api/register' , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });
      
      if(res.ok){
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(()=>{
          router.push('/login')
        } , 3000)
        setEmail('');
        setPassword('');
        
      }else{
        console.log("error")
        toast.error('An error occurred while registering');
      }
    } catch (error) {
      console.log('Registration error:', error);
      toast.error('An error occurred while registering');
    }
  };

  return (
  <>
   <Toaster position='top-right' />
  <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
   
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[120px]" />
        <div className="absolute top-[30%] left-[-10%] w-[30%] h-[40%] rounded-full bg-purple-400/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]" />
        
        {/* Subtle grid pattern */}
        {/* <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" /> */}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <BrainCircuit className="w-8 h-8 text-indigo-600 relative z-10" />
            <Sparkles className="w-4 h-4 text-indigo-400 absolute top-3 right-3 animate-pulse" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Create a new acocunt and build and check your resume 
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-120 relative z-10">
        <div className="bg-white/70 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-indigo-500/5 border border-white/50 sm:rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={(e)=>{
            e.preventDefault();
            handleRegister()
          }}>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                 Email address
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block  outline-0 w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 backdrop-blur-sm transition-all text-sm placeholder:text-slate-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                 Password
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block  outline-0 w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 backdrop-blur-sm transition-all text-sm placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">Must be at least 8 characters, with special chars.</p>
            </div>

            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
                />
              </div>
              <div className="ml-2 text-sm">
                <label htmlFor="terms" className="font-medium text-slate-700 cursor-pointer">
                  I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type='submit'
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98]"
               
              >
                Create Account
                <TerminalSquare className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Already have a workspace?{' '}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
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
