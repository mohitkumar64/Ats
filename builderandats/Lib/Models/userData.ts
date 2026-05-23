import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // Basic Information
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    role: { type: String, default: "user" },
    bio: { type: String },
    professionalTitle: { type: String },
    location: { type: String },
    profileImage: { type: String },
    portfolioWebsite: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },

    // Arrays
    education: [{
        institution: String,
        degree: String,
        specialization: String,
        startYear: String,
        endYear: String,
        cgpa: String,
        description: String
    }],
    skills: {
        languages: [String],
        frameworks: [String],
        tools: [String],
        databases: [String],
        softSkills: [String],
        cloud: [String],
        devops: [String]
    },
    experience: [{
        companyName: String,
        role: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String,
        achievements: [String],
        technologies: [String]
    }],
    certifications: [{
        title: String,
        issuer: String,
        issueDate: String,
        credentialId: String,
        credentialUrl: String
    }],
    achievements: [{
        title: String,
        description: String,
        date: String,
        link: String
    }],
    
    // Notice: skipping projects section for now as per user instruction
}, { timestamps: true })

export const UserData = mongoose.models.UserData || mongoose.model("UserData", userDataSchema)