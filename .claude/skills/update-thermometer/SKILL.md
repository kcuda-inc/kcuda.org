---
name: update-thermometer
description: Check the HSNI Givebutter fundraiser, update the thermometer in support.html with the latest raised amount and percentage, then commit and push. Use when the user types "/update-thermometer" or asks to refresh/update the donation count, fundraiser thermometer, or HSNI progress.
version: 1.0.0
---

# Update HSNI Fundraiser Thermometer

Fetch the current Givebutter fundraiser numbers, update `support.html`, commit, and push.

## Fundraiser URL

`https://givebutter.com/help-send-tech-support-to-high-school-nationals-in-oregon-qs0xnm`

## Workflow

### 1. Fetch current numbers

Use WebFetch on the fundraiser URL with prompt: "What is the current amount raised, the goal amount, and the number of supporters/donors for this fundraiser? Return just the numbers."

### 2. Update `support.html`

Five values live together in the "HSNI Campaign Thermometer" section (around lines 60–84):

- **Raised** — `<span class="text-3xl md:text-4xl font-bold text-indigo-600">$X,XXX</span>`
- **Goal** — `<span class="text-xl font-bold text-gray-700">$XX,XXX</span>`
- **Bar width** — `style="width: XX.X%; min-width: 2.5rem;"` (one decimal place, e.g. `32.9%`)
- **Bar label** — `<span class="text-white text-sm font-bold">XX%</span>` (rounded integer, e.g. `33%`)
- **Supporter count** — `<span class="font-semibold text-indigo-600">XX</span> supporters and counting`

Compute the percentage: `raised / goal * 100`. Round the bar label to nearest integer; use one decimal for the bar width.

If the goal has changed on Givebutter, update the goal too. If raised exceeds goal, cap the bar at `100%` / `100.0%` but keep the actual raised amount in the text.

### 3. Commit and push

```bash
git add support.html
git commit -m "$(cat <<'EOF'
Update HSNI fundraiser progress to $X,XXX of $XX,XXX

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push
```

If the numbers haven't changed since the last commit, skip the commit and tell the user nothing to update.

### 4. Report

One line: old → new raised, percentage, and that it's pushed.
