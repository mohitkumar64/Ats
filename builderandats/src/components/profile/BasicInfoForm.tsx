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
    <form onSubmit={handleSubmit} className="space-y-8 text-white">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="text-indigo-400 w-6 h-6" />
          Basic Information
        </h3>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary px-5 py-2 text-sm flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      {/* Profile Image */}
      <div className="flex items-center gap-6 p-5 bg-white/5 border border-white/10 rounded-2xl">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
          {formData.profileImage ? (
            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-indigo-300" />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Profile Picture</h4>
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
            className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload New Image
          </button>
          <p className="text-xs text-gray-500 mt-2">Recommended: Square image, max 2MB.</p>
        </div>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Professional Title</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="professionalTitle"
              value={formData.professionalTitle}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm outline-none text-gray-400 cursor-not-allowed"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder="+1 234 567 890"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder="New York, USA"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Bio / About Me</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Social Links */}
      <h4 className="text-lg font-medium text-white pt-4 border-t border-white/10">Social & Links</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Portfolio Website</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="url"
              name="portfolioWebsite"
              value={formData.portfolioWebsite}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">GitHub URL</label>
          <div className="relative">
            <Code2 className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder="https://github.com/username"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">LinkedIn URL</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Twitter URL</label>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="url"
              name="twitterUrl"
              value={formData.twitterUrl}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-white transition-all"
              placeholder="https://twitter.com/username"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

