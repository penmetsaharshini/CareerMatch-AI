import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const analysisResult = location.state;

  const [showScoreDetails, setShowScoreDetails] =
    useState(false);

  // If user opens /results directly
  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold">
            No Analysis Found
          </h1>

          <p className="mt-3 text-slate-400">
            Please analyze a resume first to view your
            results.
          </p>

          <button
            onClick={() => navigate("/analyzer")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
          >
            Go to Analyzer
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // Score Information
  // =========================

  const getScoreInfo = (score) => {
    if (score >= 80) {
      return {
        label: "Excellent Match",
        message:
          "Your profile is strongly aligned with this job.",
      };
    }

    if (score >= 60) {
      return {
        label: "Good Match",
        message:
          "You have a good foundation for this job.",
      };
    }

    if (score >= 40) {
      return {
        label: "Moderate Match",
        message:
          "You meet some requirements, but there are skill gaps.",
      };
    }

    return {
      label: "Needs Improvement",
      message:
        "Focus on the missing skills to improve your job readiness.",
    };
  };

  // =========================
  // Parse Gemini Response
  // =========================

  const parseAIAnalysis = (text) => {
    if (!text) return {};

    const sections = {
      strengths: "",
      gaps: "",
      recommendations: "",
      improvements: "",
      roadmap: "",
      readiness: "",
    };

    const sectionMap = [
      {
        key: "strengths",
        title: "1. Resume Strengths",
      },
      {
        key: "gaps",
        title: "2. Critical Skill Gaps",
      },
      {
        key: "recommendations",
        title: "3. Recommended Skills",
      },
      {
        key: "improvements",
        title: "4. Resume Improvement Suggestions",
      },
      {
        key: "roadmap",
        title: "5. 30-Day Learning Roadmap",
      },
      {
        key: "readiness",
        title: "6. Job Readiness Summary",
      },
    ];

    sectionMap.forEach((section, index) => {
      const startIndex =
        text.indexOf(section.title);

      if (startIndex === -1) return;

      const contentStart =
        startIndex + section.title.length;

      const nextTitle =
        sectionMap[index + 1]?.title;

      const endIndex = nextTitle
        ? text.indexOf(nextTitle, contentStart)
        : text.length;

      sections[section.key] = text
        .slice(contentStart, endIndex)
        .trim();
    });

    return sections;
  };

  // =========================
  // Render AI Content
  // =========================

  const renderAIContent = (content) => {
    if (!content) {
      return (
        <p className="text-slate-400">
          No information available.
        </p>
      );
    }

    return (
      <div className="space-y-2">
        {content
          .split("\n")
          .filter((line) => line.trim())
          .map((line, index) => {
            const cleanLine = line
              .replace(/^[-•*]\s*/, "")
              .trim();

            if (
              cleanLine.endsWith(":") &&
              cleanLine.length < 60
            ) {
              return (
                <p
                  key={index}
                  className="mt-3 font-semibold text-blue-400"
                >
                  {cleanLine}
                </p>
              );
            }

            return (
              <p
                key={index}
                className="flex gap-2 text-sm leading-6 text-slate-300"
              >
                <span className="text-blue-400">
                  •
                </span>

                <span>{cleanLine}</span>
              </p>
            );
          })}
      </div>
    );
  };

  // =========================
  // AI Data
  // =========================

  const ai = parseAIAnalysis(
    analysisResult.aiAnalysis
  );

  const scoreInfo = getScoreInfo(
    analysisResult.matchScore
  );

  // =========================
  // SCORE CALCULATION DETAILS
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

  const jobSkills =
    analysisResult.jobSkills || [];

  const matchedSkills =
    analysisResult.matchedSkills || [];

  let totalWeightedPoints = 0;
  let matchedWeightedPoints = 0;

  const matchedCoreSkills = [];
  const matchedSupportingSkills = [];

  jobSkills.forEach((skill) => {
    const isCoreSkill = coreSkills.some(
      (coreSkill) =>
        coreSkill.toLowerCase() ===
        skill.toLowerCase()
    );

    const weight = isCoreSkill ? 2 : 1;

    totalWeightedPoints += weight;

    const isMatched = matchedSkills.some(
      (matchedSkill) =>
        matchedSkill.toLowerCase() ===
        skill.toLowerCase()
    );

    if (isMatched) {
      matchedWeightedPoints += weight;

      if (isCoreSkill) {
        matchedCoreSkills.push(skill);
      } else {
        matchedSupportingSkills.push(skill);
      }
    }
  });

  const calculatedScore =
    totalWeightedPoints > 0
      ? Math.round(
          (matchedWeightedPoints /
            totalWeightedPoints) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* =========================
          Navbar
      ========================= */}

      <nav className="border-b border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              CareerMatch{" "}
              <span className="text-blue-500">
                AI
              </span>
            </h1>

            <p className="text-xs text-slate-500">
              Resume & Job Compatibility Analyzer
            </p>
          </div>

          <button
            onClick={() => navigate("/analyzer")}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:text-white"
          >
            ← Analyze Another Resume
          </button>

        </div>
      </nav>

      {/* =========================
          Main
      ========================= */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}

        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-wider text-green-400">
            Analysis Complete
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            Your CareerMatch Results
          </h2>

          <p className="mt-3 text-slate-400">
            Resume:{" "}
            <span className="text-slate-300">
              {analysisResult.fileName}
            </span>
          </p>

        </div>

        {/* =========================
            Match Score
        ========================= */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <div className="grid items-center gap-8 md:grid-cols-3">

            {/* Score */}

            <div className="text-center">

              <p className="text-sm uppercase tracking-wider text-slate-500">
                Match Score
              </p>

              <div className="mt-3 text-7xl font-bold text-blue-400">
                {analysisResult.matchScore}%
              </div>

              <p className="mt-3 font-semibold">
                {scoreInfo.label}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {scoreInfo.message}
              </p>

            </div>

            {/* Progress */}

            <div className="md:col-span-2">

              <div className="mb-3 flex justify-between text-sm">

                <span className="text-slate-400">
                  Job Compatibility
                </span>

                <span className="font-semibold text-blue-400">
                  {analysisResult.matchScore}%
                </span>

              </div>

              <div className="h-4 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                  style={{
                    width: `${analysisResult.matchScore}%`,
                  }}
                />

              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">

                <div className="rounded-xl bg-slate-950 p-4">

                  <p className="text-2xl font-bold text-green-400">
                    {
                      analysisResult
                        .matchedSkills?.length || 0
                    }
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Matched Skills
                  </p>

                </div>

                <div className="rounded-xl bg-slate-950 p-4">

                  <p className="text-2xl font-bold text-red-400">
                    {
                      analysisResult
                        .missingSkills?.length || 0
                    }
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Skill Gaps
                  </p>

                </div>

                <div className="rounded-xl bg-slate-950 p-4">

                  <p className="text-2xl font-bold text-blue-400">
                    {
                      analysisResult
                        .jobSkills?.length || 0
                    }
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Required Skills
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =========================
              How Score Is Calculated
          ========================= */}

          <div className="mt-8 border-t border-slate-800 pt-6">

            <button
              onClick={() =>
                setShowScoreDetails(
                  !showScoreDetails
                )
              }
              className="flex w-full items-center justify-between text-left"
            >

              <div>

                <h3 className="font-semibold">
                  📊 How is this score calculated?
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  View the weighted skill matching logic.
                </p>

              </div>

              <span className="text-xl text-slate-400">
                {showScoreDetails ? "−" : "+"}
              </span>

            </button>


            {showScoreDetails && (

              <div className="mt-6 rounded-xl bg-slate-950 p-6">

                {/* Explanation */}

                <p className="text-sm leading-6 text-slate-300">

                  CareerMatch AI compares the skills
                  required by the job description with
                  the skills found in your resume.

                  <br />
                  <br />

                  Core technical skills are given higher
                  importance and receive{" "}
                  <strong className="text-purple-400">
                    2 points
                  </strong>
                  . Supporting skills receive{" "}
                  <strong className="text-orange-400">
                    1 point
                  </strong>
                  .

                </p>


                {/* Weight Explanation */}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-lg border border-slate-800 p-4">

                    <p className="text-xs text-slate-500">
                      Core Skill Weight
                    </p>

                    <p className="mt-2 text-2xl font-bold text-purple-400">
                      2 Points
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Important technical skills
                    </p>

                  </div>


                  <div className="rounded-lg border border-slate-800 p-4">

                    <p className="text-xs text-slate-500">
                      Supporting Skill Weight
                    </p>

                    <p className="mt-2 text-2xl font-bold text-orange-400">
                      1 Point
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Other relevant skills
                    </p>

                  </div>

                </div>


                {/* Actual Calculation */}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  <div className="rounded-lg border border-slate-800 p-4">

                    <p className="text-xs text-slate-500">
                      Matched Weighted Points
                    </p>

                    <p className="mt-2 text-2xl font-bold text-green-400">
                      {matchedWeightedPoints}
                    </p>

                  </div>


                  <div className="rounded-lg border border-slate-800 p-4">

                    <p className="text-xs text-slate-500">
                      Total Weighted Points
                    </p>

                    <p className="mt-2 text-2xl font-bold text-blue-400">
                      {totalWeightedPoints}
                    </p>

                  </div>


                  <div className="rounded-lg border border-slate-800 p-4">

                    <p className="text-xs text-slate-500">
                      Core Skills Matched
                    </p>

                    <p className="mt-2 text-2xl font-bold text-purple-400">
                      {matchedCoreSkills.length}
                    </p>

                  </div>


                  <div className="rounded-lg border border-slate-800 p-4">

                    <p className="text-xs text-slate-500">
                      Supporting Skills Matched
                    </p>

                    <p className="mt-2 text-2xl font-bold text-orange-400">
                      {matchedSupportingSkills.length}
                    </p>

                  </div>

                </div>


                {/* Formula */}

                <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">

                  <p className="text-sm font-medium text-blue-400">
                    📐 Formula
                  </p>

                  <p className="mt-3 text-sm text-slate-300">
                    Match Score = (Matched Weighted
                    Points ÷ Total Weighted Points)
                    × 100
                  </p>

                  <div className="mt-4 rounded-lg bg-slate-900 p-4">

                    <p className="text-lg font-semibold">

                      {matchedWeightedPoints}
                      {" ÷ "}
                      {totalWeightedPoints}
                      {" × 100 = "}
                      {calculatedScore}%

                    </p>

                  </div>

                </div>


                {/* Matched Core Skills */}

                {matchedCoreSkills.length > 0 && (

                  <div className="mt-6">

                    <p className="text-sm font-semibold text-purple-400">
                      Core Skills Contributing 2 Points
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      {matchedCoreSkills.map(
                        (skill) => (

                          <span
                            key={skill}
                            className="rounded-full bg-purple-500/10 px-3 py-2 text-sm text-purple-400"
                          >
                            {skill} (+2)
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}


                {/* Supporting Skills */}

                {matchedSupportingSkills.length > 0 && (

                  <div className="mt-5">

                    <p className="text-sm font-semibold text-orange-400">
                      Supporting Skills Contributing 1 Point
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      {matchedSupportingSkills.map(
                        (skill) => (

                          <span
                            key={skill}
                            className="rounded-full bg-orange-500/10 px-3 py-2 text-sm text-orange-400"
                          >
                            {skill} (+1)
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>


        {/* =========================
            Skills
        ========================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Matched */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-xl font-semibold">
              ✅ Matched Skills
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Skills already present
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              {analysisResult.matchedSkills?.length >
              0 ? (
                analysisResult.matchedSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-green-500/10 px-3 py-2 text-sm text-green-400"
                    >
                      {skill}
                    </span>
                  )
                )
              ) : (
                <p className="text-sm text-slate-500">
                  No matching skills found.
                </p>
              )}

            </div>

          </div>


          {/* Gaps */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-xl font-semibold">
              ⚠️ Critical Skill Gaps
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Skills you may need to learn
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              {analysisResult.missingSkills?.length >
              0 ? (
                analysisResult.missingSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-red-500/10 px-3 py-2 text-sm text-red-400"
                    >
                      {skill}
                    </span>
                  )
                )
              ) : (
                <p className="text-sm text-slate-500">
                  No major skill gaps found.
                </p>
              )}

            </div>

          </div>


          {/* Job Requirements */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-xl font-semibold">
              💼 Job Requirements
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Skills detected from the JD
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              {analysisResult.jobSkills?.length >
              0 ? (
                analysisResult.jobSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-500/10 px-3 py-2 text-sm text-blue-400"
                    >
                      {skill}
                    </span>
                  )
                )
              ) : (
                <p className="text-sm text-slate-500">
                  No skills detected.
                </p>
              )}

            </div>

          </div>

        </div>


        {/* =========================
            Gemini AI Career Coach
        ========================= */}

        <section className="mt-10">

          <div className="mb-6">

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-3xl font-bold">
                🤖 Gemini AI Career Coach
              </h2>

              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">
                GEMINI POWERED
              </span>

            </div>

            <p className="mt-2 text-slate-400">
              Personalized recommendations based on
              your resume and target job.
            </p>

          </div>


          <div className="grid gap-6 lg:grid-cols-2">

            {/* Strengths */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="text-xl font-semibold">
                💪 Resume Strengths
              </h3>

              <div className="mt-5">
                {renderAIContent(ai.strengths)}
              </div>

            </div>


            {/* Gaps */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="text-xl font-semibold">
                🚨 Critical Skill Gaps
              </h3>

              <div className="mt-5">
                {renderAIContent(ai.gaps)}
              </div>

            </div>


            {/* Recommendations */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="text-xl font-semibold">
                🎯 Recommended Skills
              </h3>

              <div className="mt-5">
                {renderAIContent(
                  ai.recommendations
                )}
              </div>

            </div>


            {/* Resume Improvements */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h3 className="text-xl font-semibold">
                📝 Resume Improvement Suggestions
              </h3>

              <div className="mt-5">
                {renderAIContent(
                  ai.improvements
                )}
              </div>

            </div>


            {/* 30 Day Roadmap */}

            <div className="rounded-2xl border border-blue-500/20 bg-slate-900 p-6 lg:col-span-2">

              <div className="flex items-center gap-3">

                <span className="text-2xl">
                  📚
                </span>

                <div>

                  <h3 className="text-xl font-semibold">
                    30-Day Learning Roadmap
                  </h3>

                  <p className="text-sm text-slate-500">
                    Your personalized four-week learning plan
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-xl bg-slate-950 p-5">

                {renderAIContent(
                  ai.roadmap
                )}

              </div>

            </div>


            {/* Job Readiness */}

            <div className="rounded-2xl border border-green-500/20 bg-slate-900 p-6 lg:col-span-2">

              <h3 className="text-xl font-semibold">
                🤖 Job Readiness Summary
              </h3>

              <div className="mt-5">
                {renderAIContent(
                  ai.readiness
                )}
              </div>

            </div>

          </div>

        </section>


        {/* =========================
            Extracted Resume Text
        ========================= */}

        <details className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <summary className="cursor-pointer font-semibold">
            📄 View Extracted Resume Text
          </summary>

          <div className="mt-5 max-h-96 overflow-auto rounded-xl bg-slate-950 p-5">

            <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
              {analysisResult.text}
            </pre>

          </div>

        </details>

      </main>


      {/* =========================
          Footer
      ========================= */}

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

export default Results;