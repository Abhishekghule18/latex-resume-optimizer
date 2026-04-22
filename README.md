# ATS Resume Optimizer for Overleaf — AI-Powered LaTeX Resume Matcher

> Beat ATS algorithms by matching your Overleaf LaTeX resume keywords to job descriptions. Get an ATS match score (0-100), see missing keywords, optimize bullet points, and compress to one page — all with Claude AI.

---

## Using with ChatGPT?

The `resume-optimizer.jsx` file is a **Claude Artifact** (React/JSX) — it only runs inside Claude's chat interface. ChatGPT does not support JSX artifact rendering, so pasting the file there will just display raw code.

**ChatGPT users:** See [CHATGPT_GUIDE.md](CHATGPT_GUIDE.md) for a text-based alternative that delivers the same ATS scoring and optimized LaTeX output using [chatgpt-prompt.md](chatgpt-prompt.md) — no setup required.

---

## What it does

**ATS Matching & Optimization**
- Paste your resume (Overleaf LaTeX or plain text)
- Paste any job description from LinkedIn, Indeed, Naukri, or company sites
- Get an ATS match score (0-100) with matched vs. missing keywords
- AI automatically rewrites your resume to inject job-relevant keywords naturally
- Improve bullet points with stronger action verbs and measurable impact
- Reorder skills to front-load what the job description asks for
- See line-by-line changes in a visual diff before copying back
- Compress to one page with a single click if your resume is too long

**Why this works**
- Keeps your exact LaTeX formatting and structure (no manual reformatting)
- No backend server or API key setup — runs entirely in Claude
- Powered by Claude Sonnet for accurate, context-aware keyword matching
- Free and open source (MIT license)

---

## Key Features

✓ **ATS Score (0-100)** — See exactly how well your resume matches the job  
✓ **Keyword Gap Analysis** — Matched keywords (green) vs. missing ones (red)  
✓ **AI Resume Rewriting** — Automatically injects keywords, improves bullet points  
✓ **No backend needed** — Runs entirely in Claude Artifacts (browser-based)  
✓ **One-page compression** — Condense your resume while keeping optimizations  
✓ **Side-by-side diff view** — Review every change before copying  
✓ **Preserve formatting** — LaTeX structure stays exactly as you designed it  
✓ **Works with any Overleaf template** — Jake's Resume, Awesome CV, AltaCV, etc.  

---

## Who is this for?

- **Job seekers optimizing LaTeX resumes** — Pass ATS screening, get more interviews
- **Overleaf users** — Already in LaTeX? Skip conversion tools
- **Technical candidates** — Engineers, data scientists, software developers
- **Anyone tailoring resumes** — Match specific job descriptions without rewriting from scratch
- **Career changers** — Highlight transferable skills the job description mentions

---

## How to Use

This is a Claude Artifact (React app) that runs directly in your chat. No installation, no backend server, no API keys to configure.

### Step 1: Open Claude

Go to [claude.ai](https://claude.ai) and start a new conversation. Make sure you are on **Claude Sonnet** (the default on Pro/Team plans).

### Step 2: Upload the artifact

Copy the full contents of `resume-optimizer.jsx` and paste it into the Claude chat with this message:

```
Here is a React artifact. Please render it for me.

[paste the contents of resume-optimizer.jsx here]
```

Claude will render it as an interactive app inside the chat window.

### Step 3: Use the app

Once rendered, you will see two panels:

**Left side: Your Inputs**

| Field | Description |
|---|---|
| PASTE LATEX | Your Overleaf `.tex` resume source |
| PASTE TEXT | Plain text resume (auto-converts to LaTeX) |
| JOB DESCRIPTION | Paste the full job posting (LinkedIn, Indeed, company site, etc.) |

**Right side: Results**

| Element | What you get |
|---|---|
| ATS Score | 0-100 match score with color coding |
| Keyword Chips | Green ✓ = matched in job description | Red ✗ = still missing |
| TOP STRENGTHS | What's already working well in your resume |
| STILL IMPROVE | Areas to strengthen next |
| OPTIMIZED LATEX | Full rewritten resume ready to paste into Overleaf |
| DIFF VIEW | Side-by-side red/green diff showing every change |
| 1-PAGE BUTTON | Compress resume if it spills to page 2 |
| COPY LATEX BUTTON | Copy all LaTeX to clipboard |

---

### Step 4: Copy back to Overleaf

1. Click **COPY LATEX**
2. Open your Overleaf project
3. Select all (`Ctrl+A`) and paste (`Ctrl+V`)
4. Click **Recompile** to see your updated resume

---

## Tips

**Use the full job description.** More keywords and details mean better matches. Include responsibilities, nice-to-haves, and company background.

**Use PASTE LATEX if you have an Overleaf template.** Your structure, custom commands, and formatting stay the same. Only content changes.

**Compress after optimizing.** The optimizer might add keywords that spill to page two. Compress last so you keep the matches but save space.

**Review the diff before copying.** Check every red and green change. You have the final say if something doesn't feel right.

**Re-optimize if needed.** After compressing, run it again on the shorter version to get an updated score.

---

## Templates that work

Any single-column Overleaf template works. Tested with:

- [Jake's Resume](https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs) — Most popular LaTeX resume template
- [Awesome CV](https://www.overleaf.com/latex/templates/awesome-cv/tvmzpvdjfqxp) — Clean, modern design
- [AltaCV](https://www.overleaf.com/latex/templates/altacv-template/trgqjpwnmtgv) — Colorful, skill-focused
- Any template using `\resumeItem`, `\resumeSubheading`, `\section` commands

---

## FAQ & Common Use Cases

**Q: Will this help me beat ATS?**  
A: Yes! By matching keywords from the job description, you'll pass more ATS screenings. The 0-100 score shows your keyword match percentage.

**Q: Can I use this for plain text or Word resumes?**  
A: Yes. Paste plain text and Claude converts it to LaTeX first, then optimizes it.

**Q: Does this preserve my resume design?**  
A: Yes. If you use PASTE LATEX mode, all formatting, colors, custom LaTeX commands, and layout stay intact. Only content changes.

**Q: How many times can I optimize?**  
A: Unlimited. Optimize for multiple jobs, compress, re-optimize — no limits.

**Q: Is my resume data private?**  
A: The app runs in Claude Artifacts. Your resume is sent to Claude's API for processing. Review Anthropic's privacy policy if you have concerns.

**Q: What if my resume is 2 pages?**  
A: Use the "1-PAGE" button after optimization to compress it automatically.

**Q: Can I revert changes?**  
A: Yes. The DIFF tab shows exactly what changed. The original is on the left, optimized version on the right — you can copy the original back if needed.

---

## Tech stack

| Layer | What |
|---|---|
| UI | React with inline styles |
| API | Claude Sonnet (Anthropic) |
| Hosting | Claude Artifacts (runs in browser) |
| Fonts | DM Mono and DM Sans |

---

## Searchable Keywords

This project helps with: **ATS resume optimization**, **resume keyword matching**, **Overleaf resume**, **LaTeX resume**, **beat ATS**, **ATS score**, **resume optimizer**, **job description matching**, **resume formatting**, **career tools**, **job search**, **resume improvement**, **AI resume builder**, **Claude AI**, **Anthropic**

---

## License

MIT
