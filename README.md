# LaTeX Resume Optimizer

> AI-powered resume optimizer that rewrites your Overleaf LaTeX to maximize match against any job description. Includes keyword scoring, side-by-side diff view, and one-page compression.

---

## What it does

- Paste your Overleaf `.tex` source or plain text resume
- Paste a job description from LinkedIn, Naukri, or your target company
- Claude rewrites your LaTeX to include relevant keywords, improve bullet points, and highlight matching skills
- See your match score (0-100), which keywords you're missing, and what's already working well
- Review line-by-line changes before copying back
- Compress to one page if needed

---

## How to run it in Claude

This runs as a Claude Artifact inside the chat. No backend, no deployment, no API keys needed.

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

**Left panel: Inputs**

| Field | What to paste |
|---|---|
| PASTE LATEX | Your Overleaf `.tex` source code |
| PASTE TEXT | Plain text resume (Claude converts it to LaTeX) |
| JOB DESCRIPTION | Full job description with requirements and tech stack |

**Right panel: Output**

| Element | What it shows |
|---|---|
| ATS Score Ring | Match score from 0 to 100 |
| Keyword chips | Green means matched, red means missing |
| TOP STRENGTHS | What's already strong |
| STILL IMPROVE | What needs work |
| OPTIMIZED LATEX tab | Rewritten `.tex` ready for Overleaf |
| DIFF tab | Shows every change in red and green |
| 1 PAGE button | Compresses to one page |
| COPY LATEX button | Copies to clipboard |

### Step 4: Copy back to Overleaf

1. Click COPY LATEX
2. Go to your Overleaf project
3. Select all (Ctrl+A) and paste (Ctrl+V)
4. Recompile

---

## Tips

**Use the full job description.** More keywords and details mean better matches. Include responsibilities, nice-to-haves, and company background.

**Use PASTE LATEX if you have an Overleaf template.** Your structure, custom commands, and formatting stay the same. Only content changes.

**Compress after optimizing.** The optimizer might add keywords that spill to page two. Compress last so you keep the matches but save space.

**Review the diff before copying.** Check every red and green change. You have the final say if something doesn't feel right.

**Re-optimize if needed.** After compressing, run it again on the shorter version to get an updated score.

---

## Templates that work

Any single-column Overleaf template should work. Tested with:

- [Jake's Resume](https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs)
- [Awesome CV](https://www.overleaf.com/latex/templates/awesome-cv/tvmzpvdjfqxp)
- [AltaCV](https://www.overleaf.com/latex/templates/altacv-template/trgqjpwnmtgv)
- Any template using `\resumeItem`, `\resumeSubheading`, `\section` commands

---

## Tech stack

| Layer | What |
|---|---|
| UI | React with inline styles |
| API | Claude Sonnet (Anthropic) |
| Hosting | Claude Artifacts (runs in browser) |
| Fonts | DM Mono and DM Sans |

---

## License

MIT
