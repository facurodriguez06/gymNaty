import re

files = ["index.html", "script.js"]

replacements = {
    r"bg-\[\#09090b\]": "bg-slate-950",
    r"bg-\[\#18181b\]": "bg-slate-900",
    r"bg-\[\#27272a\]": "bg-slate-800",
    r"border-\[\#27272a\]": "border-slate-800",
    r"border-\[\#09090b\]": "border-slate-900"
}

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    for hex_val, slate_val in replacements.items():
        content = re.sub(hex_val, slate_val, content)
        
    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("Replaced hardcoded hex colors.")
