import { useState, useCallback } from "react";

const SAMPLE_LATEX = `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\begin{document}

\\begin{center}
    {\\Huge \\scshape John Doe} \\\\ \\vspace{1pt}
    \\small john.doe@email.com $|$ linkedin.com/in/johndoe $|$ github.com/johndoe
\\end{center}

\\section{Experience}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Software Engineer}{Jan 2022 -- Present}
      {Tech Company}{New York, NY}
      \\resumeItemListStart
        \\resumeItem{Built REST APIs using .NET and C\\#}
        \\resumeItem{Worked on SQL Server databases and wrote complex queries}
        \\resumeItem{Deployed applications to Azure cloud infrastructure}
        \\resumeItem{Developed Angular frontend components}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd

\\section{Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: C\\#, TypeScript, SQL, Python} \\\\
     \\textbf{Frameworks}{: .NET, Angular, Entity Framework} \\\\
     \\textbf{Cloud}{: Azure, Azure Functions, Azure Service Bus} \\\\
     \\textbf{Tools}{: Git, Docker, SQL Server}
    }}
 \\end{itemize}

\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Bachelor of Engineering in Computer Science}{2018 -- 2022}
      {University Name}{City, Country}
  \\resumeSubHeadingListEnd

\\end{document}`;

const SAMPLE_JD = `Senior Software Engineer - Backend Platform

We are looking for a Senior Software Engineer to join our platform team.

Requirements:
- 4+ years of experience with C# and .NET Core
- Strong experience with microservices architecture and event-driven systems
- Proficiency in Azure cloud services (Azure Functions, Service Bus, AKS)
- Experience with CI/CD pipelines (GitHub Actions, Azure DevOps)
- Strong SQL Server and database optimization skills
- Experience with RESTful API design and GraphQL
- Familiarity with AI/ML integration (Azure OpenAI, GPT-4)
- Angular or React frontend experience preferred
- Experience with Docker and Kubernetes
- Strong understanding of SOLID principles and design patterns

Responsibilities:
- Design and build scalable microservices on Azure
- Implement event-driven architectures using Azure Service Bus
- Integrate AI capabilities using Azure OpenAI
- Lead code reviews and mentor junior developers
- Collaborate with product teams to define technical requirements`;

function computeDiff(original, modified) {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const result = [];
  const maxLen = Math.max(origLines.length, modLines.length);
  for (let i = 0; i < maxLen; i++) {
    const o = origLines[i];
    const m = modLines[i];
    if (o === undefined) {
      result.push({ type: "added", line: m, lineNum: i + 1 });
    } else if (m === undefined) {
      result.push({ type: "removed", line: o, lineNum: i + 1 });
    } else if (o !== m) {
      result.push({ type: "removed", line: o, lineNum: i + 1 });
      result.push({ type: "added", line: m, lineNum: i + 1 });
    } else {
      result.push({ type: "unchanged", line: o, lineNum: i + 1 });
    }
  }
  return result;
}

function ScoreRing({ score }) {
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
      <svg width="96" height="96" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="48" cy="48" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={radius} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease", strokeLinecap: "round" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontSize: 20, fontWeight: 700, color, fontFamily: "'DM Mono', monospace" }}>{score}</span>
        <span style={{ fontSize: 9, color: "#64748b", letterSpacing: 1 }}>ATS SCORE</span>
      </div>
    </div>
  );
}

