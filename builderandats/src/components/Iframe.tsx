"use client"
import React, { useEffect, useState } from "react";
import Handlebars from "handlebars";

const IframeRender = ({ data , id }: { data: any , id : string}) => {
  const [html, setHtml] = useState("");
  const [template, setTemplate] = useState<HandlebarsTemplateDelegate | null>(null)
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    async function loadTemplate() {
      const res = await fetch("/resume.html");
      const templateString = await res.text();
      const temp = Handlebars.compile(templateString);
      setTemplate(() => temp);
    }
    loadTemplate();
  }, []);

  useEffect(() => {
    if (!template) return;
    const data1 = {
      name: data.name || "John Doe",
      email: data.email || "john.doe@example.com",
      summary: data.summary || "Experienced professional...",
      experience: data.experience || [
        {
          role: "Frontend Developer",
          company: "Tech Corp",
          duration: "2023 - Present",
          description: "Built scalable UI components."
        }
      ],
      projects: data.projects || [],
      skills: data.skills || "JavaScript, React, Tailwind CSS"
    };

    const timer = setTimeout(() => {
      const render = template(data1);
      setHtml(render);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [data, template]);

  const handleGenratePdf = async () => {
    setIsDownloading(true);
    try {
      const req = await fetch("/api/genratePdf", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          html: html
        })
      });

      if (req.ok) {
        const blob = await req.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.name ? data.name.replace(/\s+/g, '_') : 'resume'}.pdf`;
        a.click();
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="w-full h-full @container relative group bg-white rounded">
      {/* Action Toolbar */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleGenratePdf}
          disabled={isDownloading}
          className="flex items-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-bold rounded-full shadow-2xl hover:bg-primary/90 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      <div className="w-full h-full relative overflow-hidden rounded">
        {html ? (
          <iframe
            srcDoc={html}
            title="Resume Preview"
            className="absolute top-0 left-0 w-[794px] h-[1123px] origin-top-left border-0 bg-transparent"
            style={{ transform: 'scale(calc(100cqw / 794))' }}
            sandbox="allow-same-origin allow-scripts"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
            <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default IframeRender;