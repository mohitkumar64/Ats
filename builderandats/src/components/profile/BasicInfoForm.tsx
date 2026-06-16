import React, { useState, useRef } from "react";
import { Upload, Save, User, Mail, Phone, MapPin, Briefcase, Link as LinkIcon, Code2, MessageCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface BasicInfoFormProps {
  data: any;
  onSave: (data: any) => Promise<void>;
}

export default function BasicInfoForm({ data, onSave }: BasicInfoFormProps) {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    bio: data?.bio || "",
    professionalTitle: data?.professionalTitle || "",
    location: data?.location || "",
    profileImage: data?.profileImage || "",
    portfolioWebsite: data?.portfolioWebsite || "",
    githubUrl: data?.githubUrl || "",
    linkedinUrl: data?.linkedinUrl || "",
    twitterUrl: data?.twitterUrl || "",
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append("img", file);

    try {
      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: formDataObj,
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setFormData((prev) => ({ ...prev, profileImage: result.url }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(result.message || "Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex sm:flex-nowrap items-center justify-between mb-2">
        <h3
          className="text-xl font-bold flex items-center gap-2.5"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "var(--text-primary)" }}
        >
          <User className="w-5 h-5" style={{ color: "var(--accent)" }} />
          Basic Information
        </h3>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary  lg:m-0  px-4 sm:px-5 py-2.5 text-sm flex items-center gap-2"
        >
          {saving ? <Loader2 className=" w-2 h-2 lg:w-4 lg:h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span className="hidden sm:flex">Save Changes</span>
        </button>
      </div>

      {/* Profile Image */}
      <div
        className="flex items-center gap-6 p-2 sm:p-3 md:p-5 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="relative w-24 h-24 rounded-full overflow-hidden flex items-center justify-center shrink-0"
          style={{
            background: "var(--accent-dim)",
            border: "2px solid rgba(232,117,74,0.20)",
          }}
        >
          {formData.profileImage ? (
            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10" style={{ color: "var(--accent)" }} />
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(8,10,15,0.65)" }}>
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Profile Picture</h4>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className=" px-1 md:px-4 py-2 rounded-xl text-[12px]   sm:text-sm font-medium flex items-center  gap-2 cursor-pointer"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid rgba(232,117,74,0.18)",
              color: "var(--accent)",
              transition: "all 200ms cubic-bezier(0.23,1,0.32,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--accent-mid)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--accent-dim)";
            }}
          >
            <Upload className="w-4 h-4" />
            Upload New Image
          </button>
          <p className="text-xs mt-2" style={{ color: "var(--text-tertiary)" }}>Recommended: Square image, max 2MB.</p>
        </div>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Professional Title</label>
          <div className="relative">
            <Briefcase className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              name="professionalTitle"
              value={formData.professionalTitle}
              onChange={handleChange}
              className="input-field"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="input-field"
            />
          </div>
          <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>Email cannot be changed.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              placeholder="+1 234 567 890"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Location</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="New York, USA"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Bio / About Me</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="textarea-field"
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Social Links */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
        <h4
          className="text-base font-bold mb-6"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", color: "var(--text-primary)" }}
        >
          Social & Links
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Portfolio Website</label>
            <div className="relative">
              <LinkIcon className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
              <input
                type="url"
                name="portfolioWebsite"
                value={formData.portfolioWebsite}
                onChange={handleChange}
                className="input-field"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>GitHub URL</label>
            <div className="relative">
              <Code2 className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="input-field"
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>LinkedIn URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="input-field"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Twitter URL</label>
            <div className="relative">
              <MessageCircle className="absolute left-3.5 top-3 w-4 h-4" style={{ color: "var(--text-tertiary)" }} />
              <input
                type="url"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                className="input-field"
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
