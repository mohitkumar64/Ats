import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import UserProvider from "@/Providers/userProvider";
import { getCurrentUser } from "../../Lib/auth";


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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user =  await getCurrentUser();
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
