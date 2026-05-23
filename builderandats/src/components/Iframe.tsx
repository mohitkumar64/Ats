"use client"
import React, { useEffect, useRef, useState } from "react";
import Handlebars from "handlebars";

const IframeRender = ({ data, Stringhtml }: { data: any; Stringhtml: string }) => {
  const [html, setHtml] = useState("");
  const [template, setTemplate] = useState<HandlebarsTemplateDelegate | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!Stringhtml) return;
    try {
      const temp = Handlebars.compile(Stringhtml);
      setTemplate(() => temp);
    } catch (err) {
      console.error("Handlebars compile error:", err);
    }
  }, [Stringhtml]);

  useEffect(() => {
    if (!template) return;
    const data1 = {
      name: data.name || "John Doe",
      email: data.email || "john.doe@example.com",
      summary: data.summary || "Experienced professional with a passion for building great products.",
      experience: data.experience?.length
        ? data.experience
        : [{ role: "Frontend Developer", company: "Tech Corp", duration: "2023 - Present", description: "Built scalable UI components." }],
      projects: data.projects || [],
      skills: data.skills || "JavaScript, React, Tailwind CSS",
    };

    const timer = setTimeout(() => {
      try {
        const rendered = template(data1);
        setHtml(rendered);
      } catch (err) {
        console.error("Handlebars render error:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [data, template]);

  const handleGeneratePdf = async () => {
    setIsDownloading(true);
    try {
      const req = await fetch("/api/genratePdf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ html }),
      });
      if (req.ok) {
        const blob = await req.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.name ? data.name.replace(/\s+/g, "_") : "resume"}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    // ✅ FIX: Use inline style container-type instead of @container Tailwind class
    //    so the iframe scale transform (100cqw) works correctly.
    <div
      ref={containerRef}
      className="w-full h-full relative bg-white rounded"
      style={{ containerType: "inline-size" }}
    >
      {/* Floating Download Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleGeneratePdf}
          disabled={isDownloading}
          className="flex items-center gap-2.5 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full shadow-2xl hover:bg-primary/90 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      <div className="w-full h-full relative overflow-hidden rounded">
        {html ? (
          <iframe
            srcDoc={html + "<style>::-webkit-scrollbar { display: none; } body { -ms-overflow-style: none; scrollbar-width: none; }</style>"}
            title="Resume Preview"
            className="absolute top-0 left-0 border-0 bg-white"
            style={{
              width: "794px",
              height: "1123px",
              transformOrigin: "top left",
              transform: "scale(calc(100cqw / 794))",
            }}
            sandbox="allow-same-origin allow-scripts"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 text-gray-400">
            {Stringhtml ? (
              <>
                <svg className="animate-spin h-8 w-8 text-primary/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-sm font-medium">Rendering preview…</span>
              </>
            ) : (
              <>
                <svg className="animate-spin h-8 w-8 text-primary/40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-sm font-medium">Loading template…</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IframeRender;