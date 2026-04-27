import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  issues: [{ type: String }],
  advice: [{ type: String }],
});

const SkillsSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  match_percentage: { type: Number },
  missing_skills: [{ type: String }],
  issues: [{ type: String }],
  advice: [{ type: String }],
});

const KeywordsSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  missing_keywords: [{ type: String }],
  advice: [{ type: String }],
});

const ATSResponseSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  summary: { type: String, required: true },

  sections: {
    basic_info: SectionSchema,
    structure: SectionSchema,
    skills: SkillsSchema,
    experience: SectionSchema,
    projects: SectionSchema,
    keywords: KeywordsSchema,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent overwrite (Next.js)
export const ATSResponse =
  mongoose.models.ATSResponse ||
  mongoose.model("ATSResponse", ATSResponseSchema);