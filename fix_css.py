import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove the broken wildcard block
css = re.sub(r'/\* COMPREHENSIVE TAILWIND THEME OVERRIDES FOR HARDCODED CLASSES \*/.*', '', css, flags=re.DOTALL)

# Let's generate safe exact class selectors
bg_panel = [
    ".bg-slate-900", ".bg-slate-900\\/50", ".bg-slate-900\\/80", ".bg-slate-900\\/90",
    ".bg-slate-950", ".bg-slate-950\\/20", ".bg-slate-950\\/30", ".bg-slate-950\\/40", 
    ".bg-slate-950\\/50", ".bg-slate-950\\/80", ".bg-slate-950\\/90",
    ".bg-slate-700", ".bg-slate-700\\/50", ".bg-slate-750"
]

bg_panel_alt = [
    ".bg-slate-800", ".bg-slate-800\\/30", ".bg-slate-800\\/50", ".bg-slate-800\\/80",
    ".bg-slate-805", ".bg-slate-850"
]

borders = [
    ".border-slate-900",
    ".border-slate-800", ".border-slate-800\\/30", ".border-slate-800\\/50",
    ".border-slate-700", ".border-slate-700\\/30", ".border-slate-700\\/50"
]

text_main = [
    ".text-slate-100", ".text-slate-200", ".text-slate-300", ".text-white"
]

text_dim = [
    ".text-slate-400", ".text-slate-500", ".text-slate-600"
]

safe_css = f"""
/* COMPREHENSIVE TAILWIND THEME OVERRIDES FOR HARDCODED CLASSES */
{', '.join(bg_panel)} {{
  background-color: var(--bg-panel) !important;
}}

{', '.join(bg_panel_alt)} {{
  background-color: var(--bg-panel-alt) !important;
}}

{', '.join(borders)} {{
  border-color: var(--border-strong) !important;
}}

{', '.join(text_main)} {{
  color: var(--text-main) !important;
}}

{', '.join(text_dim)} {{
  color: var(--text-dim) !important;
}}
"""

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css.strip() + "\n\n" + safe_css.strip() + "\n")
