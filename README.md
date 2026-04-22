# ⚡ LaTeX Resume Optimizer

> AI-powered resume optimizer that rewrites your Overleaf LaTeX to maximize ATS match against any job description — with keyword scoring, diff view, and 1-page compression.

---

## What it does

- **Paste your Overleaf `.tex` source** or plain text resume
- **Paste a job description** from LinkedIn, Naukri, company sites, etc.
- Claude rewrites your LaTeX: injects keywords naturally, strengthens bullet points with action verbs and impact, reorders skills to front-load what the JD wants
- Outputs an **ATS match score (0–100)**, matched vs missing keyword chips, top strengths, and improvement suggestions
- Shows a **line-by-line diff** of every change made
- One-click **"1 PAGE"** compression if your resume spills to 2 pages

---

## How to run it in Claude

This project runs as a **Claude Artifact** — no backend, no deployment, no API keys needed on your end. Claude handles the Anthropic API calls internally.

### Step 1 — Open Claude

Go to [claude.ai](https://claude.ai) and start a new conversation. Make sure you are on **Claude Sonnet** (the default on Pro/Team plans).

### Step 2 — Upload the artifact

Copy the full contents of `resume-optimizer.jsx` and paste it into the Claude chat with this message:

```
Here is a React artifact. Please render it for me.

[paste the contents of resume-optimizer.jsx here]
```

Claude will render it as an interactive app inside the chat window.

### Step 3 — Use the app

Once rendered, you will see two panels:

**Left panel — Inputs**

| Field | What to paste |
|---|---|
| PASTE LATEX | Your raw Overleaf `.tex` source code |
| PASTE TEXT | Plain text resume (Claude converts it to LaTeX first) |
| JOB DESCRIPTION | Full JD text — requirements, responsibilities, tech stack |

**Right panel — Output** (appears after optimization)

| Element | What it shows |
|---|---|
| ATS Score Ring | 0–100 match score with color coding |
| Keyword chips | Green = matched in JD, Red = still missing |
| TOP STRENGTHS | What's already working well |
| STILL IMPROVE | What to strengthen next |
| OPTIMIZED LATEX tab | Complete rewritten `.tex` — copy straight into Overleaf |
| DIFF tab | Line-by-line red/green diff of every change |
| 1 PAGE button | Compresses the resume to fit one page |
| COPY LATEX button | Copies the full LaTeX to clipboard |

### Step 4 — Copy back to Overleaf

1. Click **COPY LATEX** in the output panel
2. Open your Overleaf project
3. Select all (`Ctrl+A`) and paste (`Ctrl+V`)
4. Click **Recompile**

---

## Tips for best results

**Give Claude the full JD, not a summary.** The more requirements and tech keywords in the JD, the better the keyword injection. Copy everything — responsibilities, nice-to-haves, company boilerplate.

**Use PASTE LATEX mode if you have an Overleaf template.** The optimizer preserves your exact LaTeX structure, custom commands, and formatting. It only changes content, not layout.

**Run 1 PAGE after optimizing, not before.** The optimizer may add keywords that push the resume to 2 pages. Compress after so you keep the keywords but trim the fat.

**Check the DIFF tab before copying.** Scan the red/green diff to make sure every change makes sense. You are the final reviewer — Claude may occasionally strengthen a bullet beyond what you are comfortable with.

**Re-optimize after compressing.** If 1-page compression removes bullet points, run optimize again on the compressed version to re-score.

---

## Sample Overleaf templates that work well

Any standard single-column resume template works. Tested with:

- [Jake's Resume](https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs) — most popular, highly recommended
- [Awesome CV](https://www.overleaf.com/latex/templates/awesome-cv/tvmzpvdjfqxp)
- [AltaCV](https://www.overleaf.com/latex/templates/altacv-template/trgqjpwnmtgv)
- Any template using `\resumeItem`, `\resumeSubheading`, `\section` conventions

---

## Tech stack

| Layer | Technology |
|---|---|
| UI | React (JSX), Tailwind-compatible inline styles |
| AI Brain | Claude Sonnet via Anthropic API (`/v1/messages`) |
| Hosting | Claude Artifacts (runs in browser, zero infra) |
| Fonts | DM Mono + DM Sans (Google Fonts) |

---

## Roadmap (productionize this)

When you are ready to turn this into a full product:

- [ ] Angular 17 frontend with proper routing
- [ ] .NET 8 API wrapping the Claude calls with retry logic and rate limiting
- [ ] Azure Function for async processing of large resumes
- [ ] Azure Blob Storage for resume version history
- [ ] SQL Server to persist sessions and optimization history per user
- [ ] Azure B2C for authentication
- [ ] PDF upload support via Azure Document Intelligence (extract text → convert to LaTeX)
- [ ] Side-by-side Overleaf preview iframe

---

## Project structure

```
latex-resume-optimizer/
├── resume-optimizer.jsx   # The full React artifact — paste into Claude to run
└── README.md              # This file
```

---

## License

MIT — use it, fork it, productionize it.
