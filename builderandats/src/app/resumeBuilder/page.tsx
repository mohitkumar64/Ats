"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, FileText, Trash2 } from 'lucide-react'
import { useUser } from '@/Providers/userProvider';
import toast , { Toaster } from 'react-hot-toast';



interface Template {
  _id: string;
  name: string;
  img: string;
  type?: string;
  layoutInfo?: {
    maxProject?: number;
    maxExperience?: number;
  };
}

const TemplateSelection = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const isAdmin = user?.role === "admin";
  const router = useRouter();

  const toastStyle = {
    background: "var(--surface)",
    color: "#F0F2F5",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: "14px",
  };

  const getTemplates = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/template");
      const data = await res.json();
      if (data.templates) {
        setTemplates(data.templates);
      }
    } catch (err) {
      console.error("Failed to fetch templates:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTemplates();
  }, []);

   const handleDelete = async (e: React.MouseEvent<HTMLButtonElement> ) => {
    e.stopPropagation();
   const  id = e.currentTarget.dataset.id
    if (!confirm("Are you sure you want to delete this template? This action cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/template/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Template deleted successfully", { style: toastStyle });
        router.refresh();
        getTemplates();
      } else {

        const data = await res.json();
        toast.error(data.error || "Failed to delete template", { style: toastStyle });
      }
    } catch (err) {
      toast.error("An error occurred while deleting the template", { style: toastStyle });
    }
  }



  return (
    <div className="page-ambient">
    <Toaster />

      {/* Hero Header */}
      <div className="relative z-10 w-full px-6 py-16 flex flex-col items-center text-center">
        <p
          className="inline-block mb-6"
          style={{
            color: "var(--text-mono)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <FileText className="w-3.5 h-3.5 inline-block mr-2 -mt-0.5" />
          Professional Templates
        </p>
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          style={{
            fontFamily: "'Syne', system-ui, sans-serif",
            color: "var(--text-primary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          Choose Your Template
        </h1>
        <p className="text-base max-w-md leading-relaxed" style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
          Select a professionally designed resume template, then fill in your details to generate a stunning, ATS-optimised PDF.
        </p>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="aspect-3/4 w-full" style={{ background: "rgba(255,255,255,0.03)" }}>
                  {/* Shimmer effect */}
                  <div className="w-full h-full animate-shimmer"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                </div>
                <div className="p-4 space-y-2.5">
                  <div className="h-4 rounded-md w-2/3" style={{ background: "rgba(255,255,255,0.04)" }} />
                  <div className="h-3 rounded-md w-1/3" style={{ background: "rgba(255,255,255,0.03)" }} />
                </div>
              </div>
            ))}
          </div>
        ) : templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
              }}
            >
              <FileText className="w-8 h-8" style={{ color: "var(--text-tertiary)" }} />
            </div>
            <p className="text-lg font-medium" style={{ color: "var(--text-secondary)" }}>No templates found</p>
            <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>Add templates from the admin panel to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) =>{

              return (
                <div
                  key={template._id}
                  className="relative group overflow-hidden cursor-pointer rounded-2xl"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    transition: "border-color 300ms cubic-bezier(0.23,1,0.32,1), box-shadow 300ms cubic-bezier(0.23,1,0.32,1), transform 300ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(232,117,74,0.20)";
                    el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.35)";
                    el.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                     {isAdmin && (
                      <div className="absolute top-3 right-3 z-20">
                        <button
                          data-id = {template._id}
                          onClick={handleDelete}
                          className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                          style={{
                            background: "rgba(248,113,113,0.08)",
                            border: "1px solid rgba(248,113,113,0.15)",
                            color: "#F87171",
                            transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = "#F87171";
                            el.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.background = "rgba(248,113,113,0.08)";
                            el.style.color = "#F87171";
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  <div
                  onClick={() => router.push(`/resumeBuilder/${template._id}`)}
                  className="relative overflow-hidden aspect-3/4"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <Image
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      src={template.img}
                      width={400}
                      height={600}
                      alt={template.name}
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(to top, rgba(232,117,74,0.65) 0%, rgba(232,117,74,0.25) 50%, transparent 100%)",
                        transition: "opacity 300ms cubic-bezier(0.23,1,0.32,1)",
                      }}
                    >
                      <span
                        className="flex items-center gap-2 font-semibold text-sm translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                        style={{
                          color: "#fff",
                          background: "rgba(255,255,255,0.12)",
                          backdropFilter: "blur(8px)",
                          padding: "0.625rem 1.25rem",
                          borderRadius: "9999px",
                          border: "1px solid rgba(255,255,255,0.18)",
                        }}
                      >
                        <ArrowRight className='w-4 h-4' />
                        Use Template
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    onClick={() => router.push(`/resumeBuilder/${template._id}`)}
                    className="px-4 py-4 flex items-center justify-between"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{template.name}</p>
                      {template.type && (
                        <p className="text-xs mt-0.5 capitalize" style={{ color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.04em" }}>{template.type}</p>
                      )}
                    </div>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        background: "var(--accent-dim)",
                        border: "1px solid rgba(232,117,74,0.15)",
                        color: "var(--accent)",
                        transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateSelection