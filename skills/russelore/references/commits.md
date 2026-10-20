# Commit names

The owner wants short, casual names for his commits. He dislikes the recent polished assistant style, especially automatic Conventional Commit prefixes. This applies to future messages, not rewriting the existing history.

## Owner-provided calibration

- `made the readme clearer`
- `readme and skill updated`
- `pushed frontend`

The first was supplied directly; the second was selected as a preferred shorter style; the third was given in the request as the kind of wording he means. These are style anchors, not claims that a particular commit with that exact subject exists.

The owner asked for a mix: some very short and plain, some with more of his lingo or humour. Vary naturally across changes. Do not implement a counter or force a joke into every second commit.

## Owner-confirmed historical examples

The owner confirmed all four as his own wording on 2026-10-21, after they were retrieved from his public history. Dates below are the Git author dates in UTC.

| Date | Actual subject | Source |
| --- | --- | --- |
| 2025-06-18 | `made a decent readme` | [Ideas 5b5785a](https://github.com/wrestle-R/Ideas/commit/5b5785a0d80b8b091c79a9ccf26253a146d2d79e) |
| 2026-06-08 | `new blog boyss` | [Blogs 6de1c14](https://github.com/wrestle-R/Blogs/commit/6de1c14020032b614376dcf5dc7e19e3fa3958ca) |
| 2025-11-17 | `auth is working finallyyy` | [Vathavaran-Variables f85f17e](https://github.com/wrestle-R/Vathavaran-Variables/commit/f85f17e60a6e514386d772f05daf196a6bbf1584) |
| 2026-08-31 | `last commit i promise` | [Blogs b65f2fa](https://github.com/wrestle-R/Blogs/commit/b65f2fa8a8b86c7bfc13ae5b661163c0ca419885) |

The first is a small plain description. The second adds enthusiasm without becoming a performance. The third is an ordinary status with relief in the spelling. The fourth makes a tiny promise into the joke. They do not share a rigid format, and they do not need formal prefixes or explanatory bodies.

Learn those choices, not a list of strings to reuse. A new subject should still fit its own diff.

## Writing one

Look at the actual staged changes and say what happened in ordinary language. Lowercase, past tense, fragments and an occasional rough edge are fine. One line is normally enough. A plain `fixed the spotify link` can be closer than a polished sentence about navigation integration.

Use words he would use, rather than upgrading them into `implement`, `enhance`, `streamline`, `refactor` or `polish` out of habit. Those words are not forbidden when they are actually the most natural description. Prefer the direct name of the thing over an elaborate account of its architectural significance.

Do not add `feat:`, `fix:`, `chore:`, a scope, a ticket number or a formal body automatically. If the current task or actual repository tooling requires a format, retain that compatibility and keep the description casual. A recent log full of generated messages is not by itself a reason to use that format.

A small aside, enthusiasm or mild joke can fit. Some changes simply need `added images` or `made the readme clearer`. Avoid forced cleverness and avoid turning his raw chat into a chain of `okay please and thanks` in the subject.

Keep the scope honest. Mention an actual part of the change rather than using a random old subject. Do not say tests passed, something was fixed, or a deployment succeeded unless the work supports it. Add a body only when the change needs context or the user asks for one. Do not change the Git author or other configuration to achieve this voice.

## Evidence limits

A Git author name identifies an account associated with a commit, not who wrote its wording. Commit history can support the vocabulary and length of the style, but an informal subject is not proof of human authorship and a formal subject is not proof of AI authorship. Current owner-provided examples outweigh inferred labels. Known assistant-written commits should stay out of the human calibration set.

The wider review covered 1,677 public account-associated commit messages from 53 owned non-fork repositories, using the GitHub author filter `wrestle-R`. It did not cover every contribution on the account, private history or all branches. Only the four examples above have individual owner confirmation here; do not claim the whole corpus is manually written.
