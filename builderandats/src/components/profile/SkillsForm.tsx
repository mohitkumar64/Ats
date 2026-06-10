import React, { useState, useEffect } from "react";
import { Code, Save, Loader2, Plus, Trash2 } from "lucide-react";

interface SkillsFormProps {
  data: any;
  onSave: (data: any) => Promise<void>;
}

export default function SkillsForm({ data, onSave }: SkillsFormProps) {
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string; value: string }[]>([]);

  // Initialize from data prop
  useEffect(() => {
    if (data) {
      // If data is in Map/Object format (Record<string, string[]>)
      if (typeof data === "object" && data !== null && !Array.isArray(data)) {
        // Safe check to avoid rendering Map prototype or other non-plain objects improperly
        const entries = data instanceof Map ? Array.from(data.entries()) : Object.entries(data);
        const parsed = entries.map(([key, val]) => ({
          id: Math.random().toString(36).substring(7),
          name: key,
          value: Array.isArray(val) ? val.join(", ") : String(val),
        }));
        setCategories(parsed);
      } else {
        // If data is empty or in a legacy format
        setCategories([]);
      }
    }
  }, [data]);

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      {
        id: Math.random().toString(36).substring(7),
        name: "",
        value: "",
      },
    ]);
  };

  const handleRemoveCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleCategoryChange = (id: string, field: "name" | "value", val: string) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === id) {
          return { ...cat, [field]: val };
        }
        return cat;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const formattedData: Record<string, string[]> = {};
    categories.forEach((cat) => {
      const trimmedName = cat.name.trim();
      if (trimmedName) {
        formattedData[trimmedName] = cat.value
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean);
      }
    });

    await onSave(formattedData);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
            <Code className="w-5 h-5" style={{ color: "var(--accent)" }} />
            Skills
          </h3>
          <p className="text-sm text-gray-400">
            Organize your skills by categories (e.g. Front End, Backend, Databases) and enter their values.
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

      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-gray-400">
            <Code className="w-8 h-8 mx-auto mb-3 opacity-40 text-[var(--accent)]" />
            <p className="text-sm mb-4">No skill categories added yet.</p>
            <button
              type="button"
              onClick={handleAddCategory}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm text-white transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {categories.map((cat, index) => (
                <div
                  key={cat.id}
                  className="flex flex-col md:flex-row gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] relative group hover:border-[rgba(232,117,74,0.18)] transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(cat.id)}
                    className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 z-10 md:static md:opacity-100 md:self-end md:mb-1"
                    title="Remove Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex-1 space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                      Category
                    </label>
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => handleCategoryChange(cat.id, "name", e.target.value)}
                      placeholder="e.g. Front End, Databases"
                      className="input-field-plain"
                      required
                    />
                  </div>

                  <div className="flex-[2] space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                      Skills
                    </label>
                    <input
                      type="text"
                      value={cat.value}
                      onChange={(e) => handleCategoryChange(cat.id, "value", e.target.value)}
                      placeholder="e.g. React, HTML, CSS (comma separated)"
                      className="input-field-plain"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddCategory}
              className="w-full py-4 border-2 border-dashed border-white/10 hover:border-[rgba(232,117,74,0.30)] hover:bg-[rgba(232,117,74,0.03)] rounded-2xl flex items-center justify-center gap-2 text-[#E8754A] font-medium transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </>
        )}
      </div>
    </form>
  );
}
