"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loader from '@/utils/LottieLoader';
import { Upload, AlertCircle, ScanSearch, Sparkles } from 'lucide-react';

const AtsModule = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setError(null);
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
        <div className='min-h-[calc(100vh-4rem)] w-full bg-[#020617] text-white flex flex-col items-center px-4 sm:px-6 relative overflow-hidden'>
            {/* BG Glows */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-500/8 blur-[120px] rounded-full pointer-events-none" />

            {isUploading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-md">
                    <Loader />
                </div>
            )}

            {/* Header */}
            <div className="w-full py-16 max-w-3xl text-center space-y-4 mb-10 relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-1.5 text-sm text-indigo-300 mb-4">
                    <ScanSearch className="w-4 h-4" />
                    AI-Powered Analysis
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                    ATS Resume Scanner
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Upload your resume to instantly extract and analyze its content.
                    Discover how Applicant Tracking Systems see your professional profile.
                </p>
            </div>

            {/* Upload Card */}
            <div className='w-full max-w-2xl glass-card p-8 sm:p-12 flex flex-col items-center gap-8 relative z-10'>
                {/* Upload Area */}
                <div
                    className="w-full relative border-2 border-dashed border-indigo-500/25 rounded-2xl bg-indigo-500/5 hover:bg-indigo-500/10 transition-all duration-300 flex flex-col items-center justify-center p-10 cursor-pointer group"
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept='.pdf'
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Upload className="w-7 h-7 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                        {fileName ? "File Selected" : "Click to upload"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 text-center">
                        {fileName ? (
                            <span className="text-indigo-300 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                {fileName}
                            </span>
                        ) : (
                            "Upload your PDF resume (max 5MB)"
                        )}
                    </p>
                </div>

                {error && (
                    <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!fileName || isUploading}
                    className='w-full py-4 btn-primary font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex justify-center items-center gap-2 text-base'
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
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AtsModule