function KeywordChips({ keywords }) {
  if (!keywords || keywords.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
      {keywords.map((kw, i) => (
        <span key={i} style={{
          background: kw.found ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.1)",
          color: kw.found ? "#4ade80" : "#f87171",
          border: `1px solid ${kw.found ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          borderRadius: 4, padding: "2px 8px", fontSize: 11,
          fontFamily: "'DM Mono', monospace", letterSpacing: 0.3
        }}>
          {kw.found ? "✓" : "✗"} {kw.word}
        </span>
      ))}
    </div>
  );
}

export default function ResumeOptimizer() {
  const [inputMode, setInputMode] = useState("latex"); // "latex" | "text"
  const [latexInput, setLatexInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [jdInput, setJdInput] = useState("");
  const [outputTab, setOutputTab] = useState("latex"); // "latex" | "diff"
  const [loading, setLoading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [stage, setStage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const loadSample = () => {
    setInputMode("latex");
    setLatexInput(SAMPLE_LATEX);
    setJdInput(SAMPLE_JD);
  };

  const handleOptimize = useCallback(async () => {
    const resumeContent = inputMode === "latex" ? latexInput : textInput;
    if (!resumeContent.trim() || !jdInput.trim()) {
      setError("Please fill in both the resume and job description fields.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);

    try {
      // Step 1: If text mode, convert to LaTeX first
      let baseLatex = latexInput;
      if (inputMode === "text") {
        setStage("Converting resume to LaTeX...");
        const convertRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4000,
            system: `You are a LaTeX resume expert. Convert the provided plain-text resume into clean, professional LaTeX code using the standard resume template conventions (\\documentclass, sections for Experience, Education, Skills, Projects). Return ONLY raw LaTeX code — no markdown, no backticks, no explanation. Output the COMPLETE LaTeX file from \\documentclass to \\end{document}.`,
            messages: [{ role: "user", content: `Convert this resume to LaTeX:\n\n${textInput}` }]
          })
        });
        const convertData = await convertRes.json();
        baseLatex = convertData.content?.find(b => b.type === "text")?.text || "";
        if (!baseLatex) throw new Error("Failed to convert resume to LaTeX.");
      }

      // Step 2: Optimize LaTeX against JD
      setStage("Optimizing resume against job description...");
      const optimizeRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: `You are an elite ATS resume optimizer and LaTeX expert. Rewrite a LaTeX resume to maximize ATS match against a job description.

STRICT RULES:
- Output the COMPLETE LaTeX file — every single line from \\documentclass to \\end{document}
- NEVER truncate, summarize, or cut off — the output must be 100% complete
- Preserve ALL LaTeX structure, packages, custom commands, formatting
- Inject JD keywords naturally into bullet points — no awkward keyword stuffing
- Strengthen bullet points: add action verbs, quantifiable impact where plausible
- Add missing skills from JD into skills section if candidate plausibly has them
- Reorder skills to front-load JD-relevant ones
- Do NOT fabricate companies, degrees, or dates
- Return ONLY raw LaTeX — no markdown, no backticks, no explanation, no preamble text`,
          messages: [{
            role: "user",
            content: `JOB DESCRIPTION:\n${jdInput}\n\n---\n\nCOMPLETE LATEX RESUME TO OPTIMIZE:\n${baseLatex}\n\n---\n\nReturn the complete optimized LaTeX file. Every line. Do not stop early.`
          }]
        })
      });
      const optimizeData = await optimizeRes.json();
      let optimizedLatex = optimizeData.content?.find(b => b.type === "text")?.text || "";

      // Strip any accidental markdown fences
      optimizedLatex = optimizedLatex.replace(/^```(?:latex)?\n?/i, "").replace(/\n?```$/i, "").trim();

      if (!optimizedLatex || !optimizedLatex.includes("\\documentclass")) {
        throw new Error("Optimization returned incomplete LaTeX. Please try again.");
      }

      // Step 3: Score and extract keywords
      setStage("Scoring keyword match...");
      const scoreRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: `You are an ATS scoring engine. Analyze a resume against a job description and return ONLY a valid JSON object — no markdown, no backticks, no explanation, no text before or after.

JSON format exactly:
{"score":85,"scoreLabel":"Strong","matched":["keyword1"],"missing":["keyword2"],"topStrengths":["strength1"],"improvements":["improvement1"]}`,
          messages: [{
            role: "user",
            content: `JOB DESCRIPTION:\n${jdInput}\n\n---\n\nOPTIMIZED RESUME (LaTeX — read content between braces):\n${optimizedLatex}`
          }]
        })
      });
      const scoreData = await scoreRes.json();
      const scoreText = scoreData.content?.find(b => b.type === "text")?.text || "{}";
      let scoreJson = {};
      try {
        const clean = scoreText.replace(/```json|```/g, "").trim();
        scoreJson = JSON.parse(clean);
      } catch { scoreJson = { score: 70, scoreLabel: "Good", matched: [], missing: [], topStrengths: [], improvements: [] }; }

      const diff = computeDiff(baseLatex, optimizedLatex);

      setResult({
        originalLatex: baseLatex,
        optimizedLatex,
        diff,
        score: scoreJson.score || 0,
        scoreLabel: scoreJson.scoreLabel || "",
        matched: (scoreJson.matched || []).map(w => ({ word: w, found: true })),
        missing: (scoreJson.missing || []).map(w => ({ word: w, found: false })),
        topStrengths: scoreJson.topStrengths || [],
        improvements: scoreJson.improvements || [],
      });
      setOutputTab("latex");
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
      setStage("");
    }
  }, [inputMode, latexInput, textInput, jdInput]);

  const handleCopy = async () => {
    if (!result?.optimizedLatex) return;
    try {
      await navigator.clipboard.writeText(result.optimizedLatex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for browsers that block clipboard API
      const el = document.createElement("textarea");
      el.value = result.optimizedLatex;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.focus();
      el.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {}
      document.body.removeChild(el);
    }
  };

  const handleCompress = useCallback(async () => {
    if (!result?.optimizedLatex) return;
    setError("");
    setCompressing(true);
    try {
      const compressRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: `You are a LaTeX resume expert specializing in fitting resumes onto exactly ONE page without losing impact or ATS keywords.

STRICT RULES — apply ALL of these until it fits one page:
1. Reduce \\vspace values by 30-50% throughout
2. Shrink margins: set geometry to top=0.4in, bottom=0.4in, left=0.5in, right=0.5in (add \\usepackage{geometry} if missing)
3. Reduce font size: change \\documentclass font from 11pt to 10pt
4. Trim each bullet point to 1 tight line — cut filler words, keep keywords and metrics
5. Remove the weakest 1-2 bullet points per job (lowest impact ones)
6. Reduce \\itemsep and \\parsep in list environments to 0pt or 1pt
7. Collapse skills onto fewer lines if possible
8. Preserve ALL section headings, job titles, companies, dates, education, and ATS keywords
9. Do NOT remove entire jobs, projects, or education entries
10. Output the COMPLETE LaTeX file from \\documentclass to \\end{document} — no truncation, no markdown, no backticks`,
          messages: [{
            role: "user",
            content: `Compress this LaTeX resume to fit on exactly ONE page. Apply all the rules:\n\n${result.optimizedLatex}\n\nReturn the complete compressed LaTeX file. Every line. Do not stop early.`
          }]
        })
      });
      const compressData = await compressRes.json();
      let compressedLatex = compressData.content?.find(b => b.type === "text")?.text || "";
      compressedLatex = compressedLatex.replace(/^```(?:latex)?\n?/i, "").replace(/\n?```$/i, "").trim();

      if (!compressedLatex || !compressedLatex.includes("\\documentclass")) {
        throw new Error("Compression failed — returned incomplete LaTeX. Please try again.");
      }

      const newDiff = computeDiff(result.optimizedLatex, compressedLatex);
      setResult(prev => ({
        ...prev,
        optimizedLatex: compressedLatex,
        diff: newDiff,
      }));
      setOutputTab("latex");
    } catch (e) {
      setError(e.message || "Compression failed. Please try again.");
      console.error(e);
    } finally {
      setCompressing(false);
    }
  }, [result]);

  const changedLines = result?.diff?.filter(d => d.type !== "unchanged").length || 0;

  return (
    <div style={{
      minHeight: "100vh", background: "#080d14",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#e2e8f0"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0f1923; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
        textarea { resize: vertical; }
        textarea:focus, button:focus { outline: none; }
        .tab-btn { cursor: pointer; transition: all 0.2s; }
        .tab-btn:hover { opacity: 0.85; }
        .mode-btn { cursor: pointer; transition: all 0.15s; }
        .mode-btn:hover { border-color: #3b82f6 !important; }
        .optimize-btn:hover:not(:disabled) { background: #2563eb !important; transform: translateY(-1px); }
        .optimize-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .copy-btn:hover { background: #1e293b !important; }
        .sample-btn:hover { color: #60a5fa !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #0f2744", padding: "18px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(8,13,20,0.95)", position: "sticky", top: 0, zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16
          }}>⚡</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>LaTeX Resume Optimizer</div>
            <div style={{ fontSize: 11, color: "#475569", letterSpacing: 0.5 }}>ATS-TARGETED · KEYWORD-OPTIMIZED · OVERLEAF-READY</div>
          </div>
        </div>
        <button className="sample-btn" onClick={loadSample} style={{
          background: "none", border: "none", color: "#475569",
          fontSize: 12, cursor: "pointer", fontFamily: "'DM Mono', monospace",
          letterSpacing: 0.5
        }}>
          LOAD SAMPLE →
        </button>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

          {/* LEFT: Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Resume Input */}
            <div style={{ background: "#0c1623", border: "1px solid #0f2744", borderRadius: 12, overflow: "hidden" }}>
              <div style={{
                padding: "12px 16px", borderBottom: "1px solid #0f2744",
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <span style={{ fontSize: 11, letterSpacing: 1, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>RESUME INPUT</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {["latex", "text"].map(m => (
                    <button key={m} className="mode-btn" onClick={() => setInputMode(m)} style={{
                      padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 500,
                      fontFamily: "'DM Mono', monospace", letterSpacing: 0.5,
                      border: inputMode === m ? "1px solid #3b82f6" : "1px solid #1e293b",
                      background: inputMode === m ? "rgba(59,130,246,0.15)" : "transparent",
                      color: inputMode === m ? "#60a5fa" : "#475569", cursor: "pointer"
                    }}>
                      {m === "latex" ? "PASTE LATEX" : "PASTE TEXT"}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding: 16 }}>
                {inputMode === "latex" ? (
                  <>
                    <div style={{ fontSize: 11, color: "#334155", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                      Paste your Overleaf .tex source code
                    </div>
                    <textarea
                      value={latexInput}
                      onChange={e => setLatexInput(e.target.value)}
                      placeholder={`\\documentclass{article}\n\\begin{document}\n...\n\\end{document}`}
                      style={{
                        width: "100%", minHeight: 240, background: "#080d14",
                        border: "1px solid #0f2744", borderRadius: 8, padding: "12px 14px",
                        color: "#94a3b8", fontSize: 12, fontFamily: "'DM Mono', monospace",
                        lineHeight: 1.6
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 11, color: "#334155", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                      Paste plain text resume — Claude will convert it to LaTeX
                    </div>
                    <textarea
                      value={textInput}
                      onChange={e => setTextInput(e.target.value)}
                      placeholder="John Doe\njohn@email.com\n\nExperience\nSoftware Engineer at Acme Corp..."
                      style={{
                        width: "100%", minHeight: 240, background: "#080d14",
                        border: "1px solid #0f2744", borderRadius: 8, padding: "12px 14px",
                        color: "#94a3b8", fontSize: 12, fontFamily: "'DM Mono', monospace",
                        lineHeight: 1.6
                      }}
                    />
                  </>
                )}
              </div>
            </div>

            {/* JD Input */}
            <div style={{ background: "#0c1623", border: "1px solid #0f2744", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #0f2744" }}>
                <span style={{ fontSize: 11, letterSpacing: 1, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>JOB DESCRIPTION</span>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 11, color: "#334155", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                  Paste the full JD — requirements, responsibilities, tech stack
                </div>
                <textarea
                  value={jdInput}
                  onChange={e => setJdInput(e.target.value)}
                  placeholder="Senior Software Engineer — We're looking for..."
                  style={{
                    width: "100%", minHeight: 180, background: "#080d14",
                    border: "1px solid #0f2744", borderRadius: 8, padding: "12px 14px",
                    color: "#94a3b8", fontSize: 12, fontFamily: "'DM Mono', monospace",
                    lineHeight: 1.6
                  }}
                />
              </div>
            </div>

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#f87171"
              }}>{error}</div>
            )}

            <button
              className="optimize-btn"
              onClick={handleOptimize}
              disabled={loading || compressing}
              style={{
                background: "#1d4ed8", color: "#fff", border: "none",
                borderRadius: 10, padding: "14px 24px", fontSize: 14, fontWeight: 600,
                cursor: "pointer", letterSpacing: 0.5, transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10
              }}
            >
              {loading ? (
                <>
                  <span style={{ animation: "pulse 1.2s infinite" }}>⚡</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{stage}</span>
                </>
              ) : "⚡ Optimize Resume"}
            </button>


          </div>

          {/* RIGHT: Output */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {result ? (
              <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Score Panel */}
                <div style={{
                  background: "#0c1623", border: "1px solid #0f2744",
                  borderRadius: 12, padding: 20,
                  display: "flex", gap: 20, alignItems: "flex-start"
                }}>
                  <ScoreRing score={result.score} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>{result.scoreLabel}</span>
                      <span style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace" }}>ATS MATCH</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#475569", marginBottom: 10 }}>
                      {changedLines} lines modified · {result.matched.length} keywords matched · {result.missing.length} still missing
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4, letterSpacing: 0.5 }}>KEYWORDS</div>
                    <KeywordChips keywords={[...result.matched, ...result.missing]} />
                  </div>
                </div>

                {/* Strengths & Improvements */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { label: "TOP STRENGTHS", items: result.topStrengths, color: "#22c55e", bg: "rgba(34,197,94,0.07)", border: "rgba(34,197,94,0.2)" },
                    { label: "STILL IMPROVE", items: result.improvements, color: "#f59e0b", bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.2)" }
                  ].map(({ label, items, color, bg, border }) => (
                    <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 10, color, letterSpacing: 1, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>{label}</div>
                      {items.map((s, i) => (
                        <div key={i} style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4, display: "flex", gap: 6 }}>
                          <span style={{ color, flexShrink: 0 }}>›</span> {s}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Output Tabs */}
                <div style={{ background: "#0c1623", border: "1px solid #0f2744", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{
                    padding: "0 16px", borderBottom: "1px solid #0f2744",
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                  }}>
                    <div style={{ display: "flex" }}>
                      {[
                        { id: "latex", label: "OPTIMIZED LATEX" },
                        { id: "diff", label: `DIFF (${changedLines})` }
                      ].map(t => (
                        <button key={t.id} className="tab-btn" onClick={() => setOutputTab(t.id)} style={{
                          padding: "12px 16px", fontSize: 11, fontFamily: "'DM Mono', monospace",
                          letterSpacing: 0.8, border: "none", background: "none",
                          borderBottom: outputTab === t.id ? "2px solid #3b82f6" : "2px solid transparent",
                          color: outputTab === t.id ? "#60a5fa" : "#475569",
                          marginBottom: -1
                        }}>{t.label}</button>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <button
                        onClick={handleCompress}
                        disabled={compressing || loading}
                        style={{
                          background: compressing ? "rgba(245,158,11,0.1)" : "#0f1923",
                          border: `1px solid ${compressing ? "#92400e" : "#1e293b"}`,
                          color: compressing ? "#f59e0b" : "#64748b",
                          borderRadius: 6, padding: "5px 12px", fontSize: 11,
                          cursor: compressing || loading ? "not-allowed" : "pointer",
                          fontFamily: "'DM Mono', monospace", transition: "all 0.2s",
                          display: "flex", alignItems: "center", gap: 5, opacity: loading ? 0.4 : 1
                        }}
                        onMouseEnter={e => { if (!compressing && !loading) { e.currentTarget.style.borderColor = "#f59e0b"; e.currentTarget.style.color = "#fbbf24"; e.currentTarget.style.background = "rgba(245,158,11,0.08)"; }}}
                        onMouseLeave={e => { if (!compressing && !loading) { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "#0f1923"; }}}
                      >
                        <span style={{ animation: compressing ? "pulse 1.2s infinite" : "none" }}>📄</span>
                        {compressing ? "COMPRESSING..." : "1 PAGE"}
                      </button>
                      <button className="copy-btn" onClick={handleCopy} style={{
                        background: "#0f1923", border: "1px solid #1e293b",
                        color: copied ? "#4ade80" : "#64748b", borderRadius: 6,
                        padding: "5px 12px", fontSize: 11, cursor: "pointer",
                        fontFamily: "'DM Mono', monospace", transition: "all 0.2s"
                      }}>
                        {copied ? "COPIED ✓" : "COPY LATEX"}
                      </button>
                    </div>
                  </div>

                  <div style={{ height: 380, overflowY: "auto", padding: 16 }}>
                    {outputTab === "latex" ? (
                      <pre style={{
                        fontSize: 11, fontFamily: "'DM Mono', monospace",
                        color: "#94a3b8", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word"
                      }}>
                        {result.optimizedLatex}
                      </pre>
                    ) : (
                      <div>
                        {result.diff.filter(d => d.type !== "unchanged" ||
                          result.diff.some((nd, ni) =>
                            Math.abs(ni - result.diff.indexOf(d)) <= 2 && nd.type !== "unchanged"
                          )
                        ).map((d, i) => (
                          <div key={i} style={{
                            display: "flex", gap: 12,
                            background: d.type === "added" ? "rgba(34,197,94,0.08)" : d.type === "removed" ? "rgba(239,68,68,0.08)" : "transparent",
                            borderLeft: `2px solid ${d.type === "added" ? "#22c55e" : d.type === "removed" ? "#ef4444" : "transparent"}`,
                            padding: "2px 8px", marginBottom: 1
                          }}>
                            <span style={{
                              fontSize: 10, fontFamily: "'DM Mono', monospace", width: 20,
                              color: "#334155", flexShrink: 0, userSelect: "none"
                            }}>{d.lineNum}</span>
                            <span style={{
                              fontSize: 10, fontFamily: "'DM Mono', monospace", width: 12,
                              color: d.type === "added" ? "#4ade80" : d.type === "removed" ? "#f87171" : "#334155",
                              flexShrink: 0
                            }}>
                              {d.type === "added" ? "+" : d.type === "removed" ? "−" : " "}
                            </span>
                            <pre style={{
                              fontSize: 11, fontFamily: "'DM Mono', monospace", lineHeight: 1.6,
                              color: d.type === "added" ? "#86efac" : d.type === "removed" ? "#fca5a5" : "#475569",
                              whiteSpace: "pre-wrap", wordBreak: "break-word", flex: 1
                            }}>{d.line}</pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div style={{
                background: "#0c1623", border: "1px solid #0f2744", borderRadius: 12,
                height: "100%", minHeight: 500, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 16, padding: 40
              }}>
                <div style={{ fontSize: 48, opacity: 0.15 }}>⚡</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#334155", marginBottom: 8 }}>
                    Your optimized resume will appear here
                  </div>
                  <div style={{ fontSize: 12, color: "#1e3a5f", lineHeight: 1.7, maxWidth: 300 }}>
                    Paste your Overleaf LaTeX (or plain text) + a job description, then hit optimize. Claude will rewrite your resume to maximize ATS match.
                  </div>
                </div>
                <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
                  {["Keyword injection", "ATS scoring", "Diff view"].map(f => (
                    <div key={f} style={{ fontSize: 11, color: "#1e3a5f", fontFamily: "'DM Mono', monospace", letterSpacing: 0.5 }}>
                      ✓ {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
