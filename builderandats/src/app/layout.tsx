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
      <body className="min-h-full flex flex-col">
        <div>
          <nav className="bg-gray-800 text-white p-4">
            <div className=" w-full mx-4 flex items-center justify-between">
              <div className="text-lg font-bold">Builder and ATS</div>
              <div className="">
                <Link href="/" className="px-3 py-2 hover:bg-gray-700 rounded">
                  Home
                </Link>
                <Link
                  href="/resumeBuilder"
                  className="px-3 py-2 hover:bg-gray-700 rounded"
                >
                  Resume Builder
                </Link>
              </div>
            </div>
          </nav>
        </div>
        {children}
        </body>
    </html>
  );
}
