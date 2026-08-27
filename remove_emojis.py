#!/usr/bin/env python3
"""
remove_emojis.py
Replace all emoji pictographs in the hitechtechnologyhub source files with
professional text symbols.  Run from the repo root:
    python3 remove_emojis.py
"""

import os
import re

REPO_ROOT = '/Users/c5229759/Desktop/claude-MCP/hitechtechnologyhub'

TARGET_EXTENSIONS = {'.tsx', '.ts', '.js', '.md'}
TARGET_DIRS = [
    os.path.join(REPO_ROOT, 'app'),
    os.path.join(REPO_ROOT, 'components'),
    os.path.join(REPO_ROOT, 'content', 'blog'),
]

# ─────────────────────────────────────────────────────────────────────────────
# Replacement map.
# Keys are sorted by length (descending) at runtime so that ZWJ sequences and
# base+FE0F forms are replaced before their bare-codepoint components.
#
# Characters that are intentionally KEPT (not emoji):
#   ✓ U+2713  ✗ U+2717  ★ U+2605  ✻ U+273B  ✔ U+2714  ✕ U+2715
#   ⌘ U+2318  → U+2192  • U+2022  ◆ U+25C6  ▲ U+25B2  ● U+25CF
#   · U+00B7  … U+2026  – U+2013  — U+2014  ' ' " " (curly quotes)
# ─────────────────────────────────────────────────────────────────────────────
EMOJI_MAP = {
    # ── ZWJ sequences (must be first / longest) ──────────────────────────────
    '👨‍👩‍👧': '◆',    # family

    # ── base + U+FE0F variation-selector forms ────────────────────────────────
    '⚙️':  '◆',   '🛠️': '◆',   '🖨️': '◆',   '🎙️': '◆',
    '🛡️': '◆',   '☁️':  '◆',   '⚠️':  '▲',   '⚕️':  '◆',
    '☀️':  '◆',   '🌤️': '◆',   '🌫️': '◆',   '🌦️': '◆',
    '🌧️': '◆',   '⛈️':  '▲',   '🌡️': '◆',   '❤️':  '◆',
    '▶️':  '→',   '🗂️': '◆',   '👁️':  '',    '♻️':  '◆',
    '⛅️': '◆',

    # ── status / colour circles ───────────────────────────────────────────────
    '✅': '✓',   '❌': '✗',   '⚠': '▲',    '🚨': '▲',
    '🔴': '●',   '🟠': '◆',   '🟡': '○',   '🟢': '●',
    '🔵': '●',   '🔷': '◆',   '🔶': '◆',

    # ── tech / tools ─────────────────────────────────────────────────────────
    '🚀': '◆',   '💡': '◆',   '🔧': '◆',   '⚙': '◆',
    '🛠': '◆',   '📊': '◆',   '📈': '◆',   '📉': '◆',
    '🖥': '◆',   '💻': '◆',   '🖨': '◆',   '⌨': '◆',
    '🖱': '◆',   '📡': '◆',   '🔌': '◆',   '🔋': '◆',

    # ── security / lock ───────────────────────────────────────────────────────
    '🔐': '◆',   '🔒': '◆',   '🔓': '◆',   '🔑': '◆',   '🛡': '◆',

    # ── documents / data ─────────────────────────────────────────────────────
    '📁': '◆',   '📂': '◆',   '📄': '◆',   '📃': '◆',   '📋': '◆',
    '📝': '◆',   '📖': '◆',   '📚': '◆',   '📰': '◆',   '📘': '◆',
    '📗': '◆',   '📙': '◆',   '📦': '◆',   '🗂': '◆',   '🗃': '◆',

    # ── communication ────────────────────────────────────────────────────────
    '📧': '◆',   '📨': '◆',   '📩': '◆',   '📬': '◆',   '📭': '◆',
    '💬': '◆',   '📞': '◆',   '📱': '◆',

    # ── people / faces ────────────────────────────────────────────────────────
    '👤': '◆',   '👥': '◆',   '👋': '',    '😄': '',
    '🤖': '◆',   '🧠': '◆',   '🤝': '◆',   '👁': '',

    # ── business / awards ─────────────────────────────────────────────────────
    '💼': '◆',   '🏆': '◆',   '🏅': '◆',   '🎯': '◆',
    '💰': '◆',   '💳': '◆',   '📌': '◆',   '📍': '◆',

    # ── buildings / places ────────────────────────────────────────────────────
    '🏢': '◆',   '🏥': '◆',   '🏫': '◆',   '🏛': '◆',

    # ── education / events ────────────────────────────────────────────────────
    '🎓': '◆',   '🎫': '◆',   '🎙': '◆',   '🎉': '',

    # ── misc symbols ─────────────────────────────────────────────────────────
    '⭐': '◆',   '🌟': '◆',   '✨': '◆',   '💥': '◆',
    '⚡': '◆',   '🔥': '◆',   '🌐': '◆',   '🌍': '◆',
    '🌎': '◆',   '🌏': '◆',   '🔍': '◆',   '🔎': '◆',
    '⏰': '◆',   '⏱': '◆',   '🔄': '◆',   '▶': '→',

    # ── medical ───────────────────────────────────────────────────────────────
    '⚕': '◆',   '🩺': '◆',   '💉': '◆',   '🩹': '◆',
    '🧬': '◆',   '🦴': '◆',   '🚑': '◆',   '🧒': '◆',   '❤': '◆',

    # ── weather ───────────────────────────────────────────────────────────────
    '☀': '◆',   '🌤': '◆',   '⛅': '◆',   '☁': '◆',
    '🌫': '◆',   '🌦': '◆',   '🌧': '◆',   '⛈': '▲',   '🌡': '◆',

    # ── nature / environment ─────────────────────────────────────────────────
    '🌱': '◆',   '💧': '◆',   '♻': '◆',

    # ── social / media ────────────────────────────────────────────────────────
    '🐦': '◆',   '📸': '◆',

    # ── flags (remove) ────────────────────────────────────────────────────────
    '🇸🇦': '',   '🇺🇸': '',   '🇬🇧': '',   '🇦🇺': '',   '🇨🇦': '',
    '🇩🇪': '',   '🇫🇷': '',   '🇮🇳': '',   '🇯🇵': '',
}

