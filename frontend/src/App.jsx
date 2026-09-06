import { BrowserRouter, Routes, Route } from "react-router-dom";

import Analyzer from "./pages/Analyzer";
import Results from "./pages/Results";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              CareerMatch <span className="text-blue-500">AI</span>
            </h1>

            <p className="text-xs text-slate-500">
              Resume & Job Compatibility Analyzer
            </p>
          </div>

          <a
            href="/analyzer"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
          >
            Start Analysis
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
            AI-Powered Career Assistant
          </p>

          <h2 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
            Know How Well Your Resume
            <span className="text-blue-500"> Matches </span>
            Your Dream Job
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Upload your resume and paste a job description to discover your
            compatibility score, matched skills, missing skills, and
            personalized AI career recommendations.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/analyzer"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              🚀 Analyze My Resume
            </a>

            <a
              href="/analyzer"
              className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Get Started →
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-slate-800 bg-slate-900/40">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
                Features
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                Everything You Need to Improve Your Career
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <div className="text-3xl">📊</div>

                <h4 className="mt-4 text-xl font-semibold">
                  Match Score
                </h4>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Get a weighted compatibility score between your resume and
                  the job description.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <div className="text-3xl">🎯</div>

                <h4 className="mt-4 text-xl font-semibold">
                  Skill Gap Analysis
                </h4>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Identify the skills you already have and the important skills
                  you need to learn.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <div className="text-3xl">🤖</div>

                <h4 className="mt-4 text-xl font-semibold">
                  Gemini AI Career Coach
                </h4>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Receive personalized career advice, resume improvements, and
                  a learning roadmap.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-sm text-slate-500">
            CareerMatch AI • AI-Powered Resume & Job Compatibility Analyzer
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Built with React, Node.js, Express and Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Resume Analyzer Page */}
        <Route path="/analyzer" element={<Analyzer />} />

        {/* Analysis Results Page */}
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;