# CareerMatch AI

## AI-Powered Resume & Job Compatibility Analyzer

CareerMatch AI is a web application that analyzes a candidate's resume against a given job description and calculates how well the candidate matches the required skills.

The application combines deterministic skill matching with Gemini AI to provide personalized resume insights, identify missing skills, suggest improvements, and generate a learning roadmap.

## 🚀 Features

* 📄 Upload resume in PDF format
* 📝 Paste a job description
* 🔍 Extract skills from the resume and job description
* ✅ Identify matched skills
* ❌ Identify missing skills
* 📊 Calculate a weighted job compatibility score
* 🤖 Generate AI-powered resume analysis using Google Gemini
* 💡 Get personalized resume improvement suggestions
* 📚 Get a skill-gap based learning roadmap
* 🎯 Understand job readiness for a specific job role

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI

* Google Gemini API

### Other Technologies

* PDF-Parse
* REST API
* Git
* GitHub

## ⚙️ How It Works

1. The user uploads a resume in PDF format.
2. The backend extracts text from the resume.
3. The user enters a job description.
4. The application extracts relevant skills from the resume and job description.
5. Resume skills are compared with the required job skills.
6. A weighted compatibility score is calculated.
7. Gemini AI analyzes the resume and job description.
8. The results page displays the match score, matched skills, missing skills, and AI-powered recommendations.

## 📊 Match Score

CareerMatch AI uses a weighted skill-matching approach to calculate the compatibility score.

Core technical skills are given higher importance than general skills.

The system provides:

* Matched Skills
* Missing Skills
* Overall Match Percentage
* Score Breakdown

The compatibility score is calculated using application logic to provide consistent results. Gemini AI is used for semantic analysis, explanations, and personalized recommendations.

## 🤖 AI-Powered Analysis

Google Gemini AI is used to provide:

* Resume improvement suggestions
* Skill gap analysis
* Personalized learning recommendations
* Job readiness insights
* Suggestions to improve compatibility with the target job

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
```

## 💻 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/penmetsaharshini/CareerMatch-AI.git
cd CareerMatch-AI
```

### 2. Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

### 3. Configure Gemini API

Create a `.env` file inside the `backend` folder.

Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

Do not share your API key or upload it to GitHub.

### 4. Start the Backend

Run:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Install Frontend Dependencies

Open another terminal and run:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

Run:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## 🔐 Security

* API keys are stored in environment variables.
* `.env` files are excluded from Git using `.gitignore`.
* Never upload your Gemini API key to GitHub.

## 🔮 Future Enhancements

* User authentication
* Resume history
* Database integration
* Multiple resume comparison
* Job recommendation system
* Resume keyword optimization
* ATS compatibility analysis
* Personalized interview questions
* AI-powered resume improvement
* Job-specific resume suggestions

## 🎯 Project Goal

The goal of CareerMatch AI is to help students and job seekers understand how well their resume matches a specific job description and identify the skills they need to improve before applying.

## 👩‍💻 Author

**Penmetsa Harshini**

BTech Computer Science / Information Technology Student

GitHub: https://github.com/penmetsaharshini
