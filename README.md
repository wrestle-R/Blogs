# Blogs

Russel Daniel Paul's personal blog, built with Astro, MDX and React.

## Russelore

[Download the Russelore skill ZIP](https://github.com/wrestle-R/Blogs/raw/refs/heads/main/public/downloads/russelore.zip)

Russelore is a first draft of my writing voice for assistant replies, blogs and
website copy. Raw grammar, the lingo, bracketed side thoughts and a bit of
wordplay, with lighter swearing. The style is still being calibrated.

The ZIP contains a `russelore/` folder with `SKILL.md`, a detailed voice guide,
owner-written calibration, raw excerpts, a source map and optional Codex display
metadata. It needs no API key or extra tools to use.
[Read the skill source](skills/russelore/SKILL.md).

### Install with the skills CLI

Install from the published skill source in this GitHub repository:

```sh
npx skills add wrestle-R/Blogs --skill russelore -g -a codex
```

`-g` installs for your user across projects; `-a codex` selects Codex. Omit `-g`
for a project installation, or omit `-a codex` to choose compatible agents
interactively.

To install from a local checkout, run this from the blog repository root using
an existing `skills` CLI:

```sh
skills add ./skills/russelore -g -a codex
```

These commands follow the [official skills CLI reference](https://github.com/vercel-labs/skills/blob/main/docs/commands.md).
No separate npm package or npm publishing step is required. The CLI supports
GitHub repositories and local skill folders directly. Current CLI releases require
Node.js 22.20 or newer.

### Install from the ZIP

For local Codex use, extract the folder into `~/.agents/skills/` for personal use,
or `.agents/skills/` in the project where you want it available. Then ask:

```text
Use $russelore to write this project introduction in my voice.
```

Those discovery locations and explicit invocation follow the
[official OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills).
If the skill does not appear, restart Codex. This repository keeps the distribution
source under `skills/`; it does not automatically install it for contributors.

For an assistant without skill-folder support, provide `SKILL.md` and the linked
references as writing instructions. Native installation depends on the tool.

Rebuild the download after editing the source:

```sh
python3 scripts/package-russelore.py
```

The blog serves the same file at `/downloads/russelore.zip` when deployed.

### Publish the skill

The `skills/russelore/` folder is already in a discoverable layout. Publish it
through this repository on GitHub; a separate npm package is unnecessary.

From the repository root, review the intended files, rebuild the ZIP, then commit
and push the distribution files:

```sh
python3 scripts/package-russelore.py
git add README.md skills/russelore scripts/package-russelore.py public/downloads/russelore.zip
git diff --cached --stat
git commit -m "Add Russelore writing skill"
git push origin main
```

Verify remote discovery without installing:

```sh
npx skills add wrestle-R/Blogs --skill russelore --list
```

The install command above can then be shared. GitHub installation reads the source
folder directly; the website's ZIP route becomes available after the blog deployment.

## Development

```sh
npm install
npm run dev
npm run build
```

The build runs Astro's checks before generating the site. Use `.env.example` to
see the expected environment variable names; keep real environment files private.
