import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UserProvider from "@/Providers/userProvider";
import { getCurrentUser } from "../../Lib/auth";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Builder & ATS | AI-Powered Resume Builder & ATS Checker",
  description:
    "Create stunning, ATS-optimized resumes with AI-powered analysis. Get instant ATS scores, smart suggestions, and professional templates. Build your dream resume in minutes.",
  keywords: "resume builder, ATS checker, AI resume, professional resume, job application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <UserProvider user={user}>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
