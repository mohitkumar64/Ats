"use client";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  AlertCircle,
  Lightbulb,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  FileText,
  Layout,
  Award,
  Briefcase,
  Code,
  Hash,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  Download,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

// ---------------- TYPES ----------------

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

// ---------------- SECTION CONFIG ----------------

const sectionConfig: Record<
  string,
  {
    title: string;
    icon: any;
    glow: string;
  }
> = {
  basic_info: {
    title: "Basic Information",
    icon: FileText,
    glow: "from-indigo-500/20 to-blue-500/20",
  },

  structure: {
    title: "Resume Structure",
    icon: Layout,
    glow: "from-purple-500/20 to-indigo-500/20",
  },

  skills: {
    title: "Skills Match",
    icon: Award,
    glow: "from-emerald-500/20 to-green-500/20",
  },

  experience: {
    title: "Experience",
    icon: Briefcase,
    glow: "from-orange-500/20 to-amber-500/20",
  },

  projects: {
    title: "Projects",
    icon: Code,
    glow: "from-pink-500/20 to-rose-500/20",
  },

  keywords: {
    title: "Keywords",
    icon: Hash,
    glow: "from-cyan-500/20 to-blue-500/20",
  },
};

// ---------------- FORMAT TEXT ----------------

const formatText = (text: string) => {

  if (!text) return "";

  return text.replace(
    /\*\*(.*?)\*\*/g,
    `<strong class="font-semibold text-white">$1</strong>`
  );
};

// ---------------- SCORE RING ----------------

const ScoreRing = ({
  score,
}: {
  score: number;
}) => {

  const radius = 70;

  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (score / 100) * circumference;

  return (

    <div className="relative flex items-center justify-center">

      <div className="absolute w-72 h-72 rounded-full bg-indigo-500/20 blur-[120px]"></div>

      <svg className="w-72 h-72 transform -rotate-90 relative z-10">

        <circle
          cx="144"
          cy="144"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-white/5"
        />

        <circle
          cx="144"
          cy="144"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-[1800ms]"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#6366f1"
            />

            <stop
              offset="100%"
              stopColor="#a855f7"
            />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute z-20 flex flex-col items-center">

        <span className="text-4xl font-black bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
          {score}
        </span>

        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-semibold mt-2">
          ATS SCORE
        </span>

        <div className="mt-4 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold">

          Resume Ready ✔

        </div>
      </div>
    </div>
  );
};

// ---------------- PROGRESS BAR ----------------

const ProgressBar = ({
  value,
}: {
  value: number;
}) => (

  <div className="mt-4">

    <div className="flex items-center justify-between mb-2">

      <span className="text-xs text-gray-400 uppercase tracking-wider">
        Optimization
      </span>

      <span className="text-sm font-bold text-white">
        {value}%
      </span>

    </div>

    <div className="h-2 rounded-full bg-white/5 overflow-hidden border border-white/5">

      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
        style={{
          width: `${value}%`
        }}
      ></div>

    </div>
  </div>
);

// ---------------- SECTION CARD ----------------

