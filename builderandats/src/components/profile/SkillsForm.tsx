import React, { useState } from "react";
import { Code, Save, Loader2, Database, Wrench, Cloud, Users, Cpu, FileJson, Briefcase } from "lucide-react";

interface SkillsFormProps {
  data: any;
  onSave: (data: any) => Promise<void>;
}

const COMMON_NON_TECHNICAL_SKILLS = [
  "Communication",
  "Leadership",
  "Team Management",
  "Project Management",
  "Customer Service",
  "Problem Solving",
  "Critical Thinking",
  "Time Management",
  "Negotiation",
  "Decision Making",
  "Organizational Skills",
  "Legal Research",
  "Medical Knowledge",
  "Patient Care",
  "Clinical Skills",
  "Counseling",
  "Public Speaking",
  "Writing & Documentation",
];

export default function SkillsForm({ data, onSave }: SkillsFormProps) {
  const [activeTab, setActiveTab] = useState<"technical" | "nonTechnical">("technical");
  const [activeSubTab, setActiveSubTab] = useState<"common" | "other">("common");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    technical: {
      languages: Array.isArray(data?.technical?.languages) ? data.technical.languages.join(", ") : "",
      frameworks: Array.isArray(data?.technical?.frameworks) ? data.technical.frameworks.join(", ") : "",
      tools: Array.isArray(data?.technical?.tools) ? data.technical.tools.join(", ") : "",
      databases: Array.isArray(data?.technical?.databases) ? data.technical.databases.join(", ") : "",
      softSkills: Array.isArray(data?.technical?.softSkills) ? data.technical.softSkills.join(", ") : "",
      cloud: Array.isArray(data?.technical?.cloud) ? data.technical.cloud.join(", ") : "",
      devops: Array.isArray(data?.technical?.devops) ? data.technical.devops.join(", ") : "",
    },
    nonTechnical: {
      commonSkills: Array.isArray(data?.nonTechnical?.commonSkills) ? data.nonTechnical.commonSkills : [],
      otherSkills: Array.isArray(data?.nonTechnical?.otherSkills) ? data.nonTechnical.otherSkills.join(", ") : "",
    },
  });

  const handleTechnicalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      technical: { ...formData.technical, [e.target.name]: e.target.value },
    });
  };

  const handleCommonSkillToggle = (skill: string) => {
    setFormData({
      ...formData,
      nonTechnical: {
        ...formData.nonTechnical,
        commonSkills: formData.nonTechnical.commonSkills.includes(skill)
          ? formData.nonTechnical.commonSkills.filter((s) => s !== skill)
          : [...formData.nonTechnical.commonSkills, skill],
      },
    });
  };

  const handleOtherSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      nonTechnical: { ...formData.nonTechnical, otherSkills: e.target.value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formattedData = {
      technical: {
        languages: formData.technical.languages.split(",").map((i) => i.trim()).filter(Boolean),
        frameworks: formData.technical.frameworks.split(",").map((i) => i.trim()).filter(Boolean),
        tools: formData.technical.tools.split(",").map((i) => i.trim()).filter(Boolean),
        databases: formData.technical.databases.split(",").map((i) => i.trim()).filter(Boolean),
        softSkills: formData.technical.softSkills.split(",").map((i) => i.trim()).filter(Boolean),
        cloud: formData.technical.cloud.split(",").map((i) => i.trim()).filter(Boolean),
        devops: formData.technical.devops.split(",").map((i) => i.trim()).filter(Boolean),
      },
      nonTechnical: {
        commonSkills: formData.nonTechnical.commonSkills,
        otherSkills: formData.nonTechnical.otherSkills.split(",").map((i) => i.trim()).filter(Boolean),
      },
    };

    await onSave(formattedData);
    setSaving(false);
  };

  const technicalCategories = [
    { name: "languages", label: "Programming Languages", icon: Code, placeholder: "JavaScript, Python, C++" },
    { name: "frameworks", label: "Frameworks & Libraries", icon: FileJson, placeholder: "React, Node.js, Django" },
    { name: "databases", label: "Databases", icon: Database, placeholder: "MongoDB, PostgreSQL, Redis" },
    { name: "cloud", label: "Cloud Platforms", icon: Cloud, placeholder: "AWS, GCP, Azure" },
    { name: "devops", label: "DevOps & CI/CD", icon: Cpu, placeholder: "Docker, Kubernetes, GitHub Actions" },
    { name: "tools", label: "Developer Tools", icon: Wrench, placeholder: "Git, VS Code, Postman" },
    { name: "softSkills", label: "Soft Skills", icon: Users, placeholder: "Leadership, Communication, Teamwork" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
            <Code className="text-indigo-400 w-6 h-6" />
            Skills
          </h3>
          <p className="text-sm text-gray-400">
            {activeTab === "technical"
              ? "Add your technical and soft skills (comma separated)."
              : "Add non-technical skills relevant to your profession."}
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary px-5 py-2 text-sm flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-3 border-b border-white/10 mb-6">
        <button
          type="button"
          onClick={() => {
            setActiveTab("technical");
            setActiveSubTab("common");
          }}
          className={`px-4 py-3 text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "technical"
              ? "text-indigo-400 border-b-2 border-indigo-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Code className="w-4 h-4" />
          Technical Skills
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("nonTechnical");
            setActiveSubTab("common");
          }}
          className={`px-4 py-3 text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === "nonTechnical"
              ? "text-indigo-400 border-b-2 border-indigo-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Non-Technical Skills
        </button>
      </div>

      {/* Technical Skills Tab */}
      {activeTab === "technical" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicalCategories.map((cat, index) => (
            <div key={index} className={cat.name === "softSkills" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                <cat.icon className="w-4 h-4 text-indigo-400" />
                {cat.label}
              </label>
              <input
                type="text"
                name={cat.name}
                value={(formData.technical as any)[cat.name]}
                onChange={handleTechnicalChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
                placeholder={cat.placeholder}
              />
            </div>
          ))}
        </div>
      )}

      {/* Non-Technical Skills Tab */}
      {activeTab === "nonTechnical" && (
        <div className="space-y-6">
          {/* Sub Tabs */}
          <div className="flex gap-2 border-b border-white/10 pb-4">
            <button
              type="button"
              onClick={() => setActiveSubTab("common")}
              className={`px-3 py-2 text-sm font-medium transition-all ${
                activeSubTab === "common"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Common Skills
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("other")}
              className={`px-3 py-2 text-sm font-medium transition-all ${
                activeSubTab === "other"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Other Skills
            </button>
          </div>

          {/* Common Skills Sub-Tab */}
          {activeSubTab === "common" && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-4">Select common skills:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {COMMON_NON_TECHNICAL_SKILLS.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 p-3 rounded-lg border border-white/10 hover:border-indigo-400/50 hover:bg-indigo-500/5 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.nonTechnical.commonSkills.includes(skill)}
                      onChange={() => handleCommonSkillToggle(skill)}
                      className="w-4 h-4 accent-indigo-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-300">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Other Skills Sub-Tab */}
          {activeSubTab === "other" && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Add other skills (comma separated):</label>
              <input
                type="text"
                name="otherSkills"
                value={formData.nonTechnical.otherSkills}
                onChange={handleOtherSkillsChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
                placeholder="e.g., Litigation, Pediatrics, Legal Writing"
              />
            </div>
          )}
        </div>
      )}
    </form>
  );
}
