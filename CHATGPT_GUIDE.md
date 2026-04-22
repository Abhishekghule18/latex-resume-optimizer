# Using the ATS Resume Optimizer with ChatGPT

## Why the JSX File Doesn't Work in ChatGPT

The `resume-optimizer.jsx` file is a **React component built for Claude's Artifacts feature** — a Claude-specific renderer that executes interactive JavaScript apps directly inside the chat window. ChatGPT does not have this capability. If you paste the JSX file into ChatGPT, it will display the raw code as text rather than running it as an app.

The good news: ChatGPT can still do all the same analysis — it just outputs the results as formatted text instead of an interactive UI.

---

## Quick Start (3 Steps)

1. Open [chatgpt-prompt.md](chatgpt-prompt.md) and copy the **Step 1 prompt** block.
2. Paste it into a new ChatGPT conversation (GPT-4o recommended).
3. Replace the two placeholders — your resume and the job description — then send.

ChatGPT will reply with your ATS score, matched/missing keywords, strengths, improvements, and the full optimized LaTeX.

To compress to one page, copy the **Step 2 prompt** from `chatgpt-prompt.md` and send it as a follow-up in the same conversation.

---

## Claude vs. ChatGPT — Feature Comparison

| Feature | Claude (JSX Artifact) | ChatGPT (Prompt) |
|---|---|---|
| ATS score (0–100) | ✅ Visual ring chart | ✅ Text output |
| Matched keywords | ✅ Color-coded chips | ✅ Listed with ✓ |
| Missing keywords | ✅ Color-coded chips | ✅ Listed with ✗ |
| Top strengths & improvements | ✅ | ✅ |
| Optimized LaTeX output | ✅ With copy button | ✅ In code block |
| Side-by-side diff view | ✅ Red/green line diff | ❌ Not available |
| One-page compression | ✅ One-click button | ✅ Follow-up prompt |
| Plain text → LaTeX conversion | ✅ Automatic | ✅ In same prompt |
| Interactive UI | ✅ Full app | ❌ Text only |
| Requires API key | ✅ Claude API | ❌ None needed |

---

## Which ChatGPT Plan Do You Need?

| Plan | Works? | Notes |
|---|---|---|
| Free (GPT-4o mini) | ⚠️ Partial | May truncate long LaTeX files |
| Plus (GPT-4o) | ✅ Recommended | Best quality, handles full LaTeX |
| Team / Enterprise | ✅ | Same as Plus |

If GPT-4o truncates your LaTeX output, ask it to continue: _"Continue from where you left off."_

---

## Tips for Best Results

- **Paste the full job description** — keywords are spread across requirements, responsibilities, and preferred qualifications sections.
- **Use LaTeX mode if you have it** — copy your `.tex` source directly from Overleaf (Ctrl+A, Ctrl+C) for the most accurate optimization.
- **Plain text works too** — ChatGPT will convert it to LaTeX first, then optimize.
- **Review before submitting** — confirm the AI did not fabricate job titles, companies, degrees, or dates.
- **Compress last** — run Step 2 only after you are happy with the optimized content from Step 1.
- **Paste back into Overleaf** — copy the LaTeX from ChatGPT's code block and paste it into your Overleaf project to verify it compiles correctly.
