import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UserProvider from "@/Providers/userProvider";
import Footer from "@/components/Footer";
import { getCurrentUser } from "../../Lib/auth";


const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Builder & ATS | AI-Powered Resume Builder & ATS Checker",
  description:
    "Stop guessing. Beat Applicant Tracking Systems with AI-driven resume analysis and a live ATS-optimized builder. Get 90%+ match rates.",
  keywords: "resume builder, ATS checker, AI resume, professional resume, job application, ATS score",
  icons: {
    icon: "/logo.svg"
  }
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
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080A0F] text-[#F0F2F5]">
        <UserProvider user={user}>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}
