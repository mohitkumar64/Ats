"use client"
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loader from '@/utils/LottieLoader';


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
                // console.log(res);

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
        <div className='min-h-[calc(100vh-4rem)] max-h-[95vh] overflow-hidden  w-full bg-background text-foreground flex flex-col items-center  px-4 sm:px-6'>
            {
                isUploading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                        <Loader />
                    </div>
                )
            }
            <div className="w-full  py-12 max-w-3xl text-center space-y-4 mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">ATS Resume Scanner</h1>
                <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                    Upload your resume to instantly extract and analyze its content. Discover how Applicant Tracking Systems see your professional profile.
                </p>
            </div>

            <div className='w-full max-w-2xl bg-white border border-border shadow-xl rounded-2xl p-8 sm:p-12 flex flex-col items-center gap-8'>

                {/* Upload Area */}
                <div
                    className="w-full relative border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors flex flex-col items-center justify-center p-10 cursor-pointer group"
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept='.pdf'
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-105 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                        {fileName ? "File Selected" : "Click to upload"}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1 text-center">
                        {fileName ? fileName : "Upload your PDF resume (max 5MB)"}
                    </p>
                </div>

                {error && (
                    <div className="w-full bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        {error}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!fileName || isUploading}
                    className='w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex justify-center items-center gap-2'
                >
                    {isUploading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Scanning Document...
                        </>
                    ) : (
                        "Scan Resume"
                    )}
                </button>
            </div>

            {/* Results Area */}
            {/* {parsedData && (
            <div className="w-full max-w-4xl mt-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="bg-white border border-border shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-foreground/5 border-b border-border px-6 py-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        <h3 className="font-semibold text-foreground">Extracted Text Content</h3>
                    </div>
                    <div className="p-6">
                        <pre className="whitespace-pre-wrap font-mono text-sm text-foreground/80 bg-gray-50 p-6 rounded-xl border border-gray-100 max-h-[500px] overflow-y-auto">
                            {parsedData}
                        </pre>
                    </div>
                </div>
            </div>
        )} */}

        </div>
    )
}

export default AtsModule