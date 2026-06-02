"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loader from '@/utils/LottieLoader';
import { Upload, AlertCircle, ScanSearch, ChevronRight } from 'lucide-react';

const AtsModule = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setError(null);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
            if (inputRef.current) {
                const dt = new DataTransfer();
                dt.items.add(files[0]);
                inputRef.current.files = dt.files;
            }
            setFileName(files[0].name);
            setError(null);
        } else {
            setError("Please drop a PDF file.");
        }
    };

    const handleUpload = async () => {
        if (!inputRef.current?.files || inputRef.current.files.length === 0) {
            setError("Please select a PDF file first.");
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const req = await fetch('/api/parsePdf', {
                method: "POST",
                headers: {
                    "Content-Type": "application/pdf",
                },
                body: inputRef.current.files[0]
            });

            if (req.ok) {
                const res = await req.json();
                router.push(`/ats/${res.id}`)
            } else {
                setError("Failed to parse the PDF. Please try again.");
            }
        } catch (err) {
            console.error("Upload error:", err);
            setError("An error occurred during upload. Please check your connection.");
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className='page-ambient flex flex-col items-center px-4 sm:px-6'>

            {isUploading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ background: "rgba(8,10,15,0.85)", backdropFilter: "blur(12px)" }}
                >
                    <Loader />
                </div>
            )}

            {/* Header */}
            <div className="w-full py-16 max-w-3xl text-center space-y-4 mb-10 relative z-10">
                <p
                    className="inline-block mb-4"
                    style={{
                        color: "var(--accent)",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                    }}
                >
                    <ScanSearch className="w-3.5 h-3.5 inline-block mr-2 -mt-0.5" />
                    AI-Powered Analysis
                </p>
                <h1
                    className="text-4xl md:text-5xl font-extrabold tracking-tight"
                    style={{
                        fontFamily: "'Syne', system-ui, sans-serif",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.05,
                    }}
                >
                    ATS Resume Scanner
                </h1>
                <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
                    Upload your resume to instantly extract and analyze its content.
                    Discover how Applicant Tracking Systems see your professional profile.
                </p>
            </div>

            {/* Upload Card */}
            <div className='w-full max-w-2xl glass-card p-8 sm:p-12 flex flex-col items-center gap-8 relative z-10'>
                {/* Upload Area */}
                <div
                    className="w-full relative rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer group"
                    style={{
                        border: isDragging
                            ? "2px dashed rgba(232,117,74,0.50)"
                            : "2px dashed rgba(255,255,255,0.10)",
                        background: isDragging
                            ? "rgba(232,117,74,0.04)"
                            : "rgba(255,255,255,0.02)",
                        transition: "all 300ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept='.pdf'
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105"
                        style={{
                            background: "rgba(232,117,74,0.08)",
                            border: "1px solid rgba(232,117,74,0.16)",
                            transition: "transform 300ms cubic-bezier(0.23,1,0.32,1)",
                        }}
                    >
                        <Upload className="w-6 h-6" style={{ color: "var(--accent)" }} />
                    </div>
                    <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                        {fileName ? "File Selected" : "Click or drag to upload"}
                    </h3>
                    <p className="text-sm mt-1.5 text-center" style={{ color: "var(--text-tertiary)" }}>
                        {fileName ? (
                            <span className="flex items-center gap-1.5" style={{ color: "var(--text-mono)" }}>
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ background: "#4ECCA3", boxShadow: "0 0 4px #4ECCA3" }}
                                />
                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                                    {fileName}
                                </span>
                            </span>
                        ) : (
                            "Upload your PDF resume (max 5MB)"
                        )}
                    </p>
                </div>

                {error && (
                    <div
                        className="w-full px-4 py-3 rounded-xl text-sm flex items-center gap-2.5"
                        style={{
                            background: "rgba(248,113,113,0.06)",
                            border: "1px solid rgba(248,113,113,0.15)",
                            color: "#F87171",
                        }}
                    >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!fileName || isUploading}
                    className='w-full py-4 btn-primary font-bold text-base'
                >
                    {isUploading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Scanning Document...
                        </>
                    ) : (
                        <>
                            <ScanSearch className="w-5 h-5" />
                            Scan Resume
                            <ChevronRight className="w-4 h-4 opacity-60" />
                        </>
                    )}
                </button>
            </div>

            {/* Bottom spacer */}
            <div className="h-20" />
        </div>
    )
}

export default AtsModule