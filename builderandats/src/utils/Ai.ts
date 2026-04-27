import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

 export async function Ai(text : string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `

   
You are an advanced ATS (Applicant Tracking System) evaluator.

INPUT:
1. Resume text (raw string)
2. Optional Job Description (raw string, may be null)

TASK:
Analyze the resume like a real ATS system and return a structured evaluation.

EVALUATION RULES:

1. BASIC INFORMATION CHECK
- Candidate name present
- Valid email present
- Valid phone number present
- Location/address (optional but preferred)
- LinkedIn/GitHub/portfolio (bonus)

2. STRUCTURE & FORMATTING
- Sections: Summary, Education, Skills, Experience, Projects
- Clear section headings
- Bullet points usage
- No excessive symbols or tables (ATS readability)

3. SKILLS ANALYSIS
IF job description is provided:
    - Extract required skills from job description
    - Compare with resume skills
    - Calculate skill match %
ELSE:
    - Infer relevant skills based on education + experience
    - Check if skills are supported by projects/experience

4. EXPERIENCE VALIDATION
- Are claims supported by measurable impact?
- Action verbs used?
- Any vague or weak descriptions?

5. PROJECT VALIDATION
- Projects align with listed skills
- Projects show practical application
- Technical depth present

6. KEYWORD OPTIMIZATION
- Presence of industry keywords
- Missing important keywords

7. CONSISTENCY CHECK
- Skills vs experience vs projects alignment
- No contradictions

SCORING:
Return a score out of 100 based on:
- Basic Info (10)
- Structure (15)
- Skills Match (25)
- Experience Quality (20)
- Projects Quality (15)
- Keyword Optimization (15)

OUTPUT FORMAT (STRICT JSON ONLY):

{
  "score": number,
  "summary": "short overall evaluation",

  "sections": {
    "basic_info": {
      "score": number,
      "issues": [string],
      "advice": [string]
    },
    "structure": {
      "score": number,
      "issues": [string],
      "advice": [string]
    },
    "skills": {
      "score": number,
      "match_percentage": number,
      "missing_skills": [string],
      "issues": [string],
      "advice": [string]
    },
    "experience": {
      "score": number,
      "issues": [string],
      "advice": [string]
    },
    "projects": {
      "score": number,
      "issues": [string],
      "advice": [string]
    },
    "keywords": {
      "score": number,
      "missing_keywords": [string],
      "advice": [string]
    }
  }
}

CONSTRAINTS:
- Do NOT hallucinate experience or skills
- Be strict and realistic (not generous scoring)
- If something is missing, explicitly flag it
- Advice must be actionable and specific
- Keep responses concise but informative
    
     ${text}  
    
    `,
  });
  return response.text;
}
