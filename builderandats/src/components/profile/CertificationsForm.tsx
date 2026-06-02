import React, { useState } from "react";
import { Award, Save, Plus, Trash2, Loader2, Link as LinkIcon, Calendar, Hash } from "lucide-react";

interface CertificationsFormProps {
  data: any[];
  onSave: (data: any[]) => Promise<void>;
}

export default function CertificationsForm({ data, onSave }: CertificationsFormProps) {
  const [certifications, setCertifications] = useState<any[]>(
    data?.length > 0 ? data : []
  );
  const [saving, setSaving] = useState(false);

  const handleAdd = () => {
    setCertifications([
      ...certifications,
      {
        title: "",
        issuer: "",
        issueDate: "",
        credentialId: "",
        credentialUrl: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(certifications);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
            <Award className="w-5 h-5" style={{ color: "var(--accent)" }} />
            Certifications
          </h3>
          <p className="text-sm text-gray-400">Add your professional certifications and licenses.</p>
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
        {certifications.map((cert, index) => (
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
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Certification Title</label>
                <div className="relative">
                  <Award className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="text"
                    value={cert.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    required
                    className="input-field"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleChange(index, "issuer", e.target.value)}
                  required
                  className="input-field-plain"
                  placeholder="Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Issue Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => handleChange(index, "issueDate", e.target.value)}
                    className="input-field"
                    placeholder="May 2023"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Credential ID</label>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => handleChange(index, "credentialId", e.target.value)}
                    className="input-field"
                    placeholder="ABC-123456"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Credential URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
                  <input
                    type="url"
                    value={cert.credentialUrl}
                    onChange={(e) => handleChange(index, "credentialUrl", e.target.value)}
                    className="input-field"
                    placeholder="https://credential.net/..."
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
        Add Certification
      </button>

      {certifications.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No certifications added yet. Click above to add one.
        </div>
      )}
    </form>
  );
}
