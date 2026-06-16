
"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, FileCode, Type, X, ShieldCheck } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AdminPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(" ");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const imgRef = useRef(null);
  const htmlRef = useRef<HTMLInputElement>(null);

  const [supportedFields, setSupportedFields] = useState({
    summary: true,
    phoneNumber: true,
    location: true,
    githubLink: true,
    linkedinLink: true,
    experience: true,
    projects: true,
    skills: true,
  });

  const fieldsConfig = [
    { key: "summary", label: "Summary", desc: "Professional Summary" },
    { key: "phoneNumber", label: "Phone", desc: "Contact Phone" },
    { key: "location", label: "Location", desc: "City, Country" },
    { key: "githubLink", label: "GitHub", desc: "GitHub Link" },
    { key: "linkedinLink", label: "LinkedIn", desc: "LinkedIn Link" },
    { key: "experience", label: "Experience", desc: "Work Experience" },
    { key: "projects", label: "Projects", desc: "Projects list" },
    { key: "skills", label: "Skills", desc: "Skills categories" },
  ];


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // You can handle files here when adding the backend functionality
  };

  const handlePreviewImage = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      setFilePreview(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const html = htmlRef?.current?.files?.[0];
    if (!html) {
      alert("please upload html file first");
      return;
    }
    const htmlString = await html?.text();
    const formData = new FormData();

    if (selectedImage) {
      formData.append("img", selectedImage);
    }
    formData.append("name", fileName);
    formData.append("html", htmlString);
    formData.append("supportedFields", JSON.stringify(
      Object.keys(supportedFields).filter(key => supportedFields[key as keyof typeof supportedFields])
    ));

    try {
      const res = await fetch("/api/uploadTemplate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Template uploaded successfully");
        setFilePreview(null);
        setSelectedImage(null);
        setFileName("");
        setSupportedFields({
          summary: true,
          phoneNumber: true,
          location: true,
          githubLink: true,
          linkedinLink: true,
          experience: true,
          projects: true,
          skills: true,
        });
      } else {
        toast.error(data.message);
        setFilePreview(null);
        setSelectedImage(null);
        setFileName("");
      }
    } catch (error) {
      toast.error("Error uploading template");
    }

  }


  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">


      <Toaster />
      <div className="max-w-2xl w-full bg-card shadow-xl rounded-2xl overflow-hidden border border-border transition-all hover:shadow-2xl">
        <div className="p-8 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-xl text-primary">
              <UploadCloud size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Upload Template</h1>
              <p className="text-foreground/60 mt-1">Add a new resume template to the system.</p>
            </div>
          </div>
        </div>

        <form className="p-8 space-y-8">
          {/* Template Name */}
          <div className="space-y-3">
            <label htmlFor="templateName" className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Type size={16} className="text-primary" />
              Template Name
            </label>
            <input
              type="text"
              id="templateName"
              placeholder="e.g. Minimalist Tech Resume"
              className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-foreground/40"
              onChange={(e) => setFileName(e.target.value)}
              value={fileName}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileCode size={16} className="text-primary" />
                HTML File
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/50 bg-background/50 hover:bg-background'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={htmlRef}
                  type="file"
                  accept=".html"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="p-3 bg-primary/10 rounded-full text-primary mb-3">
                  <FileCode size={24} />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">Click or drag HTML file</p>
                <p className="text-xs text-foreground/50">Only .html files are supported</p>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="flex justify-between items-center gap-5 text-sm font-semibold text-foreground">
                <div className='flex items-center gap-2'>
                  <ImageIcon size={16} className="text-primary" />
                  Preview Image
                </div>


                {filePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setFilePreview(null);
                      setSelectedImage(null);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    Reset image
                  </button>
                )}


              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all ${dragActive ? 'border-primary bg-primary/5' : 'border-input hover:border-primary/50 bg-background/50 hover:bg-background'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {
                  filePreview ? (
                    <img src={filePreview} alt="Preview" className="w-24 h-24 rounded-xl" />
                  ) : (
                    <div className='flex flex-col items-center'>
                      <input
                        ref={imgRef}
                        type="file"
                        accept=".jpg, .jpeg, .png, .webp"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                        onChange={(e) => {
                          handlePreviewImage(e);
                        }}
                      />
                      <div className="p-3 bg-primary/10 rounded-full text-primary mb-3">
                        <ImageIcon size={24} />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">Click or drag image</p>
                      <p className="text-xs text-foreground/50">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  )
                }


              </div>
            </div>
          </div>

          {/* Supported Fields Checklist */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck size={16} className="text-primary" />
              Supported Template Fields
            </label>
            <p className="text-xs text-foreground/50 -mt-2">
              Uncheck fields that are NOT supported/styled in this template's HTML structure. Unsupported sections will be hidden from the user's resume editor.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {fieldsConfig.map((field) => {
                const isChecked = supportedFields[field.key as keyof typeof supportedFields];
                return (
                  <label
                    key={field.key}
                    className={`flex flex-col justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? "border-primary/50 bg-primary/5 text-foreground"
                        : "border-border bg-background/50 hover:bg-background text-foreground/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{field.label}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          setSupportedFields((prev) => ({
                            ...prev,
                            [field.key]: e.target.checked,
                          }))
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-4.5 h-4.5 rounded flex items-center justify-center border transition-all ${
                          isChecked
                            ? "bg-primary border-primary text-white"
                            : "border-border bg-transparent"
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-foreground/45 mt-1">{field.desc}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button

              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              onClick={handleSubmit}
            >
              <UploadCloud size={20} />
              Upload Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;