# Sort keys longest-first so multi-codepoint sequences are matched before
# their component codepoints.
SORTED_KEYS = sorted(EMOJI_MAP.keys(), key=len, reverse=True)

# Final sweep: strip any remaining high-plane emoji codepoints plus orphaned
# variation selectors / ZWJ / enclosing-keycap combiners that weren't
# matched by the explicit map.
# This regex intentionally does NOT include U+2300–U+27FF so that typographic
# characters (✓ ✗ ★ ✻ ✔ ✕ ⌘ ▲ ◆ ●) are preserved.
LEFTOVER_RE = re.compile(
    r'[\U0001F000-\U0001FFFF]'   # Emoticons, transport, misc pictographs
    r'|️'                    # Variation Selector-16 (emoji style)
    r'|‍'                    # Zero-Width Joiner (orphaned)
    r'|⃣',                   # Combining Enclosing Keycap
    re.UNICODE,
)


def process_file(path: str) -> tuple[bool, int]:
    """Apply replacements.  Returns (changed, emoji_count_removed)."""
    try:
        with open(path, 'r', encoding='utf-8', errors='replace') as fh:
            original = fh.read()
    except Exception as exc:
        print(f'  SKIP  {path}: {exc}')
        return False, 0

    text = original

    # Step 1 — explicit map (longest key first)
    for key in SORTED_KEYS:
        if key in text:
            text = text.replace(key, EMOJI_MAP[key])

    # Step 2 — sweep remaining high-plane emoji + orphaned combiners
    text = LEFTOVER_RE.sub('', text)

    if text == original:
        return False, 0

    # Count removed/replaced characters (rough estimate)
    n = sum(original.count(k) for k in SORTED_KEYS if original.count(k))

    with open(path, 'w', encoding='utf-8') as fh:
        fh.write(text)
    return True, n


def collect_files():
    files = []
    for target_dir in TARGET_DIRS:
        if not os.path.isdir(target_dir):
            print(f'  WARNING: directory not found: {target_dir}')
            continue
        for root, dirs, filenames in os.walk(target_dir):
            dirs[:] = [d for d in dirs
                       if d not in {'.next', 'node_modules', '__pycache__', '.git', 'out'}]
            for fname in filenames:
                if os.path.splitext(fname)[1] in TARGET_EXTENSIONS:
                    files.append(os.path.join(root, fname))
    return sorted(files)


def main():
    files = collect_files()
    changed = []
    for path in files:
        was_changed, count = process_file(path)
        if was_changed:
            rel = os.path.relpath(path, REPO_ROOT)
            changed.append(rel)
            print(f'  CHANGED  {rel}')

    print()
    print('=' * 64)
    print(f'Emoji removal complete')
    print(f'  Files scanned : {len(files)}')
    print(f'  Files changed : {len(changed)}')
    if not changed:
        print('  Nothing to do — all files already clean.')
    else:
        print(f'\nChanged files ({len(changed)}):')
        for p in changed:
            print(f'  {p}')


if __name__ == '__main__':
    main()
