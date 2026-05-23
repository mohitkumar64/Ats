import React, { useState } from "react";
import { Book, Save, Plus, Trash2, Loader2, GraduationCap, Building2, Calendar } from "lucide-react";

interface EducationFormProps {
  data: any[];
  onSave: (data: any[]) => Promise<void>;
}

export default function EducationForm({ data, onSave }: EducationFormProps) {
  const [educationList, setEducationList] = useState<any[]>(
    data?.length > 0 ? data : []
  );
  const [saving, setSaving] = useState(false);

  const handleAdd = () => {
    setEducationList([
      ...educationList,
      {
        institution: "",
        degree: "",
        specialization: "",
        startYear: "",
        endYear: "",
        cgpa: "",
        description: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(educationList);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-1">
            <Book className="text-indigo-400 w-6 h-6" />
            Education
          </h3>
          <p className="text-sm text-gray-400">Add your educational background.</p>
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
        {educationList.map((edu, index) => (
          <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group transition-all duration-300 hover:border-indigo-500/30">
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
              title="Remove Entry"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Institution / University</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleChange(index, "institution", e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
                    placeholder="Harvard University"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Degree</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleChange(index, "degree", e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
                    placeholder="Bachelor of Science"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Specialization / Major</label>
                <input
                  type="text"
                  value={edu.specialization}
                  onChange={(e) => handleChange(index, "specialization", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Start & End Year</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-full">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={edu.startYear}
                      onChange={(e) => handleChange(index, "startYear", e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                      placeholder="2018"
                    />
                  </div>
                  <span className="text-gray-500">-</span>
                  <input
                    type="text"
                    value={edu.endYear}
                    onChange={(e) => handleChange(index, "endYear", e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                    placeholder="2022 (or Present)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">CGPA / Grade</label>
                <input
                  type="text"
                  value={edu.cgpa}
                  onChange={(e) => handleChange(index, "cgpa", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
                  placeholder="3.8 / 4.0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Description / Activities</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  rows={3}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all resize-none"
                  placeholder="Relevant coursework, clubs, honors..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-4 border-2 border-dashed border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-2xl flex items-center justify-center gap-2 text-indigo-300 font-medium transition-all duration-300"
      >
        <Plus className="w-5 h-5" />
        Add Education
      </button>

      {educationList.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No education entries added yet. Click above to add one.
        </div>
      )}
    </form>
  );
}
