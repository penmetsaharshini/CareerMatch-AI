const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");

require("dotenv").config();

const {
  extractSkills,
  calculateMatchScore,
} = require("./skills");

const app = express();

// IMPORTANT: Render provides its own PORT
const PORT = process.env.PORT || 5000;

// =========================
// Gemini AI
// =========================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =========================
// Middleware
// =========================

app.use(cors());
app.use(express.json());

// =========================
// File Upload
// =========================

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// =========================
// Test Routes
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CareerMatch AI Backend is running successfully!",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend API is working!",
  });
});

// =========================
// Resume Analysis API
// =========================

app.post(
  "/api/upload-resume",
  upload.single("resume"),
  async (req, res) => {
    let parser;

    try {
      // =========================
      // 1. Validate Resume
      // =========================

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a resume PDF.",
        });
      }

      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed.",
        });
      }

      // =========================
      // 2. Extract Resume Text
      // =========================

      parser = new PDFParse({
        data: req.file.buffer,
      });

      const result = await parser.getText();

      const resumeText = result.text || "";

      const jobDescription =
        req.body.jobDescription || "";

      // =========================
      // 3. Validate Job Description
      // =========================

      if (!jobDescription.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please enter a job description.",
        });
      }

      // =========================
      // 4. Extract Skills
      // =========================

      const resumeSkills =
        extractSkills(resumeText);

      const jobSkills =
        extractSkills(jobDescription);

      // =========================
      // 5. Matched Skills
      // =========================

      const matchedSkills =
        jobSkills.filter((jobSkill) =>
          resumeSkills.some(
            (resumeSkill) =>
              resumeSkill.toLowerCase() ===
              jobSkill.toLowerCase()
          )
        );

      // =========================
      // 6. Missing Skills
      // =========================

      const missingSkills =
        jobSkills.filter(
          (jobSkill) =>
            !resumeSkills.some(
              (resumeSkill) =>
                resumeSkill.toLowerCase() ===
                jobSkill.toLowerCase()
            )
        );

      // =========================
      // 7. Calculate Match Score
      // =========================

      const matchScore =
        calculateMatchScore(
          resumeSkills,
          jobSkills
        );

      // =========================
      // 8. Score Breakdown
      // =========================

      const coreSkills = [
        "Java",
        "Python",
        "JavaScript",
        "TypeScript",
        "C++",
        "React",
        "Node.js",
        "SQL",
        "MySQL",
        "MongoDB",
        "PostgreSQL",
        "Data Structures",
        "Algorithms",
        "Machine Learning",
        "Artificial Intelligence",
        "AWS",
        "Docker",
        "Kubernetes",
        "Spring Boot",
      ];

      let totalWeightedPoints = 0;
      let matchedWeightedPoints = 0;

      const matchedCoreSkills = [];
      const matchedSupportingSkills = [];

      jobSkills.forEach((jobSkill) => {
        const isCoreSkill =
          coreSkills.some(
            (skill) =>
              skill.toLowerCase() ===
              jobSkill.toLowerCase()
          );

        const weight = isCoreSkill ? 2 : 1;

        totalWeightedPoints += weight;

        const isMatched =
          matchedSkills.some(
            (skill) =>
              skill.toLowerCase() ===
              jobSkill.toLowerCase()
          );

        if (isMatched) {
          matchedWeightedPoints += weight;

          if (isCoreSkill) {
            matchedCoreSkills.push(jobSkill);
          } else {
            matchedSupportingSkills.push(jobSkill);
          }
        }
      });

      // =========================
      // 9. Gemini AI Career Coach
      // =========================

      let aiAnalysis = "";

      try {
        console.log(
          "Starting Gemini AI Career Coach..."
        );

        const prompt = `
You are an AI Career Coach inside CareerMatch AI.

Analyze the candidate's resume against the provided job description.

====================
RESUME
====================

${resumeText}

====================
JOB DESCRIPTION
====================

${jobDescription}

====================
SYSTEM ANALYSIS
====================

Match Score: ${matchScore}%

Matched Skills:
${
  matchedSkills.length > 0
    ? matchedSkills.join(", ")
    : "None"
}

Missing Skills:
${
  missingSkills.length > 0
    ? missingSkills.join(", ")
    : "None"
}

Required Job Skills:
${
  jobSkills.length > 0
    ? jobSkills.join(", ")
    : "None"
}

Matched Core Skills:
${
  matchedCoreSkills.length > 0
    ? matchedCoreSkills.join(", ")
    : "None"
}

Matched Supporting Skills:
${
  matchedSupportingSkills.length > 0
    ? matchedSupportingSkills.join(", ")
    : "None"
}

====================
IMPORTANT INSTRUCTIONS
====================

Return the answer using EXACTLY these six section titles.

Do not change the wording of the titles.

Do not add numbers before the titles other than the numbers already shown.

Do not use alternative titles.

1. Resume Strengths

Give 3 to 5 bullet points about the strongest relevant skills, technologies, projects, education, or experience found in the resume.

2. Critical Skill Gaps

Give the most important skills required by the job that are missing from the resume.

Prioritize the skills that have the biggest impact on job readiness.

3. Recommended Skills

Divide the recommendations into:

High Priority:
- Skills the candidate should learn first.

Medium Priority:
- Skills that would improve the candidate's profile.

Low Priority:
- Additional useful skills.

4. Resume Improvement Suggestions

Give 4 to 6 practical suggestions to improve the resume for this specific job.

Focus on:
- Skills section
- Projects
- Experience
- Achievements
- Keywords
- Resume structure

5. 30-Day Learning Roadmap

Create a simple four-week roadmap.

Week 1:
- Topics to learn

Week 2:
- Topics to learn

Week 3:
- Practice and project work

Week 4:
- Interview and resume preparation

6. Job Readiness Summary

Give a short summary explaining:

- Current job readiness
- Biggest strength
- Biggest skill gap
- What the candidate should do next

====================
RULES
====================

- Use simple English.
- Use bullet points.
- Be practical and specific.
- Do not invent qualifications.
- Do not invent experience.
- Only use information available in the resume and job description.
- Do not modify or recalculate the system-generated match score.
- Do not say the score was calculated by AI.
- Keep recommendations realistic for a student or early-career candidate.
- Do not include any additional section titles.
`;

        const response =
          await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
          });

        aiAnalysis =
          response.text || "";

        console.log(
          "Gemini AI Career Coach generated successfully!"
        );

        console.log(
          "AI Analysis length:",
          aiAnalysis.length
        );

      } catch (aiError) {
        // =========================
        // Gemini Failure Handling
        // =========================

        console.error(
          "Gemini AI error:",
          aiError
        );

        aiAnalysis = `
1. Resume Strengths

- Your resume was successfully analyzed.
- Your technical skills were extracted successfully.
- Your matched skills are shown in the analysis results.

2. Critical Skill Gaps

- Review the missing skills shown above.
- Prioritize the core skills required by the job.

3. Recommended Skills

High Priority:
- Focus on the missing core skills.

Medium Priority:
- Improve your existing technical skills.

Low Priority:
- Add supporting technologies that are relevant to the target role.

4. Resume Improvement Suggestions

- Highlight the skills that match the job description.
- Add measurable achievements to projects.
- Use relevant technical keywords.
- Keep the resume concise and well structured.
- Highlight your strongest projects.

5. 30-Day Learning Roadmap

Week 1:
- Learn the highest-priority missing skills.

Week 2:
- Practice the concepts through coding exercises.

Week 3:
- Build or improve a practical project.

Week 4:
- Prepare your resume and practice interview questions.

6. Job Readiness Summary

- Your current readiness is based on the calculated match score.
- Your biggest strength is the set of skills already matching the job.
- Your biggest gap is the missing skills listed above.
- Focus on the highest-priority missing skills next.
`;

        console.log(
          "Using fallback Career Coach analysis."
        );
      }

      // =========================
      // 10. Final Response
      // =========================

      return res.json({
        success: true,

        message:
          "Resume analyzed successfully!",

        fileName:
          req.file.originalname,

        resumeSkills,

        jobSkills,

        matchedSkills,

        missingSkills,

        matchScore,

        totalWeightedPoints,

        matchedWeightedPoints,

        matchedCoreSkills,

        matchedSupportingSkills,

        aiAnalysis,

        text: resumeText,
      });

    } catch (error) {
      console.error(
        "Resume analysis error:",
        error
      );

      return res.status(500).json({
        success: false,

        message:
          "Could not analyze the resume.",

        error:
          error.message,
      });

    } finally {
      if (parser) {
        try {
          await parser.destroy();
        } catch (destroyError) {
          console.error(
            "PDF parser cleanup error:",
            destroyError
          );
        }
      }
    }
  }
);

// =========================
// Start Server
// =========================

app.listen(PORT, () => {
  console.log(
    `CareerMatch AI backend running on port ${PORT}`
  );
});