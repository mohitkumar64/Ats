"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../Providers/userProvider";
import {
  ScanSearch,
  FileText,
  User,
  LogIn,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import Image from "next/image";

const navLinks = [
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
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      setUser(null);
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          transition: `background ${250}ms cubic-bezier(0.23, 1, 0.32, 1), border-color ${250}ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow ${250}ms cubic-bezier(0.23, 1, 0.32, 1)`,
          background: isScrolled
            ? "rgba(8, 10, 15, 0.92)"
            : "rgba(8, 10, 15, 0.60)",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isScrolled ? "0 1px 40px rgba(0,0,0,0.40)" : "none",
        }}
      >
        <nav className="max-w-[1280px] mx-auto px-6 md:px-10 h-[60px] flex items-center justify-between">

          {/* ── Logo ── */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Builder & ATS home"
          >
            {/* Geometric brand mark */}
            <div
              className="relative w-8 h-8 flex items-center justify-center flex-shrink-0"
              style={{
                transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <Image src="/logo.svg" alt="Logo" width={50} height={50} />
            </div>

            <span
              className="text-[15px] font-bold tracking-tight text-[#F0F2F5] leading-none"
              style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
            >
              Builder
              <span style={{ color: "var(--accent)", margin: "0 0.1em" }}>&</span>
              ATS
            </span>
          </button>

          {/* ── Desktop Nav links ── */}
          <div className="hidden  md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex gap-2 px-4 py-2 text-sm font-medium rounded-lg group"
                  style={{
                    color: isActive ? "#F0F2F5" : "#7A8499",
                    transition: "color 200ms cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#F0F2F5";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#7A8499";
                  }}
                >
                  <link.icon className="w-5 h-5 " />
                  <span className="relative z-10">{link.label}</span>

                  {/* Hover background */}
                  <span
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      transition: "opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  />

                  {/* Active indicator — animated underline */}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 h-0.5 rounded-full"
                      style={{
                        width: "1.5rem",
                        background: "var(--accent)",
                        transform: "translateX(-50%)",
                        boxShadow: "0 0 8px rgba(232,117,74,0.6)",
                      }}
                    />
                  )}

                  {/* Requires auth dot */}
                  {link.requiresAuth && !user && (
                    <span
                      className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full"
                      style={{ background: "#E8754A", boxShadow: "0 0 4px rgba(232,117,74,0.8)" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop Auth Actions ── */}
          <div className="hidden md:flex items-center gap-2.5">
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  color: "#F59E0B",
                  border: "1px solid rgba(245,158,11,0.20)",
                  background: "rgba(245,158,11,0.06)",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.04em",
                  transition: "background 200ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.12)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.06)"; }}
              >
                <Shield className="w-3.5 h-3.5" />
                ADMIN
              </Link>
            )}

            {!user ? (
              <Link
                href="/login"
                className="btn btn-accent text-sm"
                style={{ padding: "0.5rem 1.25rem" }}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className=" flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                style={{
                  color: "#7A8499",
                  border: "1px solid rgba(255,255,255,0.08)",
                  
                  transition: "all 200ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(239,68,68,0.08)";
                  el.style.color = "#F87171";
                  el.style.borderColor = "rgba(239,68,68,0.20)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = "#7A8499";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
            style={{
              color: "#7A8499",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 200ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#F0F2F5";
              el.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "#7A8499";
              el.style.background = "transparent";
            }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* ── Mobile menu overlay ── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          background: "rgba(8,10,15,0.70)",
          backdropFilter: "blur(4px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 300ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Panel */}
      <div
        className="fixed top-[60px] left-0 right-0 z-40 md:hidden overflow-hidden"
        style={{
          background: "rgba(14, 17, 23, 0.98)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          maxHeight: mobileOpen ? "420px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transition: "max-height 400ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="px-6 py-5 space-y-1">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
                style={{
                  color: isActive ? "#F0F2F5" : "#7A8499",
                  background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  transition: "all 200ms cubic-bezier(0.23, 1, 0.32, 1)",
                  animationDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                }}
              >
                <Icon className="w-4 h-4" />
                {link.label}
                {link.requiresAuth && !user && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                )}
              </Link>
            );
          })}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
              style={{ color: "#F59E0B" }}
            >
              <Shield className="w-4 h-4" />
              Admin Panel
            </Link>
          )}

          <div className="pt-4 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {!user ? (
              <Link
                href="/login"
                className="btn btn-accent w-full text-sm justify-center"
                style={{ padding: "0.8125rem" }}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium cursor-pointer"
                style={{
                  color: "#F87171",
                  border: "1px solid rgba(239,68,68,0.15)",
                  background: "rgba(239,68,68,0.06)",
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;