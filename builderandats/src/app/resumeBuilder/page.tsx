"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

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

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-gradient-to-br from-violet-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="w-full px-6 py-14 flex flex-col items-center text-center">

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-3">
          Choose Your Template
        </h1>
        <p className="text-base text-foreground/55 max-w-md">
          Select a professionally designed resume template, then fill in your details to generate a stunning, ATS-optimised PDF.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white overflow-hidden animate-pulse">
                <div className="bg-gray-100 aspect-[3/4] w-full" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-foreground/40">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 13h4" />
            </svg>
            <p className="text-lg font-medium">No templates found</p>
            <p className="text-sm">Add templates from the admin panel to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template._id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const TemplateCard = ({ template }: { template: Template }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/resumeBuilder/${template._id}`)}
      className="group  w-100 h-120 overflow-hidden cursor-pointer rounded-2xl border border-border bg-white  shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
    >

      <div className="relative overflow-hidden bg-gray-50 h-100   ">
        <Image
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={template.img}
          width={400}
          height={600}
          alt={template.name}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30">
            <ArrowRight className='w-4 h-4' />
            Use Template
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 py-3.5 flex items-center justify-center gap-5 border-t border-border">
        <div>
          <p className="text-sm font-semibold text-foreground">{template.name}</p>
          {template.type && (
            <p className="text-xs text-foreground/45 mt-0.5 capitalize">{template.type}</p>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelection