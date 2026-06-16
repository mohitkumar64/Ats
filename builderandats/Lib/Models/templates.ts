import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    type: String,
    name: String,
    html: String,
    img: String,
    layoutInfo: {
        maxProject: Number,
        maxExperience: Number,
    },
    supportedFields: {
        type: [String],
        default: ["summary", "phoneNumber", "location", "githubLink", "linkedinLink", "experience", "projects", "skills"]
    }
})

export const Template = mongoose.models.Template || mongoose.model("Template", templateSchema)