"use client"
import IframeRender from '@/components/Iframe'
import React, { useEffect, useState } from 'react'
import './resumebuilder.css'
import { useParams } from 'next/navigation';

interface TemplateData {
  _id?: string;
  html?: string;
  name?: string;
  img?: string;
  layoutInfo?: {
    maxProject?: number;
    maxExperience?: number;
  };
}

const ResumeBuilder = () => {
  const { id } = useParams();
  const [templateData, setTemplateData] = useState<TemplateData>({});
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(true);
  const [activeTab, setActiveTab] = useState("Personal Details");
  const tabs = ["Personal Details", "Experience", "Projects", "Skills"];

  async function getTemplate() {
    try {
      setIsLoadingTemplate(true);
      const res = await fetch(`/api/template/${id}`);
      if (!res.ok) throw new Error("Failed to fetch template");
      const data = await res.json();
      setTemplateData(data);
    } catch (err) {
      console.error("Error loading template:", err);
    } finally {
      setIsLoadingTemplate(false);
    }
  }

  useEffect(() => {
    if (id) getTemplate();

  }, [id]);

  const [data, setData] = React.useState({
    name: "",
    email: "",
    summary: "",
    githubLink: "",
    linkedinLink: "",
    phoneNumber: "",
    location: "",
    experience: [
      {
        role: "",
        company: "",
        duration: "",
        description: ""
      }
    ],
    projects: [
      {
        title: "",
        link: "",
        description: ""
      }
    ],
    skills: [
      {
        title : "" ,
        names : ""
      }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleListChange = (sectionKey: 'experience' | 'projects', index: number, fieldKey: string, value: string) => {
    setData(prev => {
      const updatedList = [...prev[sectionKey]] as any[];
      updatedList[index] = {
        ...updatedList[index],
        [fieldKey]: value
      };
      return {
        ...prev,
        [sectionKey]: updatedList
      };
    });
  };

  const addListItem = (sectionKey: 'experience' | 'projects') => {
    if (data[sectionKey].length >= 3) return;
    setData(prev => {
      const newItem = sectionKey === 'experience'
        ? { role: "", company: "", duration: "", description: "" }
        : { title: "", link: "", description: "" };
      return {
        ...prev,
        [sectionKey]: [...prev[sectionKey], newItem] as any
      };
    });
  };

  const removeListItem = (sectionKey: 'experience' | 'projects', index: number) => {
    setData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].filter((_, i) => i !== index) as any
    }));
  };

  const tabIndex = tabs.indexOf(activeTab);

  const [showError, setShowError] = React.useState(false);


  const isTabValid = (tab: string): boolean => {
    switch (tab) {
      case "Personal Details":
        return data.name.trim() !== "" && data.email.trim() !== "" && data.summary.trim() !== "";
      case "Experience":
        return data.experience.every(
          (e) => e.role.trim() !== "" && e.company.trim() !== "" && e.duration.trim() !== ""
        );
      case "Projects":
        return data.projects.every((p) => p.title.trim() !== "" && p.description.trim() !== "");
      case "Skills":
        return data.skills.trim() !== "";
      default:
        return true;
    }
  };

  // Whether each tab index is accessible (all tabs before it are valid)
  const isTabAccessible = (i: number): boolean => {
    for (let j = 0; j < i; j++) {
      if (!isTabValid(tabs[j])) return false;
    }
    return true;
  };

  const handleNext = (nextTab: string) => {
    if (!isTabValid(activeTab)) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
      return;
    }
    setShowError(false);
    setActiveTab(nextTab);
  };

  return (
    <div className='flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-[var(--bg)] text-white'>

      {/* ── Editor Sidebar ─────────────────────────────────────────────── */}
      <div className='w-full md:w-[420px] lg:w-[480px] border-r border-white/10 bg-[var(--bg)]/50 backdrop-blur-xl shadow-md flex flex-col h-full z-10'>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10 bg-[var(--bg)] sticky top-0 z-20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Resume Builder</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">Edit Your Resume</h2>
          <p className="text-xs text-white/50 mt-0.5 mb-4">Fill each section to see a live preview on the right.</p>

          {/* Progress Bar */}
          <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((tabIndex + 1) / tabs.length) * 100}%` }}
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab, i) => {
              const accessible = isTabAccessible(i);
              const isActive = activeTab === tab;
              const isDone = i < tabIndex && isTabValid(tab);
              return (
                <button
                  key={tab}
                  disabled={!accessible}
                  onClick={() => accessible && setActiveTab(tab)}
                  title={!accessible ? "Complete the previous section first" : undefined}
                  className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5
                    ${isActive
                      ? 'bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                      : isDone
                        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 cursor-pointer border border-green-500/20'
                        : accessible
                          ? 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white cursor-pointer border border-white/5'
                          : 'bg-white/5 text-white/30 cursor-not-allowed opacity-50 border border-white/5'
                    }`}
                >
                  {isDone && (
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {!accessible && !isActive && !isDone && (
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  )}
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className='flex-1 overflow-y-auto p-6 space-y-1 no-scrollbar bg-transparent'>

          {/* PERSONAL DETAILS */}
          {activeTab === "Personal Details" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <FormField label="Full Name">
                <input
                  className={inputCls}
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="e.g. Jane Doe"
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="Email Address">
                <input
                  className={inputCls}
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="e.g. jane@example.com"
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="Professional Summary" hint="A brief 2-3 sentence overview of your career.">
                <textarea
                  className={`${inputCls} min-h-[110px] resize-y`}
                  name="summary"
                  value={data.summary}
                  placeholder="Briefly describe your professional background and goals..."
                  onChange={handleChange}
                />
              </FormField>
               <FormField label="Phone Number" hint="Your contact phone number">
                <input
                  className={inputCls}
                  type="tel"
                  name="phoneNumber"
                  value={data.phoneNumber}
                  placeholder="e.g. (123) 456-7890"
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="GitHub Link" hint="Your GitHub profile URL">
                <input
                  className={inputCls}
                  type="url"
                  name="githubLink"
                  value={data.githubLink}
                  placeholder="e.g. https://github.com/jane_doe"
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="LinkedIn Link" hint="Your LinkedIn profile URL">
                <input
                  className={inputCls}
                  type="url"
                  name="linkedinLink"
                  value={data.linkedinLink}
                  placeholder="e.g. https://linkedin.com/in/jane-doe"
                  onChange={handleChange}
                />
              </FormField>
               <FormField label="Location" hint="Your current location">
                <input
                  className={inputCls}
                  type="text"
                  name="location"
                  value={data.location}
                  placeholder="e.g. New Delhi, CA"
                  onChange={handleChange}
                />
              </FormField>
              <NavButtons
                onNext={() => handleNext("Experience")}
                nextLabel="Experience"
                showError={showError && activeTab === "Personal Details"}
                errorMsg="Please fill in your name, email, and summary."
              />
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === "Experience" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <SectionHeader count={data.experience.length} max={3} label="Work Experiences" />

              {data.experience.map((exp, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl border border-white/10 shadow-sm space-y-4 hover:border-white/20 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                      Experience
                    </span>
                    {data.experience.length > 1 && (
                      <button onClick={() => removeListItem('experience', i)} className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors font-medium">
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Job Title">
                      <input className={inputSmCls} type="text" value={exp.role} placeholder="e.g. Software Engineer" onChange={(e) => handleListChange('experience', i, 'role', e.target.value)} />
                    </FormField>
                    <FormField label="Company">
                      <input className={inputSmCls} type="text" value={exp.company} placeholder="e.g. Acme Corp" onChange={(e) => handleListChange('experience', i, 'company', e.target.value)} />
                    </FormField>
                  </div>
                  <FormField label="Duration">
                    <input className={inputSmCls} type="text" value={exp.duration} placeholder="e.g. Jan 2021 – Present" onChange={(e) => handleListChange('experience', i, 'duration', e.target.value)} />
                  </FormField>
                  <FormField label="Description">
                    <textarea className={`${inputSmCls} min-h-[80px] resize-y`} value={exp.description} placeholder="Key achievements and responsibilities..." onChange={(e) => handleListChange('experience', i, 'description', e.target.value)} />
                  </FormField>
                </div>
              ))}

              {data.experience.length < 3 && (
                <AddButton onClick={() => addListItem('experience')} label="Add Another Experience" />
              )}

              <NavButtons
                onBack={() => setActiveTab("Personal Details")}
                onNext={() => handleNext("Projects")}
                nextLabel="Projects"
                showError={showError && activeTab === "Experience"}
                errorMsg="Fill in the role, company, and duration for each experience."
              />
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === "Projects" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <SectionHeader count={data.projects.length} max={3} label="Projects" />

              {data.projects.map((proj, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-xl border border-white/10 shadow-sm space-y-4 hover:border-white/20 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                      Project
                    </span>
                    {data.projects.length > 1 && (
                      <button onClick={() => removeListItem('projects', i)} className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors font-medium">
                        Remove
                      </button>
                    )}
                  </div>
                  <FormField label="Project Title">
                    <input className={inputSmCls} type="text" value={proj.title} placeholder="e.g. E-Commerce Platform" onChange={(e) => handleListChange('projects', i, 'title', e.target.value)} />
                  </FormField>
                  <FormField label="Link (Optional)">
                    <input className={inputSmCls} type="text" value={proj.link} placeholder="e.g. github.com/my-project" onChange={(e) => handleListChange('projects', i, 'link', e.target.value)} />
                  </FormField>
                  <FormField label="Description">
                    <textarea className={`${inputSmCls} min-h-[80px] resize-y`} value={proj.description} placeholder="Technologies used, your role, and outcome..." onChange={(e) => handleListChange('projects', i, 'description', e.target.value)} />
                  </FormField>
                </div>
              ))}

              {data.projects.length < 3 && (
                <AddButton onClick={() => addListItem('projects')} label="Add Another Project" />
              )}

              <NavButtons
                onBack={() => setActiveTab("Experience")}
                onNext={() => handleNext("Skills")}
                nextLabel="Skills"
                showError={showError && activeTab === "Projects"}
                errorMsg="Fill in the title and description for each project."
              />
            </div>
          )}

          {/* SKILLS */}
          {activeTab === "Skills" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3 flex gap-3 text-sm text-blue-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Separate skills with commas for best formatting.
              </div>
              <FormField label="Your Skills">
                <textarea
                  className={`${inputCls} min-h-[140px] resize-y`}
                  name="skills"
                  value={data.skills}
                  placeholder="e.g. React, TypeScript, Node.js, Figma, SQL..."
                  onChange={handleChange}
                />
              </FormField>

              <div className="pt-2 flex justify-between items-center">
                <button onClick={() => setActiveTab("Projects")} className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors">
                  ← Back
                </button>
                <div className="flex items-center gap-2 px-5 py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Looking great! Download below ↓
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Preview Area ───────────────────────────────────────────────── */}
      <div className='flex-1 bg-[var(--bg)] flex flex-col items-center justify-start overflow-auto relative'>
        {/* Preview header bar */}
        <div className="w-full flex items-center justify-between px-6 py-3 bg-[var(--bg)]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">

          {isLoadingTemplate ? (
            <span className="text-xs text-white/40 animate-pulse">Loading template…</span>
          ) : (
            <span className="text-xs font-medium text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] inline-block animate-pulse" />
              Live
            </span>
          )}
        </div>

        {/* A4 paper preview */}
        <div className="p-8 flex items-start justify-center w-full">
          {/* A4 ratio: 794 × 1123 px */}
          <div
            className="bg-white shadow-2xl ring-1 ring-black/8 rounded-sm shrink-0"
            style={{
              width: 'min(794px, calc(100vw - 520px - 4rem))',
              aspectRatio: '794 / 1123',
            }}
          >
            <IframeRender Stringhtml={templateData.html ?? ""} data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}


const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-white";
const inputSmCls = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-white";

const FormField = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-white/80 tracking-wide">{label}</label>
    {hint && <p className="text-[11px] text-white/45 -mt-1">{hint}</p>}
    {children}
  </div>
);

const SectionHeader = ({ count, max, label }: { count: number; max: number; label: string }) => (
  <div className="flex items-center justify-between">
    <p className="text-sm text-white/60">{label}</p>
    <span className={`text-xs font-bold px-2 py-1 rounded-full ${count >= max ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
      {count}/{max}
    </span>
  </div>
);

const AddButton = ({ onClick, label }: { onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    className="w-full py-3 border-2 border-dashed border-primary/20 text-primary/70 text-sm font-medium rounded-xl hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
    {label}
  </button>
);

const NavButtons = ({
  onBack,
  onNext,
  nextLabel,
  showError,
  errorMsg,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showError?: boolean;
  errorMsg?: string;
}) => (
  <div className="pt-4 space-y-2">
    {/* Inline validation error */}
    <div
      className={`flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg transition-all duration-300 overflow-hidden ${showError ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0 py-0 border-0'
        }`}
    >
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {errorMsg}
    </div>

    <div className="flex justify-between items-center">
      {onBack ? (
        <button onClick={onBack} className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors">
          ← Back
        </button>
      ) : <div />}
      {onNext && (
        <button
          onClick={onNext}
          className={`px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all shadow-sm ${showError
              ? 'bg-red-500 animate-[shake_0.3s_ease-in-out]'
              : 'bg-primary hover:bg-primary/90'
            }`}
        >
          {nextLabel} →
        </button>
      )}
    </div>
  </div>
);

export default ResumeBuilder