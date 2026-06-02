import React, { useState } from "react";
import { Trophy, Save, Plus, Trash2, Loader2, Link as LinkIcon, Calendar } from "lucide-react";

interface AchievementsFormProps {
  data: any[];
  onSave: (data: any[]) => Promise<void>;
}

export default function AchievementsForm({ data, onSave }: AchievementsFormProps) {
  const [achievements, setAchievements] = useState<any[]>(
    data?.length > 0 ? data : []
  );
  const [saving, setSaving] = useState(false);

  const handleAdd = () => {
    setAchievements([
      ...achievements,
      {
        title: "",
        description: "",
        date: "",
        link: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...achievements];
    updated[index][field] = value;
    setAchievements(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(achievements);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5" style={{ color: "var(--accent)" }} />
            Achievements
          </h3>
          <p className="text-sm text-gray-400">Add hackathons, awards, or open source contributions.</p>
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

      <div className="space-y-6">
        {achievements.map((achieve, index) => (
          <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group transition-all duration-300 hover:border-[rgba(232,117,74,0.18)]">
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
              title="Remove Entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Title / Award Name</label>
                <div className="relative">
                  <Trophy className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="text"
                    value={achieve.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    required
                    className="input-field"
                    placeholder="1st Place - Global Hackathon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="text"
                    value={achieve.date}
                    onChange={(e) => handleChange(index, "date", e.target.value)}
                    className="input-field"
                    placeholder="Oct 2023"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Description</label>
                <textarea
                  value={achieve.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  rows={2}
                  className="textarea-field"
                  placeholder="Briefly describe the achievement..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Related Link (Optional)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="url"
                    value={achieve.link}
                    onChange={(e) => handleChange(index, "link", e.target.value)}
                    className="input-field"
                    placeholder="https://..."
                  />
                </div>
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
        Add Achievement
      </button>

      {achievements.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No achievements added yet. Click above to add one.
        </div>
      )}
    </form>
  );
}
