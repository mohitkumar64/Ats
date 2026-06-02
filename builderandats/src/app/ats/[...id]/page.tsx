"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  Sparkles,
  BrainCircuit,
  Download,
  RefreshCw,
} from "lucide-react";

import { AtsResponseData } from "@/components/atsResponse/types";
import ScoreRing from "@/components/atsResponse/ScoreRing";
import SectionCard from "@/components/atsResponse/SectionCard";
import InsightCard from "@/components/atsResponse/InsightCard";
import { generateReportHtml } from "@/components/atsResponse/generateReport";

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
        const res = await fetch(`/api/getSummary/${idString}`);

        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        } else {
          setError("Failed to fetch ATS results.");
        }
      } catch (err) {
        console.error(err);
        setError("Unexpected error occurred.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1800);
      }
    }

    if (id) fetchData();
  }, [id]);

  const handleDownload = () => {
    if (!data) return;
    const printWindow = window.open("", "", "width=1200,height=900");
    if (!printWindow) return;

    printWindow.document.write(generateReportHtml(data));
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  // Loading state
  if (loading) {
    return (
      <div className="page-ambient flex flex-col items-center justify-center">
        <Loader2
          className="w-14 h-14 animate-spin mb-6"
          style={{ color: "var(--accent)" }}
        />
        <h2 className="text-3xl font-black">AI Analyzing Resume...</h2>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="page-ambient flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-rose-400 mx-auto mb-6" />
          <h2 className="text-3xl font-black">Something went wrong</h2>
          <p className="text-gray-400 mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden text-white"
      style={{ background: "var(--bg)" }}
    >
      {/* Navbar */}
      <header
        className="sticky top-0 z-30 border-b border-white/10 backdrop-blur-2xl"
        style={{ background: "rgba(8,10,15,0.70)" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-3 text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleDownload}
            className="btn-primary px-6 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all flex items-center gap-3"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{
              border: "1px solid rgba(232,117,74,0.18)",
              background: "var(--accent-dim)",
              color: "var(--accent)",
            }}
          >
            <Sparkles className="w-4 h-4" />
            AI Resume Intelligence
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            ATS Analysis <br />
            <span className="text-gray-400">Complete Report</span>
          </h1>

          <div
            className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 text-gray-300 leading-relaxed"
            style={{ boxShadow: "0 0 40px rgba(232,117,74,0.05)" }}
          >
            <div
              className="flex items-center gap-2 mb-4 font-semibold"
              style={{ color: "var(--accent)" }}
            >
              <BrainCircuit className="w-5 h-5" />
              AI Summary
            </div>
            {data.summary}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/ats")}
              className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-3 text-gray-300"
            >
              <RefreshCw className="w-5 h-5" />
              Analyze Another
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <ScoreRing score={data.score} />
        </div>
      </section>

      {/* Insights */}
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
            color="amber"
          />
          <InsightCard
            title="Optimization Level"
            value={data.score > 80 ? "Strong" : "Moderate"}
            color="purple"
          />
        </div>
      </section>

      {/* Section Cards */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(data.sections || {}).map(
            ([key, sectionData]) => (
              <SectionCard key={key} keyName={key} data={sectionData!} />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default AtsResponse;