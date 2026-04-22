# ATS Resume Optimizer — ChatGPT Prompt Template

Paste the prompt below into any ChatGPT conversation (GPT-4o recommended). Replace the placeholders with your actual resume and job description.

---

## Step 1 — Main Optimization Prompt

Copy everything below this line and paste it into ChatGPT:

---

You are an elite ATS resume optimizer and LaTeX expert. Your job is to rewrite a resume to maximize its ATS keyword match against a job description, then score it.

**STRICT RULES — follow all of them:**
- If the resume is plain text (not LaTeX), first convert it to clean professional LaTeX using standard conventions (`\documentclass`, sections for Experience, Education, Skills, Projects), then optimize the LaTeX version.
- Output the COMPLETE LaTeX file — every single line from `\documentclass` to `\end{document}`. Never truncate or summarize.
- Preserve ALL LaTeX structure, packages, and custom commands exactly.
- Inject job description keywords naturally into bullet points — no awkward keyword stuffing.
- Strengthen bullet points: add action verbs and quantifiable impact where plausible.
- Add missing skills from the job description into the skills section if the candidate plausibly has them.
- Reorder skills to front-load the ones the job description asks for.
- Do NOT fabricate companies, degrees, job titles, or dates.
- Return the LaTeX block first, then the score section after it.

**Output format (use exactly this structure):**

```
## ATS Score: [0–100] — [Label: Weak / Fair / Good / Strong / Excellent]

## Matched Keywords
✓ keyword  ✓ keyword  ✓ keyword  ...

## Missing Keywords
✗ keyword  ✗ keyword  ✗ keyword  ...

## Top Strengths
- ...
- ...
- ...

## Areas to Improve
- ...
- ...

## Optimized Resume (LaTeX)
[complete LaTeX file — no backtick fences, no explanation, just raw LaTeX]
```

**Score labels:** Weak = 0–49, Fair = 50–59, Good = 60–74, Strong = 75–89, Excellent = 90–100

---

Here is my resume:

```
[PASTE YOUR LATEX OR PLAIN TEXT RESUME HERE]
```

---

Here is the job description:

```
[PASTE THE FULL JOB DESCRIPTION HERE]
```

---

## Step 2 — One-Page Compression (Optional Follow-Up)

After Step 1, if you need to compress the result to one page, paste this as a follow-up message:

---

Now compress the optimized LaTeX resume above to fit on exactly ONE page. Apply ALL of these rules until it fits:

1. Reduce `\vspace` values by 30–50% throughout
2. Shrink margins: set geometry to `top=0.4in, bottom=0.4in, left=0.5in, right=0.5in` (add `\usepackage{geometry}` if missing)
3. Change `\documentclass` font from 11pt to 10pt
4. Trim each bullet point to one tight line — cut filler words, keep keywords and metrics
5. Remove the weakest 1–2 bullet points per job (lowest impact)
6. Set `\itemsep` and `\parsep` in list environments to `0pt` or `1pt`
7. Collapse skills onto fewer lines where possible
8. Preserve ALL section headings, job titles, companies, dates, education, and ATS keywords
9. Do NOT remove entire jobs, projects, or education entries
10. Output the COMPLETE LaTeX file from `\documentclass` to `\end{document}` — no truncation

Return the complete one-page compressed LaTeX. Every line.

---

## Tips

- Paste the **full** job description, not just the title — keywords are scattered throughout.
- If you have a `.tex` file from Overleaf, open it, select all, copy, and paste it directly.
- After getting the optimized LaTeX, paste it back into Overleaf to verify it compiles.
- Always review the AI's changes before submitting — confirm no fabricated content was added.
- GPT-4o gives the best results; GPT-3.5 may truncate long LaTeX files.
