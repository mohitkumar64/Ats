"use client"
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const footerNav = [
  {
    label: "Product",
    links: [
      { href: "/ats", label: "ATS Checker" },
      { href: "/resumeBuilder", label: "Resume Builder" },
    ],
  },
  {
    label: "Account",
    links: [
      { href: "/profile", label: "Profile" },
      { href: "/login", label: "Sign In" },
      { href: "/register", label: "Register" },
    ],
  },
];

const socialLinks = [
  { href: "https://github.com", icon: FaGithub, label: "GitHub" },
  { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: FaXTwitter, label: "X (Twitter)" },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 p-10"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "#060810",
      }}
    >
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              {/* Brand mark — matches Navbar */}
              <Image src="/logo.svg" alt="Logo" width={50} height={50} />
              <span
                className="text-[15px] font-bold tracking-tight"
                style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "#F0F2F5" }}
              >
                Builder<span style={{ color: "#E8754A", margin: "0 0.1em" }}>&</span>ATS
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#48556A" }}>
              AI-powered tools to help you beat Applicant Tracking Systems and
              land more interviews — built for engineers, by engineers.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    aria-label={social.label}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#48556A",
                      transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(255,255,255,0.08)";
                      el.style.color = "#F0F2F5";
                      el.style.borderColor = "rgba(255,255,255,0.15)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "rgba(255,255,255,0.04)";
                      el.style.color = "#48556A";
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((group) => (
            <div key={group.label}>
              <h5
                className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-5"
                style={{
                  color: "#48556A",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {group.label}
              </h5>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm group inline-flex items-center gap-1.5"
                      style={{
                        color: "#7A8499",
                        transition: "color 150ms cubic-bezier(0.23,1,0.32,1)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F0F2F5"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#7A8499"; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            className="text-[11px]"
            style={{ color: "#48556A", fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2026 Builder&ATS · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px]"
                style={{
                  color: "#48556A",
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#7A8499"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#48556A"; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
