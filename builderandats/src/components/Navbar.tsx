"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../Providers/userProvider";
import {
  Home,
  FileText,
  ScanSearch,
  User,
  LogIn,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home, requiresAuth: false },
  { href: "/resumeBuilder", label: "Resume Builder", icon: FileText, requiresAuth: true },
  { href: "/ats", label: "ATS Checker", icon: ScanSearch, requiresAuth: true },
  { href: "/profile", label: "Profile", icon: User, requiresAuth: false },
];

const Navbar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        setUser(null);
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout trace sequence error:", err);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-[#020617]/85 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/40"
          : "bg-[#020617]/40 backdrop-blur-md border-b border-white/[0.03]"
      }`}
    >
      {/* CHANGED: Added grid layout framework globally on desktop.
        This completely stops center elements from collapsing or sliding into text boundaries.
      */}
      <nav className="max-w-7xl mx-auto px-6 h-16 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-4">
        
        {/* LOGO ENGINE HEADER */}
        <div
          className="flex items-center gap-3 cursor-pointer group justify-self-start shrink-0"
          onClick={() => router.push("/")}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105">
            B
          </div>
          <span className="text-lg font-bold tracking-tight text-white select-none whitespace-nowrap">
            Builder
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent px-0.5">&</span>
            ATS
          </span>
        </div>

        {/* CHANGED: Middle segment links now use layout grid auto-spacing. 
          The 'mx-auto' keeps links strictly centered between logo and auth, never allowing them to squish.
        */}
        <div className="hidden md:flex items-center justify-center mx-auto gap-2 lg:gap-4 w-full max-w-2xl px-4">
          {navLinks.map((link) => {
            if (link.requiresAuth && !user) return null;
            
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 group whitespace-nowrap ${
                  isActive
                    ? "text-white bg-white/[0.08] border border-white/5"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[-1px] left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT UTILITY BLOCK CONTROL */}
        <div className="hidden md:flex items-center gap-3 justify-self-end shrink-0">
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-amber-400 border border-amber-400/20 bg-amber-400/5 hover:bg-amber-400/10 hover:border-amber-400/40 transition-all duration-300 whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}

          {!user ? (
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/15 hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-indigo-400/20 whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer text-slate-400 border border-white/5 bg-white/[0.02] hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 transition-all duration-300 active:scale-95 whitespace-nowrap"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU CONTROL TOGGLE INDICATOR TRIGGER */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 justify-self-end"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5 animate-in spin-in-12" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* MOBILE EXPANSION LAYER PANEL */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[440px] border-t border-slate-800/40 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 space-y-1.5 bg-[#020617]/95 backdrop-blur-2xl">
          {navLinks.map((link) => {
            if (link.requiresAuth && !user) return null;
            
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white bg-white/[0.06] border border-white/5"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-amber-400 hover:bg-amber-400/5 transition-all duration-300"
            >
              <Shield className="w-4 h-4" />
              Admin Console Control
            </Link>
          )}

          <div className="pt-4 mt-2 border-t border-white/[0.04]">
            {!user ? (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl border border-indigo-500/20"
              >
                <LogIn className="w-4 h-4" />
                Login to Platform
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold cursor-pointer text-rose-400 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                End Active Session
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;