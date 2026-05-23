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
import { User, Book, Briefcase, Code, Award, Trophy, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfileData(data);
        } else {
          toast.error("Failed to load profile data");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error loading profile");
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
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* <Navbar /> */}
      <Toaster position="top-right" />

      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-100px] left-1/4 w-[600px] h-[400px] bg-indigo-500/8 blur-[150px] rounded-full" />
        <div className="absolute bottom-[200px] right-[-100px] w-[500px] h-[300px] bg-purple-500/8 blur-[120px] rounded-full" />
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 relative z-10 pt-28">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="glass-card p-4 rounded-2xl sticky top-28">
              <h2 className="text-xl font-bold mb-6 px-2 text-white">Profile Settings</h2>
              <nav className="space-y-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                        ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                  >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-400' : 'text-gray-500'}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow min-w-0">
            <div className="glass-card p-6 md:p-8 rounded-2xl">
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
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
