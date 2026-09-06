function JobDescription({ value, onChange }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold">
        💼 Job Description
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Paste the job description you want to apply for.
      </p>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the job description here..."
        className="mt-6 min-h-[180px] w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none transition focus:border-blue-500"
      />

      <p className="mt-2 text-right text-xs text-slate-500">
        {value.length} characters
      </p>

    </div>
  );
}

export default JobDescription;