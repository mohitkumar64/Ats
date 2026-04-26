import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Builder and ATS",
  description: "Generate ATS-friendly resumes with Builder and ATS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
          <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <div className="text-xl font-semibold tracking-tight text-foreground">
                Builder<span className="text-primary">&</span>ATS
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="/resumeBuilder"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Resume Builder
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
