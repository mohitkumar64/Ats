"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, Lightbulb, AlertTriangle, ArrowLeft, Loader2, FileText, Layout, Award, Briefcase, Code, Hash } from "lucide-react";

// --- Types ---
interface SectionData {
    score: number;
    issues?: string[];
    advice?: string[];
    missing_skills?: string[];
    missing_keywords?: string[];
    match_percentage?: number;
}

interface AtsResponseData {
    _id: string;
    score: number;
    summary: string;
    createdAt: string;
    sections: {
        basic_info: SectionData;
        structure: SectionData;
        skills: SectionData;
        experience: SectionData;
        projects: SectionData;
        keywords: SectionData;
        [key: string]: SectionData | undefined;
    };
}

const sectionConfig: Record<string, { title: string; icon: any }> = {
    basic_info: { title: "Basic Information", icon: FileText },
    structure: { title: "Resume Structure", icon: Layout },
    skills: { title: "Skills Match", icon: Award },
    experience: { title: "Experience", icon: Briefcase },
    projects: { title: "Projects", icon: Code },
    keywords: { title: "Keywords", icon: Hash },
};

// Formats **bold text** to HTML
const formatText = (text: string) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<strong class=\"font-semibold text-slate-900\">$1</strong>");
};

const ScoreRing = ({ score }: { score: number }) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    let colorClass = "text-emerald-500";
    if (score < 50) colorClass = "text-rose-500";
    else if (score < 75) colorClass = "text-amber-500";

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90">
                <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                />
                <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={`${colorClass} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-800 tracking-tight">{score}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Score</span>
            </div>
        </div>
    );
};

const SectionCard = ({ keyName, data }: { keyName: string; data: SectionData }) => {
    const config = sectionConfig[keyName];
    if (!config) return null;

    const Icon = config.icon;
    const hasIssues = data.issues && data.issues.length > 0;
    const hasAdvice = data.advice && data.advice.length > 0;
    const hasMissingSkills = data.missing_skills && data.missing_skills.length > 0;
    const hasMissingKeywords = data.missing_keywords && data.missing_keywords.length > 0;

    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                        <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">{config.title}</h3>
                </div>
                <div className="flex flex-col items-end">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-sm border border-slate-200">
                        {data.score} pts
                    </span>
                    {data.match_percentage !== undefined && (
                        <span className="text-xs text-slate-500 font-medium mt-1">
                            {data.match_percentage}% match
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6 grow">
                {hasIssues && (
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-rose-600 mb-3">
                            <AlertCircle className="w-4 h-4" /> Areas for Improvement
                        </h4>
                        <ul className="space-y-3">
                            {data.issues!.map((issue, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-600 items-start leading-relaxed">
                                    <span className="min-w-1.5 h-1.5 bg-rose-400 rounded-full mt-2 shrink-0"></span>
                                    <span dangerouslySetInnerHTML={{ __html: formatText(issue) }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {hasAdvice && (
                    <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-600 mb-3">
                            <Lightbulb className="w-4 h-4" /> Recommendations
                        </h4>
                        <ul className="space-y-3">
                            {data.advice!.map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-600 items-start leading-relaxed">
                                    <span className="min-w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 shrink-0"></span>
                                    <span dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {(hasMissingSkills || hasMissingKeywords) && (
                    <div className="pt-2">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-amber-600 mb-3">
                            <AlertTriangle className="w-4 h-4" />
                            Missing {hasMissingSkills ? "Skills" : "Keywords"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {(data.missing_skills || data.missing_keywords)!.map((item, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-amber-200/60 shadow-sm"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty state fallback if no details */}
                {!hasIssues && !hasAdvice && !hasMissingSkills && !hasMissingKeywords && (
                    <div className="flex items-center justify-center h-full min-h-[100px] text-slate-400 text-sm font-medium italic">
                        No specific feedback for this section.
                    </div>
                )}
            </div>
        </div>
    );
};

const AtsResponse = () => {
    const { id } = useParams();
    const router = useRouter();
    const [data, setData] = useState<AtsResponseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const idString = Array.isArray(id) ? id[0] : id;
                const res = await fetch(`/api/getSummary/${idString}`, {
                    method: "GET",
                });

                if (res.ok) {
                    const json = await res.json();

                    console.log(json.data)
                    setData(json.data);
                } else {
                    setError("Failed to fetch ATS results. Please try again later.");
                }
            } catch (err) {
                console.error(err);
                setError("An unexpected error occurred while fetching the results.");
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-600 font-medium animate-pulse">Analyzing your resume...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 max-w-md w-full text-center">
                    <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h2>
                    <p className="text-slate-500 text-sm mb-6">{error || "Could not load data."}</p>
                    <button
                        onClick={() => router.back()}
                        className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Animation delay utility
    let animDelay = 0;

    return (
        <div className="min-h-screen bg-slate-50/50 pb-24 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}} />

            {/* Navbar Area */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 py-2 pr-4 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block text-xs font-bold text-slate-400 uppercase tracking-wider">Report ID</span>
                        <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">{data._id}</span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">

                {/* Top Summary Section */}
                <section className="animate-fade-in-up bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start relative overflow-hidden">
                    {/* Decorative Background Blob */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-70 transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                    <div className="shrink-0 relative">
                        <ScoreRing score={data.score} />
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-5">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Resume Evaluation</h1>
                            <p className="text-slate-500 font-medium mt-2">
                                Evaluated on {new Date(data.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>

                        <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100 text-slate-700 leading-relaxed text-sm md:text-base shadow-sm">
                            <span className="font-semibold text-indigo-900 block mb-1">AI Summary</span>
                            {data.summary}
                        </div>
                    </div>
                </section>

                {/* Detailed Breakdown */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Detailed Breakdown</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(data.sections || {}).map(([key, sectionData], index) => {
                            animDelay += 100;
                            return (
                                <div key={key} className="animate-fade-in-up h-full" style={{ animationDelay: `${animDelay}ms` }}>
                                    <SectionCard keyName={key} data={sectionData!} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main >
        </div >
    )
}

export default AtsResponse;