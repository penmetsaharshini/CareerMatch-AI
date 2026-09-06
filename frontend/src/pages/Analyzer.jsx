
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ResumeUpload from "../components/ResumeUpload";
import JobDescription from "../components/JobDescription";

function Analyzer() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume) {
      alert("Please upload your resume PDF.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(
        "https://careermatch-ai-backend-t786.onrender.com/api/upload-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Analysis failed.");
      }

      navigate("/results", {
        state: data,
      });
    } catch (error) {
      console.error("Analysis error:", error);

      alert(
        error.message ||
          "Something went wrong while analyzing the resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              CareerMatch{" "}
              <span className="text-blue-500">AI</span>
            </h1>

            <p className="text-xs text-slate-500">
              Resume & Job Compatibility Analyzer
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            ← Home
          </button>

        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
            AI Career Analysis
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Analyze Your Career Match
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Upload your resume and compare it with a job
            description to discover your compatibility,
            skill gaps, and personalized career roadmap.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <ResumeUpload
            onFileSelect={setResume}
          />

          <JobDescription
            value={jobDescription}
            onChange={setJobDescription}
          />

        </div>

        <div className="mt-10 flex justify-center">

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-10 py-4 font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "🤖 Analyzing Resume..."
              : "🚀 Analyze My Resume"}
          </button>

        </div>

        {loading && (
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">

            <p className="font-semibold text-blue-400">
              🤖 CareerMatch AI is analyzing your resume...
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Extracting skills, calculating your match
              score, and generating personalized career
              recommendations.
            </p>

          </div>
        )}

      </main>

      <footer className="mt-20 border-t border-slate-800">

        <div className="mx-auto max-w-7xl px-6 py-8 text-center">

          <p className="text-sm text-slate-500">
            CareerMatch AI • AI-Powered Resume &
            Job Compatibility Analyzer
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Built with React, Node.js, Express and Gemini AI
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Analyzer;

