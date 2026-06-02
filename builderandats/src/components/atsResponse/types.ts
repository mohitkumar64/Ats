import {
  FileText,
  Layout,
  Award,
  Briefcase,
  Code,
  Hash,
} from "lucide-react";

export interface SectionData {
  score: number;
  issues?: string[];
  advice?: string[];
  missing_skills?: string[];
  missing_keywords?: string[];
  match_percentage?: number;
}

export interface AtsResponseData {
  _id: string;
  score: number;
  summary: string;
  createdAt: string;
  sections: {
    basic_info: SectionData;
    structure: SectionData;
    skills: SectionData;
    experience: SectionData;
    projects: SectionData;
    keywords: SectionData;
    [key: string]: SectionData | undefined;
  };
}

export const sectionConfig: Record<
  string,
  { title: string; icon: any; glow: string }
> = {
  basic_info: {
    title: "Basic Information",
    icon: FileText,
    glow: "from-[rgba(232,117,74,0.15)] to-[rgba(240,160,112,0.10)]",
  },
  structure: {
    title: "Resume Structure",
    icon: Layout,
    glow: "from-[rgba(78,204,163,0.12)] to-[rgba(78,204,163,0.06)]",
  },
  skills: {
    title: "Skills Match",
    icon: Award,
    glow: "from-emerald-500/20 to-green-500/20",
  },
  experience: {
    title: "Experience",
    icon: Briefcase,
    glow: "from-orange-500/20 to-amber-500/20",
  },
  projects: {
    title: "Projects",
    icon: Code,
    glow: "from-[rgba(232,117,74,0.12)] to-[rgba(232,117,74,0.06)]",
  },
  keywords: {
    title: "Keywords",
    icon: Hash,
    glow: "from-[rgba(78,204,163,0.12)] to-[rgba(78,204,163,0.06)]",
  },
};

export const formatText = (text: string) => {
  if (!text) return "";
  return text.replace(
    /\*\*(.*?)\*\*/g,
    `<strong class="font-semibold text-white">$1</strong>`
  );
};
