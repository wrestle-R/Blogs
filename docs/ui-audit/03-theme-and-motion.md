# Theme and motion

Baseline `de1dad4`.

## P1. The global theme shortcut intercepts browser combinations

The theme key handler checks the key, repeat state and editable targets, then prevents default. It ignores modifier state and `defaultPrevented`. On a page with focus outside a form, test a delivered Ctrl+D or Cmd+D key event. A cancelable synthetic Ctrl+D event was prevented in Chromium. Verify the actual bookmark shortcut separately because browser interception can vary.

[Theme keyboard handler](../../src/components/ThemeToggle.astro#L134-L150)

Ignore Ctrl, Meta, Alt and Shift combinations and already-handled events. Prefer scoping the single-character shortcut to the focused switch, or provide a way to disable it, since a page-wide bare character can overlap with voice navigation.

**Acceptance.** Modified D leaves the theme unchanged and the event uncanceled. Enter and Space on the switch still toggle it. Typing in a form keeps its normal behavior.

## P2. First visit freezes the OS theme as a stored user choice

With fresh storage and cookies, open Home while emulating light mode. Keep the page open, set the OS preference to dark and reload. The initial script resolves the system preference into a concrete value, writes both persistence layers and reads them first on future loads. The initial selection therefore acts like an explicit override.

[Theme bootstrap and persistence](../../src/components/ThemeToggle.astro#L35-L51) · [Head bootstrap](../../src/components/Head.astro#L48-L60)

Persist only deliberate changes. Resolve system mode when there is no override, and respond to OS changes while in that mode. Keep the early head bootstrap to avoid a paint in the wrong palette. Existing saved values are ambiguous, so preserve them and support returning to system mode.

**Acceptance.** A fresh profile follows light-to-dark across reload. An explicit choice survives a route transition and reload. An existing saved value remains respected.

## P3. Browser chrome uses one color in both modes

The two theme-color declarations both contain `#121212`. On a browser that exposes custom chrome, toggle the site theme and compare the surrounding chrome to the active site background.

[Browser chrome metadata](../../src/components/Head.astro#L27-L36)

Supply the actual colors and sync the active meta value from the same theme application path. Verify on a mobile browser that uses the metadata.
