# CareerMatch AI

## AI-Powered Resume & Job Compatibility Analyzer

CareerMatch AI is a web application that analyzes a candidate's resume against a given job description and calculates how well the candidate matches the required skills.

It combines deterministic skill matching with Gemini AI to provide resume insights, missing skills, improvement suggestions, and a personalized learning roadmap.

## 🚀 Features

- 📄 Upload resume in PDF format
- 📝 Paste any job description
- 🔍 Automatically extract skills from resume and job description
- ✅ Identify matched skills
- ❌ Identify missing skills
- 📊 Calculate a weighted job compatibility score
- 🤖 Get AI-powered resume analysis using Gemini
- 💡 Receive personalized resume improvement suggestions
- 📚 Get a skill-gap based learning roadmap
- 🎯 Understand job readiness based on the provided job description

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS

### Backend

- Node.js
- Express.js

### AI

- Google Gemini API

### Other Technologies

- PDF-Parse
- REST API
- Git
- GitHub

## ⚙️ How It Works

1. Upload your resume in PDF format.
2. The application extracts text from the resume.
3. Paste the job description.
4. The application extracts the required skills from the job description.
5. Resume skills and job skills are compared.
6. A weighted compatibility score is calculated.
7. Gemini AI analyzes the resume and job description.
8. The results page displays the match score, matched skills, missing skills, and AI-powered suggestions.

## 📊 Match Score

CareerMatch AI calculates the compatibility score using a weighted skill-matching approach.

Core technical skills receive higher importance than general skills.

The system identifies:

- Matched Skills
- Missing Skills
- Overall Match Percentage
- Score Breakdown

The compatibility score is calculated using application logic, while Gemini AI is used for semantic analysis and personalized recommendations.

## 🤖 AI-Powered Analysis

CareerMatch AI uses Google Gemini to provide:

- Resume improvement suggestions
- Skill gap analysis
- Personalized learning recommendations
- Job readiness insights
- Suggestions for improving compatibility with the target job

## 📁 Project Structure

```text
CareerMatch-AI
│
├── backend
│   ├── server.js
│   ├── skills.js
│   ├── package.json
│   └── .gitignore
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── ResumeUpload.jsx
│   │   │   └── JobDescription.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Analyzer.jsx
│   │   │   └── Results.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md