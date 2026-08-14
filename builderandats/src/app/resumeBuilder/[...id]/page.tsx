"use client"
import IframeRender from '@/components/Iframe'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation';
import FormField from '@/components/resumeBuilder/FormField';
import SectionHeader from '@/components/resumeBuilder/SectionHeader';
import AddButton from '@/components/resumeBuilder/AddButton';
import NavButtons from '@/components/resumeBuilder/NavButtons';

interface TemplateData {
  _id?: string;
  html?: string;
  name?: string;
  img?: string;
  supportedFields?: string[];
  layoutInfo?: {
    maxProject?: number;
    maxExperience?: number;
    maxEducation?: number;
  };
}

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
}

interface ProjectItem {
  title: string;
  technologies: string;
  description: string[];
}

interface ResumeData {
  name: string;
  email: string;
  summary: string;
  githubLink: string;
  linkedinLink: string;
  phoneNumber: string;
  location: string;
  headingFontSize: string;
  bodyFontSize: string;
  nameFontSize: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
}

const ResumeBuilder = () => {
  const { id } = useParams();
  const [templateData, setTemplateData] = useState<TemplateData>({});
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(true);
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [tabErrors, setTabErrors] = useState<Record<string, boolean>>({});

  const isFieldSupported = useCallback((field: string) => {
    if (!templateData || !templateData.supportedFields) return true;
    return templateData.supportedFields.includes(field);
  }, [templateData]);

  const tabs = React.useMemo(() => {
    const list = ["Personal Details"];
    if (isFieldSupported("education")) list.push("Education");
    if (isFieldSupported("experience")) list.push("Experience");
    if (isFieldSupported("projects")) list.push("Projects");
    if (isFieldSupported("skills")) list.push("Skills");

    return list;
  }, [isFieldSupported]);

  useEffect(() => {
    if (tabs.length > 0 && !tabs.includes(activeTab)) {
      setActiveTab(tabs[0]);
    }
  }, [tabs, activeTab]);

  const getTemplate = useCallback(async () => {
    if (!id) return;
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
  }, [id]);

  useEffect(() => {
    getTemplate();
  }, [getTemplate]);

  const [data, setData] = useState<ResumeData>({
    name: "",
    email: "",
    summary: "",
    githubLink: "",
    linkedinLink: "",
    phoneNumber: "",
    location: "",
    headingFontSize: "20",
    bodyFontSize: "14",
    nameFontSize: "36",
    experience: [
      { role: "", company: "", duration: "", description: [""] }
    ],
    education: [
      { degree: "", institution: "", duration: "" }
    ],
    projects: [
      { title: "", technologies: "", description: [""] }
    ]
  });

  const [skillsList, setSkillsList] = useState<{ id: string; category: string; values: string }[]>([
    { id: "1", category: "Programming Languages", values: "JavaScript, TypeScript, Python" }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  const handleListChange = (sectionKey: 'experience' | 'projects' | "education", index: number, fieldKey: string, value: string) => {
    setData(prev => {
      const updatedList = [...prev[sectionKey]];
      updatedList[index] = { ...updatedList[index], [fieldKey]: value };
      return { ...prev, [sectionKey]: updatedList };
    });
  };

  const handleArrayFieldChange = (sectionKey: 'experience' | 'projects', index: number, fieldKey: 'description', arrayIndex: number, value: string) => {
    setData(prev => {
      const updatedList = [...prev[sectionKey]];
      const currentArray = updatedList[index][fieldKey] || [""];
      const newArray = [...currentArray];
      newArray[arrayIndex] = value;
      updatedList[index] = { ...updatedList[index], [fieldKey]: newArray };
      return { ...prev, [sectionKey]: updatedList };
    });
  };

  const addArrayField = (sectionKey: 'experience' | 'projects', index: number, fieldKey: 'description') => {
    setData(prev => {
      const updatedList = [...prev[sectionKey]];
      const currentArray = updatedList[index][fieldKey] || [""];
      updatedList[index] = { ...updatedList[index], [fieldKey]: [...currentArray, ""] };
      return { ...prev, [sectionKey]: updatedList };
    });
  };

  const removeArrayField = (sectionKey: 'experience' | 'projects', index: number, fieldKey: 'description', arrayIndex: number) => {
    setData(prev => {
      const updatedList = [...prev[sectionKey]];
      const currentArray = updatedList[index][fieldKey] || [""];
      if (currentArray.length <= 1) return prev;
      updatedList[index] = { ...updatedList[index], [fieldKey]: currentArray.filter((_, i: number) => i !== arrayIndex) };
      return { ...prev, [sectionKey]: updatedList };
    });
  };

  const addListItem = (sectionKey: 'experience' | 'projects' | 'education') => {
    const maxLimit = sectionKey === 'experience'
      ? (templateData.layoutInfo?.maxExperience ?? 3)
      : sectionKey === 'projects'
        ? (templateData.layoutInfo?.maxProject ?? 3)
        : (templateData.layoutInfo?.maxEducation ?? 3);

    if (data[sectionKey].length >= maxLimit) return;

    let newItem: ExperienceItem | EducationItem | ProjectItem;
    if (sectionKey === 'experience') {
      newItem = { role: "", company: "", duration: "", description: [""] };
    } else if (sectionKey === 'projects') {
      newItem = { title: "", technologies: "", description: [""] };
    } else {
      newItem = { degree: "", institution: "", duration: "" };
    }

    setData(prev => ({ ...prev, [sectionKey]: [...prev[sectionKey], newItem] }));
  };

  const removeListItem = (sectionKey: 'experience' | 'projects' | "education", index: number) => {
    setData(prev => ({ ...prev, [sectionKey]: prev[sectionKey].filter((_, i) => i !== index) }));
  };

  const tabIndex = tabs.indexOf(activeTab);

  const isTabValid = (tab: string): boolean => {
    switch (tab) {
      case "Personal Details":
        return data.name.trim() !== "" && data.email.trim() !== "" && (isFieldSupported("summary") ? data.summary.trim() !== "" : true);
      case "Experience":
        return data.experience.every(e => e.role.trim() !== "" && e.company.trim() !== "" && e.duration.trim() !== "");
      case "Projects":
        return data.projects.every(p => p.title.trim() !== "" && p.description.some((d: string) => d.trim() !== ""));
      case "Skills":
        return skillsList.length > 0 && skillsList.every(item => item.category.trim() !== "" && item.values.trim() !== "");
      case "Education":
        return data.education.every(e => e.degree.trim() !== "" && e.institution.trim() !== "" && e.duration.trim() !== "");
      default:
        return true;
    }
  };

  const isTabAccessible = (i: number): boolean => {
    for (let j = 0; j < i; j++) {
      if (!isTabValid(tabs[j])) return false;
    }
    return true;
  };

  const handleNext = (nextTab: string) => {
    if (!isTabValid(activeTab)) {
      setTabErrors(prev => ({ ...prev, [activeTab]: true }));
      return;
    }
    setTabErrors(prev => ({ ...prev, [activeTab]: false }));
    setActiveTab(nextTab);
  };

  const formattedSkills = React.useMemo(() => {
    const skillsObj: Record<string, string[]> = {};
    skillsList.forEach(item => {
      const cat = item.category.trim();
      if (cat) {
        skillsObj[cat] = item.values.split(",").map(v => v.trim()).filter(Boolean);
      }
    });
    return skillsObj;
  }, [skillsList]);

  const templateDataForPreview = React.useMemo(() => ({
    ...data,
    skills: formattedSkills,
    nameFontSize: `${data.nameFontSize}px`,
    headingFontSize: `${data.headingFontSize}px`,
    bodyFontSize: `${data.bodyFontSize}px`,
    linkedin: data.linkedinLink,
    github: data.githubLink,
    phoneNumber: data.phoneNumber,
  }), [data, formattedSkills]);

  const firsttabref = useRef<HTMLButtonElement>(null);
  const lasttabref = useRef<HTMLButtonElement>(null);
  const midrabref = useRef<HTMLButtonElement>(null);

  const triggerPdfDownload = useCallback(() => {

    window.postMessage({ type: "generate-pdf" }, "*");

  }, []);

  return (
    <div className='flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-[var(--bg)] text-[var(--text-primary)]'>
      {/* ── Editor Sidebar ── */}
      <div className={`w-full md:w-[420px] lg:w-[480px] border-r border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-xl flex flex-col h-full z-10 ${mobileView === "edit" ? "flex" : "hidden md:flex"}`}>
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[var(--border)] bg-[var(--bg)] sticky top-0 z-20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Resume Builder</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "var(--text-primary)" }}>Edit Your Resume</h2>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5 mb-4">Fill each section to see a live preview on the right.</p>

          {/* Progress Bar */}
          <div className="h-1 bg-[var(--border)] rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-[var(--accent)] rounded-full transition-all duration-500" style={{ width: `${((tabIndex + 1) / tabs.length) * 100}%` }} />
          </div>

          {/* Tabs */}
          <div className='flex align-items-center gap-1'>
            <button
              className='flex align-items-center hover:bg-[var(--surface)]/40 p-2 rounded-full cursor-pointer'
              onClick={
                () => {
                  firsttabref.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                  })
                }
              }
            >{"<"}</button>

            <div className="flex gap-1 overflow-x-auto no-scrollbar">

              {tabs.map((tab, i) => {
                const accessible = isTabAccessible(i);
                const isActive = activeTab === tab;
                const isDone = i < tabIndex && isTabValid(tab);
                const hasError = tabErrors[tab];
                return (
                  <button
                    ref={i === 0 ? firsttabref : i === tabs.length - 1 ? lasttabref : midrabref}
                    key={tab}
                    disabled={!accessible}
                    onClick={() => accessible && setActiveTab(tab)}
                    title={!accessible ? "Complete the previous section first" : undefined}
                    className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${isActive
                      ? 'bg-[var(--accent)] text-white ]'
                      : isDone
                        ? 'bg-[var(--text-mono-dim)] text-[var(--text-mono)] hover:bg-[var(--text-mono-dim)] cursor-pointer border border-[var(--text-mono-dim)]'
                        : accessible
                          ? hasError
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer border border-red-500/20'
                            : 'bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)] cursor-pointer border border-[var(--border)]'
                          : 'bg-[var(--surface-2)] text-[var(--text-tertiary)] cursor-not-allowed opacity-50 border border-[var(--border)]'
                      }`}
                  >
                    {isDone && <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
                    {!accessible && !isActive && !isDone && <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
                    {tab}
                  </button>
                );
              })}

            </div>
            <button
              className='flex align-items-center hover:bg-[var(--surface)]/40 p-2 rounded-full cursor-pointer'
              onClick={
                () => {
                  lasttabref.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                  })
                }
              }
            >{">"}</button>

          </div>
        </div>

        {/* Tab Content */}
        <div className='flex-1 overflow-y-auto p-6 space-y-1 no-scrollbar bg-transparent'>

          {/* PERSONAL DETAILS */}
          {activeTab === "Personal Details" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <FormField label="Full Name" >
                <input type="text" name="name" value={data.name} placeholder="e.g. Aditya Kumar" onChange={handleChange} className="input-field-small" />
              </FormField>
              <FormField label="Email Address">
                <input type="email" name="email" value={data.email} placeholder="e.g. adi@example.com" onChange={handleChange} className="input-field-small" />
              </FormField>
              {isFieldSupported("summary") && (
                <FormField label="Professional Summary" hint="A brief 2-3 sentence overview of your career.">
                  <textarea name="summary" value={data.summary} placeholder="Briefly describe your professional background and goals..." onChange={handleChange} className="textarea-field min-h-[110px]" />
                </FormField>
              )}
              {isFieldSupported("phoneNumber") && (
                <FormField label="Phone Number" hint="Your contact phone number">
                  <input type="tel" name="phoneNumber" value={data.phoneNumber} placeholder="e.g. (123) 456-7890" onChange={handleChange} className="input-field-small" />
                </FormField>
              )}
              {isFieldSupported("githubLink") && (
                <FormField label="GitHub Link" hint="Your GitHub profile URL">
                  <input type="url" name="githubLink" value={data.githubLink} placeholder="e.g. https://github.com/adi" onChange={handleChange} className="input-field-small" />
                </FormField>
              )}
              {isFieldSupported("linkedinLink") && (
                <FormField label="LinkedIn Link" hint="Your LinkedIn profile URL">
                  <input type="url" name="linkedinLink" value={data.linkedinLink} placeholder="e.g. https://linkedin.com/in/adi" onChange={handleChange} className="input-field-small" />
                </FormField>
              )}
              {isFieldSupported("location") && (
                <FormField label="Location" hint="Your current location">
                  <input type="text" name="location" value={data.location} placeholder="e.g. New Delhi" onChange={handleChange} className="input-field-small" />
                </FormField>
              )}

              {/* Font Size Settings */}
              <div className="pt-2 pb-1 border-t border-[var(--border)] mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>
                  <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Font Size Controls (px)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <FormField label="Name Size">
                    <input type="number" name="nameFontSize" min="18" max="60" value={data.nameFontSize} onChange={handleChange} className="input-field-plain" />
                  </FormField>
                  <FormField label="Heading Size">
                    <input type="number" name="headingFontSize" min="12" max="36" value={data.headingFontSize} onChange={handleChange} className="input-field-plain" />
                  </FormField>
                  <FormField label="Body/Text Size">
                    <input type="number" name="bodyFontSize" min="10" max="24" value={data.bodyFontSize} onChange={handleChange} className="input-field-plain" />
                  </FormField>
                </div>
              </div>
              {tabs.length === 1 ? (
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={triggerPdfDownload}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-all"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              ) : (
                <NavButtons
                  onNext={() => handleNext(tabs[1])}
                  nextLabel={tabs[1]}
                  showError={tabErrors["Personal Details"]}
                  errorMsg={isFieldSupported("summary") ? "Please fill in your name, email, and summary." : "Please fill in your name and email."}
                />
              )}
            </div>
          )}

          {/* EDUCATION */}
          {activeTab === "Education" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <SectionHeader count={data.education.length} max={templateData.layoutInfo?.maxEducation ?? 3} label="Education" />

              {data.education.map((edu, i) => (
                <div key={i} className="card p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <span className="w-5 h-5 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                      Education
                    </span>
                    {data.education.length > 1 && (
                      <button onClick={() => removeListItem('education', i)} className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors font-medium">Remove</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Degree">
                      <input className="input-field-plain" type="text" value={edu.degree} placeholder="e.g. B.Tech (CSE)" onChange={(e) => handleListChange('education', i, 'degree', e.target.value)} />
                    </FormField>
                    <FormField label="Institution">
                      <input className="input-field-plain" type="text" value={edu.institution} placeholder="e.g. JSS Noida" onChange={(e) => handleListChange('education', i, 'institution', e.target.value)} />
                    </FormField>
                  </div>
                  <FormField label="Duration">
                    <input className="input-field-plain" type="text" value={edu.duration} placeholder="e.g. Jan 2021 – Present" onChange={(e) => handleListChange('education', i, 'duration', e.target.value)} />
                  </FormField>
                </div>
              ))}

              {data.education.length < (templateData.layoutInfo?.maxEducation ?? 3) && (
                <AddButton onClick={() => addListItem('education')} label="Add Another Education" />
              )}

              {tabIndex === tabs.length - 1 ? (
                <div className="pt-4 flex justify-between items-center">
                  <button onClick={() => setActiveTab(tabs[tabIndex - 1])} className="btn-ghost text-sm px-4 py-2">← Back</button>
                  <button
                    onClick={triggerPdfDownload}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-all"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              ) : (
                <NavButtons
                  onBack={() => setActiveTab(tabs[tabIndex - 1])}
                  onNext={() => handleNext(tabs[tabIndex + 1])}
                  nextLabel={tabs[tabIndex + 1]}
                  showError={tabErrors["Education"]}
                  errorMsg="Fill in the degree, institution, and duration for each education."
                />
              )}
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === "Experience" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <SectionHeader count={data.experience.length} max={templateData.layoutInfo?.maxExperience ?? 3} label="Work Experiences" />

              {data.experience.map((exp, i) => (
                <div key={i} className="card p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <span className="w-5 h-5 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                      Experience
                    </span>
                    {data.experience.length > 1 && (
                      <button onClick={() => removeListItem('experience', i)} className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors font-medium">Remove</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Job Title">
                      <input className="input-field-plain" type="text" value={exp.role} placeholder="e.g. Software Engineer" onChange={(e) => handleListChange('experience', i, 'role', e.target.value)} />
                    </FormField>
                    <FormField label="Company">
                      <input className="input-field-plain" type="text" value={exp.company} placeholder="e.g. Acme Corp" onChange={(e) => handleListChange('experience', i, 'company', e.target.value)} />
                    </FormField>
                  </div>
                  <FormField label="Duration">
                    <input className="input-field-plain" type="text" value={exp.duration} placeholder="e.g. Jan 2021 – Present" onChange={(e) => handleListChange('experience', i, 'duration', e.target.value)} />
                  </FormField>
                  <FormField label="Description">
                    <div className="space-y-2">
                      {exp.description.map((desc: string, di: number) => (
                        <div key={di} className="flex gap-2">
                          <textarea className="textarea-field-plain flex-1 min-h-[60px] resize-y" value={desc} placeholder="Key achievement or responsibility..." onChange={(e) => handleArrayFieldChange('experience', i, 'description', di, e.target.value)} />
                          {exp.description.length > 1 && (
                            <button type="button" onClick={() => removeArrayField('experience', i, 'description', di)} className="text-red-400 hover:text-red-300 p-2 mt-auto mb-4" aria-label="Remove">
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => addArrayField('experience', i, 'description')} className="text-xs text-[var(--accent)] hover:text-[var(--accent)]/70 flex items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Add bullet
                      </button>
                    </div>
                  </FormField>
                </div>
              ))}

              {data.experience.length < (templateData.layoutInfo?.maxExperience ?? 3) && (
                <AddButton onClick={() => addListItem('experience')} label="Add Another Experience" />
              )}

              {tabIndex === tabs.length - 1 ? (
                <div className="pt-4 flex justify-between items-center">
                  <button onClick={() => setActiveTab(tabs[tabIndex - 1])} className="btn-ghost text-sm px-4 py-2">← Back</button>
                  <button
                    onClick={triggerPdfDownload}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-all"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              ) : (
                <NavButtons
                  onBack={() => setActiveTab(tabs[tabIndex - 1])}
                  onNext={() => handleNext(tabs[tabIndex + 1])}
                  nextLabel={tabs[tabIndex + 1]}
                  showError={tabErrors["Experience"]}
                  errorMsg="Fill in the role, company, duration, and at least one description for each experience."
                />
              )}
            </div>
          )}

          {/* PROJECTS */}
          {activeTab === "Projects" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <SectionHeader count={data.projects.length} max={templateData.layoutInfo?.maxProject ?? 3} label="Projects" />

              {data.projects.map((proj, i) => (
                <div key={i} className="card p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <span className="w-5 h-5 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                      Project
                    </span>
                    {data.projects.length > 1 && (
                      <button onClick={() => removeListItem('projects', i)} className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors font-medium">Remove</button>
                    )}
                  </div>
                  <FormField label="Project Title">
                    <input className="input-field-plain" type="text" value={proj.title} placeholder="e.g. E-Commerce Platform" onChange={(e) => handleListChange('projects', i, 'title', e.target.value)} />
                  </FormField>
                  <FormField label="Technologies">
                    <input className="input-field-plain" type="text" value={proj.technologies} placeholder="e.g. React, Node.js, PostgreSQL" onChange={(e) => handleListChange('projects', i, 'technologies', e.target.value)} />
                  </FormField>
                  <FormField label="Description">
                    <div className="space-y-2">
                      {proj.description.map((desc: string, di: number) => (
                        <div key={di} className="flex gap-2">
                          <textarea className="textarea-field-plain flex-1 min-h-[60px] resize-y" value={desc} placeholder="Your role, outcome, key features..." onChange={(e) => handleArrayFieldChange('projects', i, 'description', di, e.target.value)} />
                          {proj.description.length > 1 && (
                            <button type="button" onClick={() => removeArrayField('projects', i, 'description', di)} className="text-red-400 hover:text-red-300 p-2 mt-auto mb-4" aria-label="Remove">
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => addArrayField('projects', i, 'description')} className="text-xs text-[var(--accent)] hover:text-[var(--accent)]/70 flex items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Add bullet
                      </button>
                    </div>
                  </FormField>
                </div>
              ))}

              {data.projects.length < (templateData.layoutInfo?.maxProject ?? 3) && (
                <AddButton onClick={() => addListItem('projects')} label="Add Another Project" />
              )}

              {tabIndex === tabs.length - 1 ? (
                <div className="pt-4 flex justify-between items-center">
                  <button onClick={() => setActiveTab(tabs[tabIndex - 1])} className="btn-ghost text-sm px-4 py-2">← Back</button>
                  <button
                    onClick={triggerPdfDownload}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-all"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              ) : (
                <NavButtons
                  onBack={() => setActiveTab(tabs[tabIndex - 1])}
                  onNext={() => handleNext(tabs[tabIndex + 1])}
                  nextLabel={tabs[tabIndex + 1]}
                  showError={tabErrors["Projects"]}
                  errorMsg="Fill in the title, technologies, and at least one description for each project."
                />
              )}
            </div>
          )}

          {/* SKILLS */}
          {activeTab === "Skills" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="bg-[var(--accent-dim)] border border-[var(--accent-mid)] rounded-lg px-4 py-3 flex gap-3 text-sm text-[var(--accent)]">
                <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                Separate skills with commas for best formatting.
              </div>

              <div className="space-y-4">
                {skillsList.map((item, index) => (
                  <div key={item.id} className="card p-4 space-y-3 relative">
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <span className="w-5 h-5 rounded-full bg-[var(--accent-dim)] text-[var(--accent)] text-[10px] flex items-center justify-center font-bold">{index + 1}</span>
                        Skill Category
                      </span>
                      {skillsList.length > 1 && (
                        <button onClick={() => setSkillsList(skillsList.filter(s => s.id !== item.id))} className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded-md transition-colors font-medium">Remove</button>
                      )}
                    </div>
                    <FormField label="Category">
                      <input className="input-field-plain" type="text" value={item.category} placeholder="e.g. Front End" onChange={(e) => { const updated = skillsList.map(s => s.id === item.id ? { ...s, category: e.target.value } : s); setSkillsList(updated); }} />
                    </FormField>
                    <FormField label="Skills">
                      <input className="input-field-plain" type="text" value={item.values} placeholder="e.g. React, HTML, CSS" onChange={(e) => { const updated = skillsList.map(s => s.id === item.id ? { ...s, values: e.target.value } : s); setSkillsList(updated); }} />
                    </FormField>
                  </div>
                ))}

                <button type="button" onClick={() => setSkillsList([...skillsList, { id: Math.random().toString(36).substring(7), category: "", values: "" }])} className="w-full py-3 border-2 border-dashed border-[var(--accent-mid)] text-[var(--accent)] text-sm font-medium rounded-xl hover:bg-[var(--accent-dim)] hover:border-[var(--accent)] transition-all flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  Add Skills Category
                </button>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button onClick={() => setActiveTab(tabs[tabIndex - 1])} className="btn-ghost text-sm px-4 py-2">← Back</button>
                <button
                  onClick={triggerPdfDownload}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-all"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Preview Area ── */}
      <div className={`flex-1 bg-[var(--bg)] flex flex-col items-start md:items-center justify-start overflow-auto relative ${mobileView === "preview" ? "flex" : "hidden md:flex"}`}>
        <div className="w-full flex items-center justify-between px-6 py-3 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)] sticky top-0 z-10">
          {isLoadingTemplate ? (
            <span className="text-xs text-[var(--text-tertiary)] animate-pulse">Loading template…</span>
          ) : (
            <span className="text-xs font-medium text-[var(--text-mono)] flex items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-mono)] shadow-[0_0_8px_rgba(78,204,163,0.8)] inline-block animate-pulse" />
              Live
            </span>
          )}
        </div>

        <div className="p-4 md:p-8 flex items-start justify-start md:justify-center w-full">
          <div className="bg-white shadow-2xl ring-1 ring-black/8 rounded-sm shrink-0" style={{ width: "794px", aspectRatio: '794 / 1123' }}>
            <IframeRender
              Stringhtml={templateData.html ?? ""}
              data={templateDataForPreview}
              supportedFields={templateData.supportedFields}
            />
          </div>
        </div>
      </div>

      {/* Mobile view toggle */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[var(--bg)]/90 border border-[var(--border)] backdrop-blur-md rounded-full py-1.5 px-2.5 flex items-center gap-1.5 shadow-2xl">
        <button onClick={() => setMobileView("edit")} className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${mobileView === "edit" ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
          Edit
        </button>
        <button onClick={() => setMobileView("preview")} className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${mobileView === "preview" ? "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
          Preview
        </button>
      </div>
    </div>
  )
}

export default ResumeBuilder