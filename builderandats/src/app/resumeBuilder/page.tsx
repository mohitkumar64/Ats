"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, FileText, Sparkles } from 'lucide-react'

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
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#020617] text-white relative overflow-hidden">
      {/* BG Glows */}
      <div className="absolute top-[-100px] left-1/4 w-[600px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-100px] w-[500px] h-[300px] bg-purple-500/8 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Header */}
      <div className="relative z-10 w-full px-6 py-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-1.5 text-sm text-indigo-300 mb-6">
          <Sparkles className="w-4 h-4" />
          Professional Templates
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Choose Your Template
        </h1>
        <p className="text-base text-gray-400 max-w-md leading-relaxed">
          Select a professionally designed resume template, then fill in your details to generate a stunning, ATS-optimised PDF.
        </p>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl glass-card overflow-hidden">
                <div className="bg-white/5 aspect-[3/4] w-full animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
                  <div className="h-3 bg-white/5 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-600">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-lg font-medium text-gray-400">No templates found</p>
            <p className="text-sm text-gray-600">Add templates from the admin panel to get started.</p>
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
      className="group overflow-hidden cursor-pointer rounded-2xl glass-card glass-card-hover shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all duration-500"
    >
      <div className="relative overflow-hidden bg-white/5 aspect-[3/4]">
        <Image
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={template.img}
          width={400}
          height={600}
          alt={template.name}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/80 via-indigo-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 text-white font-semibold text-sm bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ArrowRight className='w-4 h-4' />
            Use Template
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 py-4 flex items-center justify-between border-t border-white/5">
        <div>
          <p className="text-sm font-semibold text-white">{template.name}</p>
          {template.type && (
            <p className="text-xs text-gray-500 mt-0.5 capitalize">{template.type}</p>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

export default TemplateSelection