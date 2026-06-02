"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/Providers/userProvider";
import toast, { Toaster } from "react-hot-toast";
import BasicInfoForm from "@/components/profile/BasicInfoForm";
import EducationForm from "@/components/profile/EducationForm";
import ExperienceForm from "@/components/profile/ExperienceForm";
import SkillsForm from "@/components/profile/SkillsForm";
import CertificationsForm from "@/components/profile/CertificationsForm";
import AchievementsForm from "@/components/profile/AchievementsForm";
import { User, Book, Briefcase, Code, Award, Trophy, Loader2 , Paperclip } from "lucide-react";

import Footer from "@/components/Footer";
import ResearchForm from "@/components/profile/ResearchForm";

export default function ProfileDashboard() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "education", label: "Education", icon: Book },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "research", label: "Research", icon: Paperclip },
  ];

  const toastStyle = {
    background: "var(--surface)",
    color: "#F0F2F5",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: "14px",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfileData(data);
        } else {
          toast.error("Failed to load profile data", { style: toastStyle });
        }
      } catch (error) {
        console.error(error);
        toast.error("Error loading profile", { style: toastStyle });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (updatedFields: any) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        const updatedProfile = await res.json();
        setProfileData(updatedProfile);
        toast.success("Profile updated successfully!", { style: toastStyle });
      } else {
        toast.error("Failed to update profile", { style: toastStyle });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating", { style: toastStyle });
    }
  };

  if (loading) {
    return (
      <div className="page-ambient flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 animate-spin" style={{ color: "var(--accent)" }} />
          <p className="text-sm" style={{ color: "var(--text-tertiary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.06em" }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-ambient">
      <Toaster position="top-right" />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 relative z-10 pt-12">

        {/* Page title */}
        <div className="mb-10">
          <p
            className="mb-3"
            style={{
              color: "var(--text-tertiary)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Account
          </p>
          <h1
            style={{
              fontFamily: "'Syne', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
            }}
          >
            Profile Settings
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div
              className="p-4 rounded-2xl sticky top-28"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-pointer"
                      style={{
                        background: isActive ? "var(--accent-dim)" : "transparent",
                        color: isActive ? "var(--accent)" : "var(--text-secondary)",
                        border: isActive ? "1px solid rgba(232,117,74,0.18)" : "1px solid transparent",
                        transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "rgba(255,255,255,0.03)";
                          el.style.color = "var(--text-primary)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "transparent";
                          el.style.color = "var(--text-secondary)";
                        }
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: isActive ? "var(--accent)" : "var(--text-tertiary)" }}
                      />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow min-w-0">
            <div
              className="p-6 md:p-8 rounded-2xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {activeTab === "basic" && (
                <BasicInfoForm data={profileData} onSave={handleUpdate} />
              )}
              {activeTab === "education" && (
                <EducationForm data={profileData?.education || []} onSave={(education: any) => handleUpdate({ education })} />
              )}
              {activeTab === "experience" && (
                <ExperienceForm data={profileData?.experience || []} onSave={(experience: any) => handleUpdate({ experience })} />
              )}
              {activeTab === "skills" && (
                <SkillsForm data={profileData?.skills || {}} onSave={(skills: any) => handleUpdate({ skills })} />
              )}
              {activeTab === "certifications" && (
                <CertificationsForm data={profileData?.certifications || []} onSave={(certifications: any) => handleUpdate({ certifications })} />
              )}
              {activeTab === "achievements" && (
                <AchievementsForm data={profileData?.achievements || []} onSave={(achievements: any) => handleUpdate({ achievements })} />
              )}
              {activeTab === "research" && (
                <ResearchForm data={profileData?.research || []} onSave={(research: any) => handleUpdate({ research })} />
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
