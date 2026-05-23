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
  { href: "/", label: "Home", icon: Home },
  { href: "/resumeBuilder", label: "Resume Builder", icon: FileText, requiresAuth: true },
  { href: "/ats", label: "ATS Checker", icon: ScanSearch, requiresAuth: true },
  { href: "/profile", label: "Profile", icon: User },
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
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      setUser(null);
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled
        ? "bg-[#020617]/90 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/20"
        : "bg-[#020617]/60 backdrop-blur-xl border-b border-white/5"
        }`}
    >
      <nav className="w-full px-4 md:px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300 group-hover:scale-105">
            B
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Builder
            <span className="gradient-text">&</span>
            ATS
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {link.requiresAuth && !user && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth + Admin */}
        <div className="hidden lg:flex items-center gap-3">
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 border border-amber-400/20 bg-amber-400/5 hover:bg-amber-400/10 transition-all duration-300"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}

          {!user ? (
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium cursor-pointer text-gray-400 border border-white/10 bg-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-400/20 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-6 py-4 space-y-1 border-t border-white/5 bg-[#020617]/95 backdrop-blur-2xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                  ? "text-white bg-white/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {link.requiresAuth && !user && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-auto" />
                )}
              </Link>
            );
          })}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-amber-400 hover:bg-amber-400/5 transition-all duration-300"
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </Link>
          )}

          <div className="pt-3 border-t border-white/5">
            {!user ? (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium cursor-pointer text-red-400 border border-red-400/20 bg-red-500/5 hover:bg-red-500/10 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;