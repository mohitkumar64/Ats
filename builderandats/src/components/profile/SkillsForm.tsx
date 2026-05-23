import React, { useState } from "react";
import { Code, Save, Loader2, Database, Wrench, Cloud, Users, Cpu, FileJson } from "lucide-react";

interface SkillsFormProps {
  data: any;
  onSave: (data: any) => Promise<void>;
}

export default function SkillsForm({ data, onSave }: SkillsFormProps) {
  const [formData, setFormData] = useState({
    languages: Array.isArray(data?.languages) ? data.languages.join(", ") : "",
    frameworks: Array.isArray(data?.frameworks) ? data.frameworks.join(", ") : "",
    tools: Array.isArray(data?.tools) ? data.tools.join(", ") : "",
    databases: Array.isArray(data?.databases) ? data.databases.join(", ") : "",
    softSkills: Array.isArray(data?.softSkills) ? data.softSkills.join(", ") : "",
    cloud: Array.isArray(data?.cloud) ? data.cloud.join(", ") : "",
    devops: Array.isArray(data?.devops) ? data.devops.join(", ") : "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Convert back to arrays
    const formattedData = {
      languages: formData.languages.split(",").map((i) => i.trim()).filter(Boolean),
      frameworks: formData.frameworks.split(",").map((i) => i.trim()).filter(Boolean),
      tools: formData.tools.split(",").map((i) => i.trim()).filter(Boolean),
      databases: formData.databases.split(",").map((i) => i.trim()).filter(Boolean),
      softSkills: formData.softSkills.split(",").map((i) => i.trim()).filter(Boolean),
      cloud: formData.cloud.split(",").map((i) => i.trim()).filter(Boolean),
      devops: formData.devops.split(",").map((i) => i.trim()).filter(Boolean),
    };

    await onSave(formattedData);
    setSaving(false);
  };

  const categories = [
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
            <Code className="text-indigo-400 w-6 h-6" />
            Skills
          </h3>
          <p className="text-sm text-gray-400">Add your technical and soft skills (comma separated).</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className={cat.name === "softSkills" ? "md:col-span-2" : ""}>
            <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
              <cat.icon className="w-4 h-4 text-indigo-400" />
              {cat.label}
            </label>
            <input
              type="text"
              name={cat.name}
              value={(formData as any)[cat.name]}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder={cat.placeholder}
            />
          </div>
        ))}
      </div>
    </form>
  );
}
