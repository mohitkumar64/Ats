"use client"
import IframeRender from '@/components/Iframe'

import React, { useState } from 'react'
import './resumebuilder.css'
import textFix from '@/utils/textfix'

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const tabs = ["Personal Details", "Experience", "Projects", "Skills"];

  const [data, setData] = React.useState({
    name: "",
    email: "",
    summary: "",
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
    skills: ""
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

  return (
    <div className='flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-background text-foreground'>
      
      {/* Editor sidebar */}
      <div className='w-full md:w-[450px] lg:w-[500px] border-r border-border bg-card shadow-sm flex flex-col h-full z-10'>
        <div className="p-6 border-b border-border bg-white sticky top-0 z-20">
          <h2 className="text-2xl font-bold tracking-tight">Resume Details</h2>
          <p className="text-sm text-foreground/60 mt-1 mb-6">Fill in your information section by section.</p>
          
          {/* Tabs */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === tab 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className='flex-1 overflow-y-auto p-6 no-scrollbar bg-gray-50/50'>
          
          {/* PERSONAL DETAILS TAB */}
          {activeTab === "Personal Details" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-semibold text-foreground/90'>Full Name</label>
                <input 
                  className='w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm ring-offset-background placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-sm' 
                  type="text" 
                  name="name"
                  value={data.name}
                  placeholder="e.g. Jane Doe"
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-semibold text-foreground/90'>Email Address</label>
                <input 
                  className='w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm ring-offset-background placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all shadow-sm' 
                  type="email" 
                  name="email"
                  value={data.email}
                  placeholder="e.g. jane@example.com"
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-semibold text-foreground/90'>Professional Summary</label>
                <textarea  
                  className='w-full min-h-[120px] rounded-md border border-input bg-white px-3 py-2.5 text-sm ring-offset-background placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all resize-y shadow-sm' 
                  name="summary" 
                  value={data.summary}
                  placeholder="Briefly describe your professional background and goals..."
                  onChange={handleChange} 
                />
              </div>
              <div className="pt-4 flex justify-end">
                <button onClick={() => setActiveTab("Experience")} className="px-5 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors">Next: Experience</button>
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === "Experience" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground/60">Add up to 3 work experiences.</p>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">{data.experience.length}/3</span>
              </div>
              
              {data.experience.map((exp, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-border shadow-sm space-y-4 relative group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm text-primary uppercase tracking-wider">Experience {i + 1}</h3>
                    {data.experience.length > 1 && (
                      <button onClick={() => removeListItem('experience', i)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition-colors text-xs font-medium">Remove</button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-semibold text-foreground/80'>Role / Job Title</label>
                      <input   
                        className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all' 
                        type="text" 
                        value={exp.role}
                        placeholder="e.g. Software Engineer"
                        onChange={(e)=>handleListChange('experience', i, 'role', e.target.value)} 
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-semibold text-foreground/80'>Company</label>
                      <input   
                        className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all' 
                        type="text" 
                        value={exp.company}
                        placeholder="e.g. Acme Corp"
                        onChange={(e)=>handleListChange('experience', i, 'company', e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-semibold text-foreground/80'>Duration</label>
                    <input   
                      className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all' 
                      type="text" 
                      value={exp.duration}
                      placeholder="e.g. Jan 2021 - Present"
                      onChange={(e)=>handleListChange('experience', i, 'duration', e.target.value)} 
                    />
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-xs font-semibold text-foreground/80'>Description</label>
                    <textarea 
                      className='w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all resize-y' 
                      value={exp.description}
                      placeholder="Describe your achievements and responsibilities..."
                      onChange={(e)=>handleListChange('experience', i, 'description', e.target.value)} 
                    />
                  </div>
                </div>
              ))}
              
              {data.experience.length < 3 && (
                <button 
                  onClick={() => addListItem('experience')}
                  className="w-full py-3 border-2 border-dashed border-primary/30 text-primary font-medium rounded-xl hover:bg-primary/5 hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Add Another Experience
                </button>
              )}
              
              <div className="pt-4 flex justify-between">
                <button onClick={() => setActiveTab("Personal Details")} className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Back</button>
                <button onClick={() => setActiveTab("Projects")} className="px-5 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors">Next: Projects</button>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "Projects" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground/60">Add up to 3 notable projects.</p>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">{data.projects.length}/3</span>
              </div>
              
              {data.projects.map((proj, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-border shadow-sm space-y-4 relative group">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm text-primary uppercase tracking-wider">Project {i + 1}</h3>
                    {data.projects.length > 1 && (
                      <button onClick={() => removeListItem('projects', i)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition-colors text-xs font-medium">Remove</button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-semibold text-foreground/80'>Project Title</label>
                      <input   
                        className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all' 
                        type="text" 
                        value={proj.title}
                        placeholder="e.g. E-Commerce Platform"
                        onChange={(e)=>handleListChange('projects', i, 'title', e.target.value)} 
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-semibold text-foreground/80'>Link (Optional)</label>
                      <input   
                        className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all' 
                        type="text" 
                        value={proj.link}
                        placeholder="e.g. github.com/my-project"
                        onChange={(e)=>handleListChange('projects', i, 'link', e.target.value)} 
                      />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <label className='text-xs font-semibold text-foreground/80'>Description</label>
                      <textarea 
                        className='w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all resize-y' 
                        value={proj.description}
                        placeholder="Describe the project, technologies used, and your role..."
                        onChange={(e)=>handleListChange('projects', i, 'description', e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {data.projects.length < 3 && (
                <button 
                  onClick={() => addListItem('projects')}
                  className="w-full py-3 border-2 border-dashed border-primary/30 text-primary font-medium rounded-xl hover:bg-primary/5 hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Add Another Project
                </button>
              )}
              
              <div className="pt-4 flex justify-between">
                <button onClick={() => setActiveTab("Experience")} className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Back</button>
                <button onClick={() => setActiveTab("Skills")} className="px-5 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:bg-foreground/90 transition-colors">Next: Skills</button>
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === "Skills" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-semibold text-foreground/90'>Skills</label>
                <p className="text-xs text-foreground/50 mb-2">List your top skills separated by commas.</p>
                <textarea  
                  className='w-full min-h-[120px] rounded-md border border-input bg-white px-3 py-2.5 text-sm ring-offset-background placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all resize-y shadow-sm' 
                  name="skills" 
                  value={data.skills}
                  placeholder="e.g. React, TypeScript, Node.js, UI/UX Design, Figma..."
                  onChange={handleChange} 
                />
              </div>
              
              <div className="pt-4 flex justify-between">
                <button onClick={() => setActiveTab("Projects")} className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Back</button>
                <div className="px-5 py-2 bg-green-600 text-white text-sm font-medium rounded-md flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
                  Done
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>

      {/* Preview Area */}
      <div className='flex-1 bg-foreground/5 p-4 sm:p-6 md:p-8 flex items-center justify-center overflow-hidden relative'>
          <div className="h-full aspect-[210/297] bg-white shadow-2xl ring-1 ring-black/5 rounded shrink-0 transition-all duration-300">
            <IframeRender data={data} id={data.name || "resume"} />
          </div>
      </div>
    </div>
  )
}

export default ResumeBuilder