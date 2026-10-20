#!/usr/bin/env python3
"""Package the reviewed Russelore files into the blog's static download."""

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo


REPO_ROOT = Path(__file__).resolve().parents[1]
SKILL_ROOT = REPO_ROOT / "skills" / "russelore"
OUTPUT = REPO_ROOT / "public" / "downloads" / "russelore.zip"
FILES = (
    "SKILL.md",
    "agents/openai.yaml",
    "references/voice.md",
    "references/examples.md",
    "references/sources.md",
    "references/commits.md",
)


def main() -> None:
    actual = {
        path.relative_to(SKILL_ROOT).as_posix()
        for path in SKILL_ROOT.rglob("*")
        if path.is_file() or path.is_symlink()
    }
    if actual != set(FILES):
        raise SystemExit("Skill file list changed; review and update FILES before packaging.")
    if any((SKILL_ROOT / name).is_symlink() for name in FILES):
        raise SystemExit("Package source files must be regular files, not symlinks.")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temporary = OUTPUT.with_suffix(".zip.tmp")
    try:
        with ZipFile(temporary, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
            for name in FILES:
                entry = ZipInfo(f"russelore/{name}", date_time=(2026, 10, 21, 0, 0, 0))
                entry.create_system = 3
                entry.external_attr = 0o100644 << 16
                entry.compress_type = ZIP_DEFLATED
                archive.writestr(entry, (SKILL_ROOT / name).read_bytes(), compresslevel=9)
        temporary.replace(OUTPUT)
    finally:
        temporary.unlink(missing_ok=True)
    print(f"Created {OUTPUT.relative_to(REPO_ROOT)} ({OUTPUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
