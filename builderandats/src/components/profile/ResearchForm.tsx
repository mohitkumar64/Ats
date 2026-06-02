import React, { useState } from "react";
import {
  FlaskConical,
  Save,
  Plus,
  Trash2,
  Loader2,
  Link as LinkIcon,
  Calendar,
} from "lucide-react";

interface ResearchFormProps {
  data: any[];
  onSave: (data: any[]) => Promise<void>;
}

export default function ResearchForm({
  data,
  onSave,
}: ResearchFormProps) {
  const [research, setResearch] = useState<any[]>(
    data?.length > 0 ? data : []
  );

  const [saving, setSaving] = useState(false);

  const handleAdd = () => {
    setResearch([
      ...research,
      {
        title: "",
        description: "",
        date: "",
        link: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    setResearch(research.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...research];
    updated[index][field] = value;
    setResearch(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await onSave(research);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
            <FlaskConical className="w-5 h-5" style={{ color: "var(--accent)" }} />
            Research
          </h3>

          <p className="text-sm text-gray-400">
            Add research papers, publications, academic projects, or studies.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-primary px-5 py-2 text-sm flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {research.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group transition-all duration-300 hover:border-[rgba(232,117,74,0.18)]"
          >
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
              title="Remove Research"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Research Title
                </label>

                <div className="relative">
                  <FlaskConical className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleChange(index, "title", e.target.value)
                    }
                    required
                    className="input-field"
                    placeholder="Machine Learning Based Resume Screening"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Publication / Research Date
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />

                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) =>
                      handleChange(index, "date", e.target.value)
                    }
                    className="input-field"
                    placeholder="March 2025"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Abstract / Description
                </label>

                <textarea
                  value={item.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  rows={3}
                  className="textarea-field"
                  placeholder="Summarize the research objective, methodology, findings, and impact..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Publication / Paper Link (Optional)
                </label>

                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />

                  <input
                    type="url"
                    value={item.link}
                    onChange={(e) =>
                      handleChange(index, "link", e.target.value)
                    }
                    className="input-field"
                    placeholder="https://research-paper-link.com"
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
        Add Research
      </button>

      {research.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No research entries added yet. Click above to add one.
        </div>
      )}
    </form>
  );
}