import { useState } from "react";

function ResumeUpload({ onFileSelect }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    setFileName(file.name);
    onFileSelect(file);
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold">
        📄 Upload Resume
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Upload your resume in PDF format.
      </p>

      <label className="mt-6 flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 transition hover:border-blue-500">

        <div className="text-4xl">📤</div>

        {fileName ? (
          <>
            <p className="mt-4 font-medium text-green-400">
              {fileName}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              PDF selected successfully
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 font-medium">
              Click to upload your resume
            </p>

            <p className="mt-2 text-sm text-slate-500">
              PDF files only
            </p>
          </>
        )}

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

      </label>

    </div>
  );
}

export default ResumeUpload;