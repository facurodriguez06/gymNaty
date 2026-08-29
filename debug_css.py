html_is_dark = False
classes = ["bg-slate-950", "text-slate-200"]
# Simulated CSS
variables = {
    "dark": {
        "--bg-base": "#000000",
        "--bg-panel": "rgba(20, 20, 22, 0.65)",
        "--text-main": "#fcfcfc"
    },
    "light": {
        "--bg-base": "#f8fafc",
        "--bg-panel": "rgba(255, 255, 255, 0.85)",
        "--text-main": "#0f172a"
    }
}
mode = "dark" if html_is_dark else "light"
vars = variables[mode]

# body
body_bg = vars["--bg-panel"] if "bg-slate-950" in classes else vars["--bg-base"]
body_text = vars["--text-main"] if "text-slate-200" in classes else "#fff"

print(f"Mode: {mode}")
print(f"Body BG: {body_bg}")
print(f"Body Text: {body_text}")
