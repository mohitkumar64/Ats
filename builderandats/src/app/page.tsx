// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] w-full bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center text-center max-w-3xl px-4">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
          ✨ The Ultimate Resume Builder
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
          Build Your <span className="text-primary">Perfect Resume</span> in Minutes
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl">
          Stand out from the crowd with ATS-friendly, professionally designed templates. Start building your career today.
        </p>
        <Link 
          href="/resumeBuilder"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-white shadow-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          Go to Resume Builder
        </Link>
      </div>
    </div>
  );
}
