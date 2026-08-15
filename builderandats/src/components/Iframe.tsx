"use client"
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Loader } from "lucide-react";
import Handlebars from "handlebars";

interface IframeData {
  name?: string;
  email?: string;
  summary?: string;
  phoneNumber?: string;
  githubLink?: string;
  linkedinLink?: string;
  location?: string;
  headingFontSize?: string;
  bodyFontSize?: string;
  nameFontSize?: string;
  linkedin?: string;
  github?: string;
  geeksforgeeks?: string;
  experience?: Array<{
    role: string;
    company: string;
    duration: string;
    description: string[];
  }>;
  projects?: Array<{
    title: string;
    technologies: string;
    description: string[];
  }>;
  skills?: Array<{ title: string; names: string }> | Record<string, string[]>;
  education?: Array<{ degree: string; institution: string; duration: string }>;
  certifications?: string[];
  achievements?: string[];
}

const IframeRender = ({ data, Stringhtml, supportedFields }: { data: IframeData; Stringhtml: string; supportedFields?: string[] }) => {
  const [html, setHtml] = useState("");
  const [template, setTemplate] = useState<HandlebarsTemplateDelegate | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(1);
  const [renderError, setRenderError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  const isFieldSupported = useCallback((field: string) => {
    if (!supportedFields) return true;
    return supportedFields.includes(field);
  }, [supportedFields]);

  useEffect(() => {
    if (!Stringhtml) return;
    try {
      const temp = Handlebars.compile(Stringhtml);
      setTemplate(() => temp);
      setRenderError(null);
    } catch (err) {
      console.error("Handlebars compile error:", err);
      setRenderError("Template compilation failed. Please check the template syntax.");
    }
  }, [Stringhtml]);

  useEffect(() => {
    if (!template) return;
    try {
      const data1 = {
        name: data.name || "John Doe",
        email: data.email || "john.doe@example.com",
        summary: isFieldSupported("summary") ? (data.summary || "Experienced professional with a passion for building great products.") : "",
        phoneNumber: isFieldSupported("phoneNumber") ? (data.phoneNumber || "+91 1234567890") : "",
        githubLink: isFieldSupported("githubLink") ? (data.githubLink || "https://github.com/yourname") : "",
        linkedinLink: isFieldSupported("linkedinLink") ? (data.linkedinLink || "https://linkedin.com/in/yourname") : "",
        location: isFieldSupported("location") ? (data.location || "City, Country") : "",
        nameFontSize: data.nameFontSize || "36px",
        headingFontSize: data.headingFontSize || "20px",
        bodyFontSize: data.bodyFontSize || "14px",
        linkedin: data.linkedinLink || "https://linkedin.com/in/yourname",
        github: data.githubLink || "https://github.com/yourname",
        geeksforgeeks: data.geeksforgeeks || "",
        experience: isFieldSupported("experience")
          ? (data.experience?.length
            ? data.experience
            : [{ role: "Frontend Developer", company: "Tech Corp", duration: "2023 - Present", description: ["Built scalable UI components."] }])
          : [],
        projects: isFieldSupported("projects") ? (data.projects || []) : [],
        skills: isFieldSupported("skills")
          ? (data.skills
            ? (typeof data.skills === "object" && !Array.isArray(data.skills)
              ? Object.entries(data.skills).map(([category, list]) => ({
                title: category,
                names: Array.isArray(list) ? list.join(", ") : String(list),
              }))
              : data.skills)
            : [{ title: "Programming Languages", names: "JavaScript, TypeScript, Python" }])
          : [],
        education: isFieldSupported("education")
          ? (data.education?.length
            ? data.education
            : [{ degree: "B.Tech", institution: "University", duration: "2020 - 2024" }])
          : [],
        certifications: data.certifications || [],
        achievements: data.achievements || [],
      };

      const rendered = template(data1);
      setHtml(rendered);
      setRenderError(null);
    } catch (err) {
      console.error("Handlebars render error:", err);
      setRenderError("Failed to render template with provided data.");
    }
  }, [data, template, isFieldSupported]);

  // ResizeObserver for iframe scaling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const containerWidth = container.clientWidth;
      const targetWidth = 794;
      const newScale = containerWidth / targetWidth;
      setScale(newScale);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Listen for generate-pdf message from parent
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type === "generate-pdf") {

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
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [html, data.name]);

  if (renderError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[var(--surface)] text-[var(--text-secondary)] p-6">
        <svg className="w-10 h-10 text-red-400/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="text-sm font-medium">{renderError}</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative bg-white" style={{ containerType: "inline-size" }}>
      {isDownloading && (
        <div className="absolute inset-0 bg-white/50 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="w-full h-full relative overflow-hidden rounded">
        {html ? (
          <iframe
            srcDoc={html + `
              <style>
                a { pointer-events: none !important; cursor: default !important; text-decoration: none !important; color: inherit !important; }
                ::-webkit-scrollbar { display: none; } 
                body { -ms-overflow-style: none; scrollbar-width: none; }
              </style>
              <script>
                document.addEventListener('click', function(e) {
                  var target = e.target;
                  while (target && target.tagName !== 'A') {
                    target = target.parentNode;
                  }
                  if (target) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }, true);
              </script>
            `}
            title="Resume Preview"
            className="absolute top-0 left-0 border-0 bg-white"
            style={{
              width: "794px",
              height: "1123px",
              transformOrigin: "top left",
              transform: `scale(${scale})`,
            }}
            sandbox="allow-same-origin allow-scripts"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--surface)] text-[var(--text-tertiary)]">
            {Stringhtml ? (
              <>
                <svg className="animate-spin h-8 w-8 text-[var(--accent)]/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-sm font-medium">Rendering preview…</span>
              </>
            ) : (
              <>
                <svg className="animate-spin h-8 w-8 text-[var(--accent)]/40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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