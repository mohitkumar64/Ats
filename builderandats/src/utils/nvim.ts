import axios from 'axios';
import { readFile } from 'node:fs/promises';

const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
const stream = false;

const headers = {
  "Authorization": process.env.GEMINI_API_KEY ? `Bearer ${process.env.GEMINI_API_KEY}` : null,
  "Accept": stream ? "text/event-stream" : "application/json"
};

export async function Ai(text : string){
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables.");
  return { error: "API key not configured" };
}
const payload = {
  "model": "meta/llama-4-maverick-17b-128e-instruct",
  "messages": [{role: "You are an advanced ATS (Applicant Tracking System) evaluator.", content: `

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
- Be objective and critical, just like a real ATS system
- Focus on actionable feedback, not just identification of issues
- try to be specific in advice (e.g. "Add more quantifiable achievements in experience section" rather than "Experience section is weak")
- Do NOT hallucinate experience or skills
- Be strict and realistic (not generous scoring)
- If something is missing, explicitly flag it
- Advice must be actionable and specific
- Keep responses concise but informative
- Always return valid JSON without any extra commentary
- dont give \n in response give back content in proper jason which can be parsed by JSON.parse() without errors

   content : ${text}
    

    
    `}],
  "max_tokens": 512,
  "temperature": 1.00,
  "top_p": 1.00,
  "frequency_penalty": 0.00,
  "presence_penalty": 0.00,
  "stream": stream
};

try {
  const response = await axios.post(invokeUrl, payload, { headers});
  console.log("Response received:");
  console.log(response.data);
   return(response.data.choices[0].message.content);
} catch (error) {
  console.error(error);
  return{error: "Failed to get response from AI"};
}

// Promise.resolve(

// )

//   .then(response => {
//     if (stream) {
//       response.data.on('data', (chunk) => {
//         console.log(chunk.choices[0].message.toString());
//         return chunk.choices[0].message.toString();
//       });
//     } else {
//       console.log("Response received:");
     
//      return(response.data.choices[0].message.content);
//     }
//   })
//   .catch(error => {
    
//   });
}