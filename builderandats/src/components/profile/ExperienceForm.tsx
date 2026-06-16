import React, { useState } from "react";
import { Briefcase, Save, Plus, Trash2, Loader2, Building, Calendar, Star, Code } from "lucide-react";

interface ExperienceFormProps {
  data: any[];
  onSave: (data: any[]) => Promise<void>;
}

export default function ExperienceForm({ data, onSave }: ExperienceFormProps) {
  const [experienceList, setExperienceList] = useState<any[]>(
    data?.length > 0 ? data.map(exp => ({
      ...exp,
      // Convert arrays back to comma-separated strings for the form inputs
      achievements: Array.isArray(exp.achievements) ? exp.achievements.join(", ") : exp.achievements || "",
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(", ") : exp.technologies || "",
    })) : []
  );
  const [saving, setSaving] = useState(false);

  const handleAdd = () => {
    setExperienceList([
      ...experienceList,
      {
        companyName: "",
        role: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        achievements: "",
        technologies: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...experienceList];
    updated[index][field] = value;
    setExperienceList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Format arrays before saving
    const formattedData = experienceList.map(exp => ({
      ...exp,
      achievements: exp.achievements.split(",").map((item: string) => item.trim()).filter(Boolean),
      technologies: exp.technologies.split(",").map((item: string) => item.trim()).filter(Boolean),
    }));

    await onSave(formattedData);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
            <Briefcase className="w-5 h-5" style={{ color: "var(--accent)" }} />
            Experience
          </h3>
          <p className="text-sm text-gray-400">Add your work experience.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary px-3 md:px-5 py-2  text-[12px] sm:text-sm flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {experienceList.map((exp, index) => (
          <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group transition-all duration-300 hover:border-[rgba(232,117,74,0.18)]">
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 z-10"
              title="Remove Entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Company Name</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="text"
                    value={exp.companyName}
                    onChange={(e) => handleChange(index, "companyName", e.target.value)}
                    required
                    className="input-field"
                    placeholder="Tech Corp Inc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Role / Position</label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleChange(index, "role", e.target.value)}
                    required
                    className="input-field"
                    placeholder="Senior Frontend Developer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Start & End Date</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-full">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleChange(index, "startDate", e.target.value)}
                      className="input-field"
                      placeholder="Jan 2020"
                    />
                  </div>
                  <span className="text-gray-500">-</span>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                    disabled={exp.current}
                    className={`input-field-plain ${exp.current ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Present"
                  />
                </div>
              </div>

              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={exp.current}
                  onChange={(e) => handleChange(index, "current", e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer accent-[#E8754A]"
                />
                <label htmlFor={`current-${index}`} className="ml-2 text-sm text-gray-400 cursor-pointer">
                  I currently work here
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Job Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  rows={3}
                  className="textarea-field"
                  placeholder="Describe your responsibilities..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-500" />
                  Key Achievements (Comma separated)
                </label>
                <textarea
                  value={exp.achievements}
                  onChange={(e) => handleChange(index, "achievements", e.target.value)}
                  rows={2}
                  className="textarea-field"
                  placeholder="Increased revenue by 20%, Led team of 5 engineers..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#4ECCA3]" />
                  Technologies Used (Comma separated)
                </label>
                <input
                  type="text"
                  value={exp.technologies}
                  onChange={(e) => handleChange(index, "technologies", e.target.value)}
                  className="input-field-plain"
                  placeholder="React, Node.js, TypeScript, AWS..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-4 border-2 border-dashed border-white/10 hover:border-[rgba(232,117,74,0.30)] hover:bg-[rgba(232,117,74,0.03)] rounded-2xl flex items-center justify-center gap-2 text-[#E8754A] font-medium transition-all duration-300"
      >
        <Plus className="w-5 h-5" />
        Add Experience
      </button>

      {experienceList.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No experience entries added yet. Click above to add one.
        </div>
      )}
    </form>
  );
}