const SectionCard = ({
  keyName,
  data,
}: {
  keyName: string;
  data: SectionData;
}) => {

  const config =
    sectionConfig[keyName];

  if (!config) return null;

  const Icon = config.icon;

  const score =
    data.match_percentage ??
    data.score;

  return (

    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-7 shadow-[0_0_40px_rgba(99,102,241,0.08)] hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(99,102,241,0.18)] transition-all duration-500 h-full">

      <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-40 bg-gradient-to-r ${config.glow}`}></div>

      <div className="relative z-10 flex items-start justify-between mb-6">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-300">

            <Icon className="w-7 h-7" />

          </div>

          <div>

            <h3 className="text-xl font-black text-white">
              {config.title}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              AI analyzed section
            </p>

          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm font-bold">

          {data.score} pts

        </div>
      </div>

      <ProgressBar value={score} />

      {/* ISSUES */}
      {data.issues &&
        data.issues.length > 0 && (

          <div className="mt-8">

            <h4 className="flex items-center gap-2 text-sm font-bold text-rose-300 mb-4">

              <AlertCircle className="w-4 h-4" />

              Areas to Improve

            </h4>

            <div className="space-y-4">

              {data.issues.map(
                (issue, idx) => (

                  <div
                    key={idx}
                    className="flex gap-3 text-sm text-gray-300 leading-relaxed"
                  >

                    <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 shrink-0"></div>

                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          formatText(issue),
                      }}
                    />

                  </div>
                )
              )}
            </div>
          </div>
        )}

      {/* ADVICE */}
      {data.advice &&
        data.advice.length > 0 && (

          <div className="mt-8">

            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-300 mb-4">

              <Lightbulb className="w-4 h-4" />

              AI Recommendations

            </h4>

            <div className="space-y-4">

              {data.advice.map(
                (item, idx) => (

                  <div
                    key={idx}
                    className="flex gap-3 text-sm text-gray-300 leading-relaxed"
                  >

                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0"></div>

                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          formatText(item),
                      }}
                    />

                  </div>
                )
              )}
            </div>
          </div>
        )}
    </div>
  );
};

// ---------------- MAIN PAGE ----------------

const AtsResponse = () => {

  const { id } = useParams();

  const router = useRouter();

  const [data, setData] =
    useState<AtsResponseData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    async function fetchData() {

      try {

        setLoading(true);

        const idString =
          Array.isArray(id)
            ? id[0]
            : id;

        const res = await fetch(
          `/api/getSummary/${idString}`
        );

        if (res.ok) {

          const json =
            await res.json();

          setData(json.data);

        } else {

          setError(
            "Failed to fetch ATS results."
          );
        }

      } catch (err) {

        console.error(err);

        setError(
          "Unexpected error occurred."
        );

      } finally {

        setTimeout(() => {
          setLoading(false);
        }, 1800);
      }
    }

    if (id) fetchData();

  }, [id]);

  // ---------------- DOWNLOAD PDF ----------------

  const handleDownload = () => {

    if (!data) return;

    const printWindow =
      window.open("", "", "width=1200,height=900");

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>ATS Report</title>

          <style>

            body{
              font-family: Arial, sans-serif;
              background:white;
              color:#111827;
              padding:40px;
            }

            h1{
              font-size:42px;
              margin-bottom:12px;
            }

            h2{
              margin-top:35px;
              margin-bottom:15px;
            }

            .score{
              font-size:72px;
              font-weight:800;
              color:#4f46e5;
            }

            .card{
              border:1px solid #e5e7eb;
              border-radius:18px;
              padding:25px;
              margin-bottom:25px;
            }

            ul{
              padding-left:20px;
            }

            li{
              margin-bottom:10px;
            }

          </style>
        </head>

        <body>

          <h1>ATS Resume Report</h1>

          <div class="score">
            ${data.score}/100
          </div>

          <p>
            ${data.summary}
          </p>

          ${Object.entries(data.sections)
            .map(([key, section]) => `
              <div class="card">

                <h2>
                  ${sectionConfig[key]?.title}
                </h2>

                <p>
                  Score:
                  ${section?.score}
                </p>

                ${
                  section?.issues?.length
                    ? `
                    <h3>Issues</h3>

                    <ul>
                      ${section.issues.map(
                        i => `<li>${i}</li>`
                      ).join("")}
                    </ul>
                  `
                    : ""
                }

                ${
                  section?.advice?.length
                    ? `
                    <h3>Recommendations</h3>

                    <ul>
                      ${section.advice.map(
                        i => `<li>${i}</li>`
                      ).join("")}
                    </ul>
                  `
                    : ""
                }

              </div>
            `).join("")}

        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // ---------------- LOADING ----------------

  if (loading) {

    return (

      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden text-white">

        <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full"></div>

        <Loader2 className="w-14 h-14 animate-spin text-indigo-400 mb-6" />

        <h2 className="text-3xl font-black">
          AI Analyzing Resume...
        </h2>

      </div>
    );
  }

  // ---------------- ERROR ----------------

  if (error || !data) {

    return (

      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">

        <div className="text-center">

          <AlertCircle className="w-16 h-16 text-rose-400 mx-auto mb-6" />

          <h2 className="text-3xl font-black">
            Something went wrong
          </h2>

          <p className="text-gray-400 mt-4">
            {error}
          </p>

        </div>
      </div>
    );
  }

  // ---------------- MAIN UI ----------------

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

      {/* BACKGROUND */}
      <div className="absolute top-[-200px] left-[-120px] w-[450px] h-[450px] bg-indigo-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-120px] w-[450px] h-[450px] bg-purple-500/20 blur-[140px] rounded-full"></div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#020617]/70 backdrop-blur-2xl">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <button
            onClick={() =>
              router.back()
            }
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >

            <ArrowLeft className="w-5 h-5" />

            Back

          </button>

          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:scale-[1.02] transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.35)]"
          >

            <Download className="w-5 h-5" />

            Download Report

          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12 grid lg:grid-cols-2 gap-12 items-center">

        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8">

            <Sparkles className="w-4 h-4" />

            AI Resume Intelligence

          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight">

            ATS Analysis <br />

            <span className="text-gray-400">
              Complete Report
            </span>

          </h1>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 text-gray-300 leading-relaxed shadow-[0_0_40px_rgba(99,102,241,0.08)]">

            <div className="flex items-center gap-2 mb-4 text-indigo-300 font-semibold">

              <BrainCircuit className="w-5 h-5" />

              AI Summary

            </div>

            {data.summary}

          </div>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={() =>
                router.push("/ats")
              }
              className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3 text-gray-300"
            >

              <RefreshCw className="w-5 h-5" />

              Analyze Another

            </button>
          </div>
        </div>

        <div className="flex justify-center">

          <ScoreRing
            score={data.score}
          />

        </div>
      </section>

      {/* INSIGHTS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-10">

        <div className="grid md:grid-cols-3 gap-6">

          <InsightCard
            title="Recruiter Readability"
            value="Excellent"
            color="emerald"
          />

          <InsightCard
            title="ATS Compatibility"
            value={`${data.score}%`}
            color="indigo"
          />

          <InsightCard
            title="Optimization Level"
            value={
              data.score > 80
                ? "Strong"
                : "Moderate"
            }
            color="purple"
          />

        </div>
      </section>

      {/* SECTIONS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {Object.entries(
            data.sections || {}
          ).map(
            ([key, sectionData]) => (

              <SectionCard
                key={key}
                keyName={key}
                data={sectionData!}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

// ---------------- INSIGHT CARD ----------------

const InsightCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => (

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:-translate-y-1 transition-all duration-300">

    <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 border border-${color}-400/20 flex items-center justify-center mb-5`}>

      <CheckCircle2 className={`w-6 h-6 text-${color}-300`} />

    </div>

    <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-3">
      {title}
    </h3>

    <p className="text-3xl font-black text-white">
      {value}
    </p>

  </div>
);

export default AtsResponse;