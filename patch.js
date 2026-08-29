const fs = require("fs");
let code = fs.readFileSync("script.js", "utf8");
const lines = code.split("\n");

// Replace lines 3497 to 3527
const newBubble = `function createMiniTimerBubble(user, state) {
  const div = document.createElement("div");
  const textColor = user === "facu" ? "text-sky-400" : "text-pink-400";
  const ringColor = user === "facu" ? "text-sky-500" : "text-pink-500";

  // Vital Aesthetic for minimized bubble: solid #09090b bg, subtle border, rounded-[24px]
  div.className = \`bg-[#09090b] border border-[#27272a] rounded-[24px] p-3 pr-5 shadow-2xl cursor-pointer hover:scale-105 hover:bg-[#18181b] transition-all duration-200 pointer-events-auto flex items-center gap-3\`;
  div.onclick = () => expandTimer(user);

  div.innerHTML = \`
        <div class="relative w-11 h-11 flex-shrink-0">
             <svg class="w-11 h-11 transform -rotate-90 drop-shadow-md">
                <circle cx="22" cy="22" r="18" stroke="#27272a" stroke-width="4" fill="none" />
                <circle id="mini-ring-\${user}" cx="22" cy="22" r="18" stroke="currentColor" stroke-width="4"
                    fill="none" stroke-linecap="round" stroke-dasharray="113.1" stroke-dashoffset="0"
                    class="\${ringColor} transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_rgba(currentColor,0.5)]" />
            </svg>
             <div class="absolute inset-0 flex items-center justify-center">
                 <span class="text-[12px] font-black uppercase text-slate-300">\${user === "facu" ? "F" : "A"}</span>
             </div>
        </div>
        <div class="text-left flex flex-col justify-center">
            <div id="mini-display-\${user}" class="text-2xl font-mono font-black text-white tabular-nums leading-none tracking-tight">0:00</div>
            <p class="text-[10px] text-slate-400 max-w-[100px] truncate font-bold uppercase mt-1">\${state.exerciseName}</p>
        </div>
    \`;
  return div;
}`;

lines.splice(3496, 31, newBubble); // 31 lines to replace

fs.writeFileSync("script.js", lines.join("\n"));
console.log("Success modifying bubble by lines");
