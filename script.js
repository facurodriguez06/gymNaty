const appStartTime = Date.now();

// Safe Lifecycle Ready Handler (Supports Web, WKWebView & Capacitor)
function onReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

let pendingIconsRaf = null;
function safeCreateIcons(container) {
  if (typeof lucide !== "undefined" && lucide && typeof lucide.createIcons === "function") {
    if (container && container.nodeType === Node.ELEMENT_NODE) {
      try {
        lucide.createIcons({ root: container });
        return;
      } catch (e) {}
    }
    if (!pendingIconsRaf) {
      pendingIconsRaf = requestAnimationFrame(() => {
        pendingIconsRaf = null;
        try {
          lucide.createIcons();
        } catch (e) {
          console.warn("lucide.createIcons error:", e);
        }
      });
    }
  }
}

// --- DATA ---
const DEFAULT_ROUTINE = [
  {
    day: "Lunes",
    title: "Día 1: Tren Inferior (Cuádriceps)",
    exercises: [
      {
        name: "Sentadilla libre con barra",
        image: "./assets/exercises/squat.jpg",
        sets: "4",
        reps: "5 - 8",
        rir: "Fuerza máxima",
        notes: "Descanso: 3 min.",
        muscles: { primary: ["quads", "glutes"], secondary: ["hamstrings", "lower_back"] }
      },
      {
        name: "Prensa de piernas",
        image: "./assets/exercises/leg_press.jpg",
        sets: "3",
        reps: "10 - 12",
        rir: "Hipertrofia",
        notes: "Descanso: 2 min.",
        muscles: { primary: ["quads"], secondary: ["glutes", "hamstrings"] }
      },
      {
        name: "Zancadas (Lunges) con mancuernas",
        image: "./assets/exercises/lunges.jpg",
        sets: "3",
        reps: "10 por pierna",
        rir: "Hipertrofia / Estabilidad",
        notes: "Descanso: 1.5 min.",
        muscles: { primary: ["quads", "glutes"], secondary: ["hamstrings"] }
      },
      {
        name: "Sillón de cuádriceps (Extensiones)",
        image: "./assets/exercises/leg_extension.jpg",
        sets: "3",
        reps: "12 - 15",
        rir: "Aislamiento",
        notes: "Descanso: 1 min.",
        muscles: { primary: ["quads"], secondary: [] }
      },
      {
        name: "Elevación de talones (Gemelos)",
        image: "./assets/exercises/calf_raise.jpg",
        sets: "4",
        reps: "15 - 20",
        rir: "Hipertrofia",
        notes: "Descanso: 1 min.",
        muscles: { primary: ["calves"], secondary: [] }
      }
    ]
  },
  {
    day: "Martes",
    title: "Día 2: Tren Superior (Empujes)",
    exercises: [
      {
        name: "Press de banca plano",
        image: "./assets/exercises/bench_press.jpg",
        sets: "4",
        reps: "5 - 8",
        rir: "Fuerza máxima",
        notes: "Descanso: 3 min.",
        muscles: { primary: ["chest"], secondary: ["triceps", "shoulders"] }
      },
      {
        name: "Remo con barra o mancuernas",
        image: "./assets/exercises/tbar_row.jpg",
        sets: "4",
        reps: "8 - 10",
        rir: "Fuerza y amplitud",
        notes: "Descanso: 2 min.",
        muscles: { primary: ["back", "biceps"], secondary: ["rear_delts"] }
      },
      {
        name: "Press militar con mancuernas",
        image: "./assets/exercises/military_press.jpg",
        sets: "3",
        reps: "8 - 12",
        rir: "Deltoide Anterior",
        notes: "Descanso: 2 min.",
        muscles: { primary: ["shoulders"], secondary: ["triceps"] }
      },
      {
        name: "Jalón al pecho en polea alta",
        image: "./assets/exercises/lat_pulldown_wide.jpg",
        sets: "3",
        reps: "10 - 12",
        rir: "Hipertrofia",
        notes: "Descanso: 1.5 min.",
        muscles: { primary: ["back"], secondary: ["biceps"] }
      },
      {
        name: "Tríceps en polea alta",
        image: "./assets/exercises/tricep_pushdown.jpg",
        sets: "3",
        reps: "12 - 15",
        rir: "Cabezas lateral y medial",
        notes: "Descanso: 1 min.",
        muscles: { primary: ["triceps"], secondary: [] }
      },
      {
        name: "Extensión de tríceps tras nuca",
        image: "./assets/exercises/overhead_triceps.jpg",
        sets: "3",
        reps: "10 - 12",
        rir: "Cabeza larga del tríceps",
        notes: "Descanso: 1 min.",
        muscles: { primary: ["triceps"], secondary: [] }
      }
    ]
  },
  {
    day: "Jueves",
    title: "Día 3: Tren Inferior (Glúteos)",
    exercises: [
      {
        name: "Peso muerto (Convencional o Sumo)",
        image: "./assets/exercises/romanian_deadlift.jpg",
        sets: "4",
        reps: "5 - 8",
        rir: "Fuerza máxima",
        notes: "Descanso: 3 min.",
        muscles: { primary: ["glutes", "hamstrings", "lower_back"], secondary: ["quads"] }
      },
      {
        name: "Hip Thrust",
        image: "./assets/exercises/hip_thrust.jpg",
        sets: "4",
        reps: "8 - 12",
        rir: "Hipertrofia de glúteo",
        notes: "Descanso: 2 min.",
        muscles: { primary: ["glutes"], secondary: ["hamstrings"] }
      },
      {
        name: "Subidas al cajón (Step-ups)",
        image: "./assets/exercises/step_ups.jpg",
        sets: "3",
        reps: "8 - 10 por pierna",
        rir: "Hipertrofia unilateral",
        notes: "Descanso: 2 min.",
        muscles: { primary: ["quads", "glutes"], secondary: ["hamstrings"] }
      },
      {
        name: "Curl femoral",
        image: "./assets/exercises/leg_curl.jpg",
        sets: "3",
        reps: "12 - 15",
        rir: "Aislamiento",
        notes: "Descanso: 1.5 min.",
        muscles: { primary: ["hamstrings"], secondary: ["calves"] }
      },
      {
        name: "Plancha abdominal (Plank)",
        image: "./assets/exercises/plank.jpg",
        sets: "3",
        reps: "45 - 60 seg",
        rir: "Estabilidad del Core",
        notes: "Descanso: 1 min.",
        muscles: { primary: ["core"], secondary: ["shoulders"] }
      }
    ]
  },
  {
    day: "Viernes",
    title: "Día 4: Tren Superior (Tracciones)",
    exercises: [
      {
        name: "Jalón al pecho agarre estrecho",
        image: "./assets/exercises/lat_pulldown_neutral.jpg",
        sets: "4",
        reps: "8 - 10",
        rir: "Fuerza / Hipertrofia",
        notes: "Descanso: 2 min.",
        muscles: { primary: ["back"], secondary: ["biceps"] }
      },
      {
        name: "Press Inclinado con mancuernas",
        image: "./assets/exercises/incline_press.jpg",
        sets: "3",
        reps: "8 - 12",
        rir: "Hipertrofia",
        notes: "Descanso: 2 min.",
        muscles: { primary: ["chest"], secondary: ["shoulders", "triceps"] }
      },
      {
        name: "Remo gironda (Polea baja)",
        image: "./assets/exercises/seated_cable_row.jpg",
        sets: "3",
        reps: "10 - 12",
        rir: "Hipertrofia",
        notes: "Descanso: 1.5 min.",
        muscles: { primary: ["back"], secondary: ["biceps"] }
      },
      {
        name: "Elevaciones laterales",
        image: "./assets/exercises/lateral_raise_db.jpg",
        sets: "4",
        reps: "12 - 15",
        rir: "Deltoide Lateral",
        notes: "Descanso: 1 min.",
        muscles: { primary: ["shoulders"], secondary: [] }
      },
      {
        name: "Face Pull o Pájaros",
        image: "./assets/exercises/rear_delt_fly.jpg",
        sets: "3",
        reps: "12 - 15",
        rir: "Deltoide Posterior",
        notes: "Descanso: 1 min.",
        muscles: { primary: ["shoulders", "back"], secondary: [] }
      },
      {
        name: "Curl de bíceps con mancuernas",
        image: "./assets/exercises/biceps.jpg",
        sets: "3",
        reps: "12 - 15",
        rir: "Aislamiento",
        notes: "Descanso: 1 min.",
        muscles: { primary: ["biceps"], secondary: ["forearms"] }
      }
    ]
  }
];

let routinesList = [];
let activeRoutineId = 'routine-1';
let routineData = [];
let completedSets = {};
let setWeights = {};
let setReps = {};
let lastLocalUpdates = {};
let whoTrainsToday = "naty"; // Exclusively Naty
let sessionTraineeSelected = "naty";

function openWhoTrainsModal() {
  const modal = document.getElementById("who-trains-gatekeeper");
  if (modal) {
    modal.classList.remove("hidden", "opacity-0", "pointer-events-none");
    modal.classList.add("flex");
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      safeCreateIcons();
    }
  }
}

function closeWhoTrainsModal() {
  const modal = document.getElementById("who-trains-gatekeeper");
  if (modal) {
    modal.classList.add("opacity-0", "pointer-events-none");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex", "opacity-0", "pointer-events-none");
      
      const appContent = document.getElementById("app-content");
      if (appContent) {
        appContent.classList.remove("hidden");
      }
    }, 250);
  }
}

function selectWhoTrainsToday(who) {
  if (who !== "naty" && who !== "alma" && who !== "both") {
    who = "both";
  }
  whoTrainsToday = who;
  sessionTraineeSelected = true;
  localStorage.setItem("gymWhoTrainsToday", who);
  localStorage.setItem("gymWhoTrainsPromptDate", new Date().toDateString());
  
  closeWhoTrainsModal();
  updateWhoTrainsUI();
  updateThemeColor();
  renderContent();
  updateGamificationUI();
  if (typeof updateLiveVolumeUI === "function") {
    updateLiveVolumeUI();
  }
}

function updateThemeColor() {
  document.body.classList.remove('theme-naty', 'theme-alma', 'theme-both');
  document.body.classList.add(`theme-${whoTrainsToday}`);
}

function updateWhoTrainsUI() {
  const headerLabel = document.getElementById("header-who-label");
  const headerBadge = document.getElementById("header-who-badge");
  if (headerLabel && headerBadge) {
    if (whoTrainsToday === "naty") {
      headerLabel.textContent = "Naty";
      headerBadge.className = "flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border-2 border-[var(--accent-naty)] rounded-lg text-xs font-mono font-black uppercase text-[var(--accent-naty)] shadow-[2px_2px_0px_#000]";
    } else if (whoTrainsToday === "alma") {
      headerLabel.textContent = "Alma";
      headerBadge.className = "flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border-2 border-[var(--accent-alma)] rounded-lg text-xs font-mono font-black uppercase text-[var(--accent-alma)] shadow-[2px_2px_0px_#000]";
    } else {
      headerLabel.textContent = "Ambos";
      headerBadge.className = "flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border-2 border-[var(--accent-vigor)] rounded-lg text-xs font-mono font-black uppercase text-[var(--accent-vigor)] shadow-[2px_2px_0px_#000]";
    }
  }

  const volNatyBadge = document.querySelector(".user-volume-badge.naty");
  const volAlmaBadge = document.querySelector(".user-volume-badge.alma");
  if (volNatyBadge) {
    volNatyBadge.style.display = whoTrainsToday === "alma" ? "none" : "inline-flex";
  }
  if (volAlmaBadge) {
    volAlmaBadge.style.display = whoTrainsToday === "naty" ? "none" : "inline-flex";
  }
}


window.selectWhoTrainsToday = selectWhoTrainsToday;
window.openWhoTrainsModal = openWhoTrainsModal;
window.closeWhoTrainsModal = closeWhoTrainsModal;
window.updateWhoTrainsUI = updateWhoTrainsUI;

// Data Migration for legacy users (preserves weights & progress under routine-1)
function migrateLegacyData() {
  const legacySets = localStorage.getItem("gymRoutineSets");
  if (legacySets) {
    localStorage.setItem("gymRoutineSets_routine-1", legacySets);
    localStorage.removeItem("gymRoutineSets");
  }
  const legacyWeights = localStorage.getItem("gymRoutineWeights");
  if (legacyWeights) {
    localStorage.setItem("gymRoutineWeights_routine-1", legacyWeights);
    localStorage.removeItem("gymRoutineWeights");
  }
}

// Load routine weights and sets for the active routine ID
function loadActiveRoutineState() {
  completedSets = JSON.parse(localStorage.getItem("gymRoutineSets_" + activeRoutineId)) || {};
  setWeights = JSON.parse(localStorage.getItem("gymRoutineWeights_" + activeRoutineId)) || {};
  setReps = JSON.parse(localStorage.getItem("gymRoutineReps_" + activeRoutineId)) || {};
}


const EXERCISE_IMAGES_MAP = {
  "Sentadilla (Barra o Hack)": "./assets/exercises/squat.jpg",
  "Hip Thrust (Máquina o Barra)": "./assets/exercises/hip_thrust.jpg",
  "Prensa de Piernas": "./assets/exercises/leg_press.jpg",
  "Sillón de Aductores (Máquina)": "./assets/exercises/adductor.jpg",
  "Sillón de Cuádriceps (Extensiones)": "./assets/exercises/leg_extension.jpg",
  "Sillón de Cuádriceps (Leg Ext.)": "./assets/exercises/leg_extension.jpg",
  "Curl Femoral (Máquina)": "./assets/exercises/leg_curl.jpg",
  "Gemelos en Máquina (Pantorrillas)": "./assets/exercises/calf_raise.jpg",
  "Peso Muerto Rumano (Manc/Barra)": "./assets/exercises/romanian_deadlift.jpg",
  "Patada de Glúteo en Máquina": "./assets/exercises/glute_kickback.jpg",

  "Press de Banca Plano (Barra)": "./assets/exercises/bench_press.jpg",
  "Press Declinado (Barra o Manc)": "./assets/exercises/decline_press.jpg",
  "Press Inclinado (Máquina)": "./assets/exercises/incline_press.jpg",
  "Press de Pecho (Máquina)": "./assets/exercises/machine_chest_press.jpg",
  "Press Pecho Plano (Mancuernas)": "./assets/exercises/dumbbell_bench_press.jpg",
  "Aperturas (Peck Deck)": "./assets/exercises/chest_fly.jpg",
  "Fondos (Dips) en Paralelas": "./assets/exercises/dips.jpg",

  "Extensiones Tríceps (Polea)": "./assets/exercises/tricep_pushdown.jpg",
  "Tríceps en polea alta": "./assets/exercises/tricep_pushdown.jpg",
  "Extensión Unilateral (Manc/Polea)": "./assets/exercises/tricep_single_arm.jpg",
  "Copa Tríceps (Mancuerna a 2 manos)": "./assets/exercises/overhead_triceps.jpg",
  "Extensión de tríceps tras nuca": "./assets/exercises/overhead_triceps.jpg",

  "Jalón al Pecho (Agarre Ancho)": "./assets/exercises/lat_pulldown_wide.jpg",
  "Jalón al Pecho (Agarre Neutro)": "./assets/exercises/lat_pulldown_neutral.jpg",
  "Remo en Máquina (o T-Bar)": "./assets/exercises/tbar_row.jpg",
  "Remo en Polea Baja": "./assets/exercises/seated_cable_row.jpg",
  "Pull-Over en Polea Alta": "./assets/exercises/pullover.jpg",

  "Press Militar (Máquina)": "./assets/exercises/military_press.jpg",
  "Elevaciones Laterales (Manc)": "./assets/exercises/lateral_raise_db.jpg",
  "Elevaciones Laterales (Polea o Mancuernas)": "./assets/exercises/lateral_raise_cable.jpg",
  "Vuelos Posteriores (Pájaros)": "./assets/exercises/rear_delt_fly.jpg",
  "Face Pull (Polea Alta)": "./assets/exercises/face_pull.jpg",
  "Encogimientos (Shrugs) con Mancuernas": "./assets/exercises/shrugs.jpg",

  "Curl de Bíceps con Barra (Z o Recta)": "./assets/exercises/barbell_curl.jpg",
  "Curl de Bíceps con Mancuernas": "./assets/exercises/biceps.jpg",
  "Curl de bíceps con mancuernas": "./assets/exercises/biceps.jpg",
  "Curl Predicador (Máquina)": "./assets/exercises/preacher_curl.jpg",
  "Curl Martillo (Mancuernas)": "./assets/exercises/hammer_curl.jpg",
  "Curl de Muñeca (Barra tras espalda)": "./assets/exercises/wrist_curl.jpg",
  "Zancadas (Lunges) con mancuernas": "./assets/exercises/lunges.jpg",
  "Subidas al cajón (Step-ups)": "./assets/exercises/step_ups.jpg",
  "Plancha abdominal (Plank)": "./assets/exercises/plank.jpg",
  "Bicicleta Estática": "./assets/exercises/bike.jpg",
  "BONUS A ELECCIÓN (Ver abajo)": "./assets/exercises/concentration_curl.jpg"
};

function getExerciseImage(exercise) {
  const name = typeof exercise === "string" ? exercise : (exercise && exercise.name ? exercise.name : "");
  if (EXERCISE_IMAGES_MAP[name]) {
    return EXERCISE_IMAGES_MAP[name];
  }
  const cleanName = name.toLowerCase().trim();
  for (const [key, path] of Object.entries(EXERCISE_IMAGES_MAP)) {
    if (cleanName.includes(key.toLowerCase()) || key.toLowerCase().includes(cleanName)) {
      return path;
    }
  }
  if (exercise && exercise.image && exercise.image !== "./assets/exercises/squat.jpg") {
    return exercise.image;
  }
  return "./assets/exercises/squat.jpg";
}

function initializeRoutines() {
  migrateLegacyData();
  
  const storedList = localStorage.getItem("vitalRoutinesList");
  const storedActiveId = localStorage.getItem("vitalActiveRoutineId");
  
  if (storedList) {
    routinesList = JSON.parse(storedList).map(r => ({
      ...r,
      isBase: r.isBase || r.id === "routine-1",
    }));
  } else {
    // Initializer
    routinesList = [
      {
        id: "routine-1",
        name: "Rutina Base",
        data: DEFAULT_ROUTINE,
        isBase: true,
      }
    ];
    localStorage.setItem("vitalRoutinesList", JSON.stringify(routinesList));
  }
  
  if (storedActiveId) {
    activeRoutineId = storedActiveId;
  } else {
    activeRoutineId = "routine-1";
    localStorage.setItem("vitalActiveRoutineId", activeRoutineId);
  }
  
  // Set routineData global variable
  const activeRoutine = routinesList.find(r => r.id === activeRoutineId) || routinesList[0];
  routineData = activeRoutine.data;
}

const PRIMARY_NATY_ID = "197ab9a4-e3e6-40d3-8b61-55b3da6c1085";
const PRIMARY_ALMA_ID = "197ab9a4-e3e6-40d3-8b61-55b3da6c108a";

const SUPABASE_DEFAULT_URL = "https://jbypylccjrkzwvleprxt.supabase.co";
const SUPABASE_DEFAULT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpieXB5bGNjanJrend2bGVwcnh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMzYwNjYsImV4cCI6MjEwMzYxMjA2Nn0.m32pZJ0ELRB6iNutnpJmpgl3uZATBTEggPTBrAo_yfg";

function getSupabaseConfig() {
  const url = (window.__SUPABASE_URL__ || localStorage.getItem("gymSupabaseUrl") || SUPABASE_DEFAULT_URL).replace(/\/+$/, "");
  const key = window.__SUPABASE_KEY__ || localStorage.getItem("gymSupabaseKey") || SUPABASE_DEFAULT_KEY;
  return { url, key };
}

async function directSupabaseFetch(path, options = {}) {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Supabase error (${response.status})`);
  }
  if (response.status === 204) return null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();
  return response.text();
}

function getCloudUserId() {
  let userId = localStorage.getItem("gymCloudUserId");
  if (!userId || userId.startsWith("gym-user-") || userId === "test-user-id") {
    userId = PRIMARY_NATY_ID;
    localStorage.setItem("gymCloudUserId", userId);
  }
  return userId;
}

function getAlmaUserId() {
  let userId = localStorage.getItem("gymAlmaCloudUserId");
  if (!userId || userId.startsWith("gym-user-") || userId === "test-user-ia") {
    userId = PRIMARY_ALMA_ID;
    localStorage.setItem("gymAlmaCloudUserId", userId);
  }
  return userId;
}

function getCloudApiBaseUrl() {
  return localStorage.getItem("gymCloudApiBaseUrl") || (window.__CLOUD_API_URL__ || "");
}

const cloudAdapter = {
  async getState() {
    // 1. Direct Supabase Query (Universal, reliable on iOS, Android, Capacitor, PWA, Web)
    try {
      const [profiles, routines, days, exercises, history, gamification, water] = await Promise.all([
        directSupabaseFetch("profiles?select=*"),
        directSupabaseFetch("routines?select=*&order=is_base.desc,created_at.asc"),
        directSupabaseFetch("routine_days?select=*&order=day_index.asc"),
        directSupabaseFetch("routine_exercises?select=*&order=position.asc"),
        directSupabaseFetch("training_history?select=*&order=date_key.asc"),
        directSupabaseFetch("gamification?select=*"),
        directSupabaseFetch("water_state?select=*"),
      ]);

      return {
        profiles: profiles || [],
        routines: routines || [],
        routine_days: days || [],
        routine_exercises: exercises || [],
        training_history: history || [],
        gamification: gamification || [],
        water_state: water || [],
      };
    } catch (e) {
      console.warn("Direct Supabase getState failed, attempting proxy fallback:", e);
    }

    // 2. Fallback to proxy endpoint if available
    try {
      const customUrl = getCloudApiBaseUrl();
      const endpoint = customUrl
        ? `${customUrl.replace(/\/+$/, "")}/api/state`
        : window.__CLOUD_API_URL__
        ? `${window.__CLOUD_API_URL__}/api/state`
        : window.location.origin.startsWith("http") && !window.location.origin.includes("localhost")
        ? `${window.location.origin}/api/state`
        : null;

      if (endpoint) {
        const response = await fetch(endpoint, { method: "GET" });
        if (response.ok) return await response.json();
      }
    } catch (e) {
      console.warn("Fallback proxy getState failed:", e);
    }

    return null;
  },

  async saveState(payload) {
    // 1. Direct Supabase Upsert
    try {
      const results = [];
      const headers = { Prefer: "resolution=merge-duplicates,return=minimal" };

      if (payload.profile) {
        results.push(directSupabaseFetch("profiles?on_conflict=id", {
          method: "POST",
          headers,
          body: JSON.stringify(payload.profile),
        }));
      }

      if (Array.isArray(payload.routines) && payload.routines.length > 0) {
        results.push(directSupabaseFetch("routines?on_conflict=id", {
          method: "POST",
          headers,
          body: JSON.stringify(payload.routines),
        }));
      }

      if (Array.isArray(payload.routine_days) && payload.routine_days.length > 0) {
        results.push(directSupabaseFetch("routine_days?on_conflict=id", {
          method: "POST",
          headers,
          body: JSON.stringify(payload.routine_days),
        }));
      }

      if (Array.isArray(payload.routine_exercises) && payload.routine_exercises.length > 0) {
        results.push(directSupabaseFetch("routine_exercises?on_conflict=id", {
          method: "POST",
          headers,
          body: JSON.stringify(payload.routine_exercises),
        }));
      }

      if (Array.isArray(payload.training_history) && payload.training_history.length > 0) {
        results.push(directSupabaseFetch("training_history?on_conflict=user_id,date_key", {
          method: "POST",
          headers,
          body: JSON.stringify(payload.training_history),
        }));
      }

      if (payload.gamification) {
        results.push(directSupabaseFetch("gamification?on_conflict=user_id", {
          method: "POST",
          headers,
          body: JSON.stringify(payload.gamification),
        }));
      }

      if (payload.water_state) {
        results.push(directSupabaseFetch("water_state?on_conflict=user_id", {
          method: "POST",
          headers,
          body: JSON.stringify(payload.water_state),
        }));
      }

      const settled = await Promise.allSettled(results);
      const rejected = settled.filter((s) => s.status === "rejected");
      if (rejected.length > 0) {
        console.warn("Some direct Supabase upserts rejected:", rejected.map(r => r.reason?.message));
        return false;
      }
      return true;
    } catch (e) {
      console.warn("Direct Supabase saveState error:", e);
    }

    // 2. Fallback to proxy endpoint if direct failed
    try {
      const customUrl = getCloudApiBaseUrl();
      const endpoint = customUrl
        ? `${customUrl.replace(/\/+$/, "")}/api/state`
        : window.__CLOUD_API_URL__
        ? `${window.__CLOUD_API_URL__}/api/state`
        : window.location.origin.startsWith("http") && !window.location.origin.includes("localhost")
        ? `${window.location.origin}/api/state`
        : null;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "save", payload }),
        });
        return response.ok;
      }
    } catch (e) {
      console.warn("Proxy saveState fallback failed:", e);
    }

    return false;
  },
};

async function fetchCloudState() {
  return cloudAdapter.getState();
}

function buildCloudPayload() {
  const profile = [
    {
      id: getCloudUserId(),
      display_name: "Naty",
    },
    {
      id: getAlmaUserId(),
      display_name: "Alma",
    }
  ];

  const routines = (routinesList || []).map((routine) => ({
    id: routine.id,
    user_id: getCloudUserId(),
    name: routine.name,
    is_base: !!routine.isBase,
    is_active: routine.id === activeRoutineId,
    source: routine.isBase ? "base" : "ai",
  }));

  const routineTables = (routinesList || []).flatMap((routine) => {
    const { days, exercises } = buildRoutineTablesFromData(routine.id, routine.data || DEFAULT_ROUTINE);
    return [
      ...days,
      ...exercises,
    ];
  });

  const routine_days = routineTables.filter((row) => Object.prototype.hasOwnProperty.call(row, "day_index"));
  const routine_exercises = routineTables.filter((row) => Object.prototype.hasOwnProperty.call(row, "routine_day_id"));

  const training_history = Object.entries(trainingHistory || {}).map(([date_key, entry]) => ({
    user_id: getCloudUserId(),
    date_key,
    routine_id: activeRoutineId || null,
    naty_trained: !!entry?.naty,
    alma_trained: !!entry?.alma,
    deleted: !!entry?.deleted,
    water: entry?.water || null,
    weights: entry?.weights || null,
    completed_sets: entry?.completed_sets || null,
  }));

  const naty = gamification.naty || {};
  const alma = gamification.alma || {};

  return {
    profile,
    routines,
    routine_days,
    routine_exercises,
    training_history,
    gamification: [
      {
        user_id: getCloudUserId(),
        points: naty.points || 0,
        streak: naty.streak || 0,
        freezes: naty.freezes || 0,
        frozen_days: naty.frozenDays || [],
        achievements: naty.achievements || [],
        last_reset: naty.lastReset || 0,
        last_rescue_prompt_date: naty.lastRescuePromptDate || null,
      },
      {
        user_id: getAlmaUserId(),
        points: alma.points || 0,
        streak: alma.streak || 0,
        freezes: alma.freezes || 0,
        frozen_days: alma.frozenDays || [],
        achievements: alma.achievements || [],
        last_reset: alma.lastReset || 0,
        last_rescue_prompt_date: alma.lastRescuePromptDate || null,
      }
    ],
    water_state: [
      {
        user_id: getCloudUserId(),
        current_water_ml: waterState.naty || 0,
        goal_ml: waterState.natyGoal || 2500,
        last_updated_date: waterState.date || new Date().toDateString(),
      },
      {
        user_id: getAlmaUserId(),
        current_water_ml: waterState.alma || 0,
        goal_ml: waterState.almaGoal || 2500,
        last_updated_date: waterState.date || new Date().toDateString(),
      }
    ],
  };
}

function loadActiveRoutineStateFromHistory(triggerTimers = false) {
  const today = getDateKey(new Date());
  const todayRecord = trainingHistory[today];
  if (todayRecord) {
    let changed = false;
    
    // Guard against sync right after reset
    if (Date.now() - (lastLocalUpdates["global-reset"] || 0) < 6000) {
      return false;
    }
    
    // 1. Merge completed sets
    if (todayRecord.completed_sets) {
      const cloudSets = todayRecord.completed_sets;
      const mergedSets = { ...completedSets };
      let setsChanged = false;
      
      Object.keys(cloudSets).forEach((key) => {
        if (key.endsWith("_ts")) return; // Skip timestamp keys
        
        if (!mergedSets[key]) {
          mergedSets[key] = { naty: false, alma: false };
        }
        if (!mergedSets[key + "_ts"]) {
          mergedSets[key + "_ts"] = { naty: 0, alma: 0 };
        }
        
        if (typeof cloudSets[key] === "object" && cloudSets[key] !== null) {
          ["naty", "alma"].forEach((u) => {
            const localUpdateKey = `${key}-${u}`;
            if (Date.now() - (lastLocalUpdates[localUpdateKey] || 0) < 6000) {
              return; // Skip syncing this set from cloud
            }
            
            const cloudVal = cloudSets[key][u];
            const cloudTs = (cloudSets[key + "_ts"] && cloudSets[key + "_ts"][u]) || 0;
            const localVal = mergedSets[key][u];
            const localTs = (mergedSets[key + "_ts"] && mergedSets[key + "_ts"][u]) || 0;
            
            if (cloudTs > localTs || (cloudTs === localTs && localVal !== cloudVal)) {
              // Trigger local timer if synced checkmark went from false to true
              if (triggerTimers && !localVal && cloudVal) {
                try {
                  const parts = key.split("-");
                  const dayIdx = parseInt(parts[0]);
                  const exIdx = parseInt(parts[1]);
                  const dayData = routineData[dayIdx];
                  if (dayData) {
                    const exercise = dayData.exercises[exIdx];
                    if (exercise) {
                      const exerciseName = exercise.name;
                      const restTime = parseRestTime(exercise.notes || "");
                      showTimer(u, exerciseName, restTime);
                    }
                  }
                } catch (e) {
                  console.warn("Failed to trigger synchronized timer", e);
                }
              }
              
              mergedSets[key][u] = cloudVal;
              mergedSets[key + "_ts"][u] = cloudTs;
              setsChanged = true;
            }
          });
        }
      });
      
      if (setsChanged) {
        completedSets = mergedSets;
        localStorage.setItem("gymRoutineSets_" + activeRoutineId, JSON.stringify(completedSets));
        changed = true;
      }
    }
    
    // 2. Merge weights
    if (todayRecord.weights) {
      const cloudWeights = todayRecord.weights;
      const mergedWeights = { ...setWeights };
      const mergedReps = { ...setReps };
      let weightsChanged = false;
      
      Object.keys(cloudWeights).forEach((key) => {
        if (key.endsWith("_ts")) return; // Skip timestamp keys
        
        if (!mergedWeights[key]) {
          mergedWeights[key] = { naty: "", alma: "" };
        }
        if (!mergedWeights[key + "_ts"]) {
          mergedWeights[key + "_ts"] = { naty: 0, alma: 0 };
        }
        
        if (typeof cloudWeights[key] === "object" && cloudWeights[key] !== null) {
          ["naty", "alma"].forEach((u) => {
            const localUpdateKey = `${key}-${u}-weight`;
            if (Date.now() - (lastLocalUpdates[localUpdateKey] || 0) < 6000) {
              return; // Skip syncing this weight from cloud
            }
            
            const cloudVal = cloudWeights[key][u];
            const cloudTs = (cloudWeights[key + "_ts"] && cloudWeights[key + "_ts"][u]) || 0;
            const localVal = mergedWeights[key][u];
            const localTs = (mergedWeights[key + "_ts"] && mergedWeights[key + "_ts"][u]) || 0;
            
            if (cloudTs > localTs || (cloudTs === localTs && localVal !== cloudVal)) {
              mergedWeights[key][u] = cloudVal;
              mergedWeights[key + "_ts"][u] = cloudTs;
              weightsChanged = true;
            }
          });
        }
      });
      
      if (weightsChanged) {
        setWeights = mergedWeights;
        localStorage.setItem("gymRoutineWeights_" + activeRoutineId, JSON.stringify(setWeights));
        changed = true;
      }
    }
    
    return changed;
  }
  return false;
}

function updateDOMInPlace() {
  if (currentView !== "routine") return;
  
  // 1. Update set buttons
  document.querySelectorAll(".set-btn").forEach((btn) => {
    const setKey = btn.dataset.setKey;
    const user = btn.dataset.user;
    if (!setKey || !user) return;
    
    const isCompleted = !!(completedSets[setKey] && completedSets[setKey][user]);
    updateSingleSetUI(setKey, user, isCompleted, btn);
  });

  // 2. Update weight inputs
  document.querySelectorAll(".weight-input").forEach((input) => {
    const setKey = input.dataset.setKey;
    const user = input.dataset.user;
    if (!setKey || !user) return;
    
    const val = (setWeights[setKey] && setWeights[setKey][user]) || "";
    if (document.activeElement !== input && input.value !== String(val)) {
      input.value = val;
    }
  });

  // 3. Update exercise-level progress bars and cards
  const dayData = routineData[activeTab];
  if (!dayData) return;
  const dayColors = ["emerald", "blue", "violet", "cyan", "rose"];
  const activeColor = dayColors[activeTab] || "emerald";

  const cards = Array.from(document.querySelectorAll("#exercises-list > div.group"));

  const multiplier = whoTrainsToday === "both" ? 2 : 1;
  let totalSets = 0;
  let completedSetsCount = 0;

  dayData.exercises.forEach((exercise, idx) => {
    const numSets = parseInt(exercise.sets) || 3;
    totalSets += numSets * multiplier;

    let exerciseCompletedChecks = 0;
    for (let s = 0; s < numSets; s++) {
      const setKey = `${activeTab}-${idx}-${s}`;
      const setData = completedSets[setKey] || { naty: false, alma: false };
      if (whoTrainsToday === "both" || whoTrainsToday === "naty") {
        if (setData.naty) { completedSetsCount++; exerciseCompletedChecks++; }
      }
      if (whoTrainsToday === "both" || whoTrainsToday === "alma") {
        if (setData.alma) { completedSetsCount++; exerciseCompletedChecks++; }
      }
    }

    const isExerciseCompleted = exerciseCompletedChecks === numSets * multiplier;
    const card = cards[idx];
    if (card) {
      const innerBar = card.querySelector(".bg-emerald-500");
      if (innerBar) {
        innerBar.style.width = `${(exerciseCompletedChecks / (numSets * multiplier)) * 100}%`;
      }

      const wasCompleted = card.classList.contains("opacity-80");
      if (isExerciseCompleted !== wasCompleted) {
        if (isExerciseCompleted) {
          card.className = card.className
            .replace("bg-slate-900 border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-900/10", "")
            .trim();
          card.classList.add(`bg-${activeColor}-900/10`, `border-${activeColor}-900/20`, "opacity-80", "scale-[0.99]");

          const strip = card.querySelector("div.absolute.left-0");
          if (strip) {
            strip.classList.remove("bg-transparent");
            strip.classList.add(`bg-${activeColor}-500`);
          }

          const iconContainer = card.querySelector("div.mt-1");
          if (iconContainer) {
            iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 w-8 h-8 text-emerald-500 fill-emerald-500/20 animate-pop drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
          }

          const details = card.querySelector("div.grid.grid-cols-3");
          if (details) {
            details.classList.remove("opacity-100");
            details.classList.add("opacity-50");
          }
          const notesDiv = card.querySelector("div.border-t");
          if (notesDiv) {
            notesDiv.classList.remove("opacity-100");
            notesDiv.classList.add("opacity-40");
          }
        } else {
          card.classList.remove(`bg-${activeColor}-900/10`, `border-${activeColor}-900/20`, "opacity-80", "scale-[0.99]");
          card.className += " bg-slate-900 border-slate-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-900/10";

          const strip = card.querySelector("div.absolute.left-0");
          if (strip) {
            strip.classList.remove(`bg-${activeColor}-500`);
            strip.classList.add("bg-transparent");
          }

          const iconContainer = card.querySelector("div.mt-1");
          if (iconContainer) {
            iconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle w-8 h-8 text-slate-700 group-hover:text-emerald-500/50 transition-all duration-300 transform group-hover:scale-110"><circle cx="12" cy="12" r="10"/></svg>`;
          }

          const details = card.querySelector("div.grid.grid-cols-3");
          if (details) {
            details.classList.remove("opacity-50");
            details.classList.add("opacity-100");
          }
          const notesDiv = card.querySelector("div.border-t");
          if (notesDiv) {
            notesDiv.classList.remove("opacity-40");
            notesDiv.classList.add("opacity-100");
          }
        }
      }
    }
  });

  // 4. Update overall progress
  const progress = totalSets === 0 ? 0 : Math.round((completedSetsCount / totalSets) * 100);
  const progressText = document.getElementById("progress-text");
  if (progressText) progressText.textContent = `${progress}%`;

  const progressBar = document.getElementById("progress-bar");
  if (progressBar) progressBar.style.width = `${progress}%`;

  // 5. Completion message
  const completionMsg = document.getElementById("completion-message");
  if (completionMsg) {
    const wasHidden = completionMsg.classList.contains("hidden");
    if (progress === 100) {
      completionMsg.classList.remove("hidden");
      if (wasHidden && typeof openWorkoutSummaryModal === "function") {
        setTimeout(openWorkoutSummaryModal, 600);
      }
    } else {
      completionMsg.classList.add("hidden");
    }
  }

  if (typeof updateLiveVolumeUI === "function") {
    updateLiveVolumeUI();
  }
}

function applyCloudState(state, triggerTimers = false) {
  if (!state) return false;

  const natyProfile = (state.profiles || []).find(p => p.id === PRIMARY_NATY_ID || p.display_name === "Naty") || state.profiles?.[0];
  if (natyProfile?.id) {
    localStorage.setItem("gymCloudUserId", natyProfile.id);
  }
  if (natyProfile?.display_name) {
    localStorage.setItem("gymUserDisplayName", natyProfile.display_name);
  }

  if (Array.isArray(state.routines) && state.routines.length) {
    routinesList = state.routines.map((routine) => ({
      id: routine.id,
      name: routine.name,
      isBase: !!routine.is_base,
      data: routine.data || DEFAULT_ROUTINE,
    }));
    localStorage.setItem("vitalRoutinesList", JSON.stringify(routinesList));
    const active = state.routines.find((r) => r.is_active) || state.routines[0];
    if (active) {
      activeRoutineId = active.id;
      localStorage.setItem("vitalActiveRoutineId", activeRoutineId);
      routineData = active.data || DEFAULT_ROUTINE;
    }
  }

  if (Array.isArray(state.training_history) && state.training_history.length) {
    const merged = {};
    const activeUserId = getCloudUserId();
    
    // Sort rows so that the active user's row is processed last (wins)
    const sortedHistory = [...state.training_history].sort((a, b) => {
      if (a.user_id === activeUserId && b.user_id !== activeUserId) return 1;
      if (a.user_id !== activeUserId && b.user_id === activeUserId) return -1;
      return 0;
    });

    sortedHistory.forEach((row) => {
      if (!merged[row.date_key]) {
        // First row for this date: copy exactly
        merged[row.date_key] = {
          alma: !!row.alma_trained,
          naty: !!row.naty_trained,
          deleted: !!row.deleted,
          weights: row.weights || {},
          water: row.water || {},
          completed_sets: row.completed_sets || {},
        };
      } else {
        // Secondary row (legacy): merge
        const existing = merged[row.date_key];
        existing.alma = existing.alma || !!row.alma_trained;
        existing.naty = existing.naty || !!row.naty_trained;
        existing.deleted = existing.deleted || !!row.deleted;
        
        // Merge weights using timestamps
        if (row.weights && typeof row.weights === "object") {
          Object.keys(row.weights).forEach((k) => {
            if (k.endsWith("_ts")) return; // Skip timestamp keys
            
            const cloudVal = row.weights[k];
            const cloudTs = row.weights[k + "_ts"] || {};
            
            if (!existing.weights[k]) {
              existing.weights[k] = { naty: "", alma: "" };
            }
            if (!existing.weights[k + "_ts"]) {
              existing.weights[k + "_ts"] = { naty: 0, alma: 0 };
            }
            
            ["naty", "alma"].forEach((u) => {
              const existingVal = existing.weights[k][u];
              const existingTs = existing.weights[k + "_ts"][u] || 0;
              const currentCloudVal = cloudVal[u];
              const currentCloudTs = cloudTs[u] || 0;
              
              if (currentCloudTs > existingTs) {
                existing.weights[k][u] = currentCloudVal;
                existing.weights[k + "_ts"][u] = currentCloudTs;
              } else if (currentCloudTs === existingTs) {
                existing.weights[k][u] = currentCloudVal || existingVal;
              }
            });
          });
        }
        
        // Merge water
        if (row.water && typeof row.water === "object") {
          if (row.water.naty) existing.water.naty = row.water.naty;
          if (row.water.alma) existing.water.alma = row.water.alma;
        }
        
        // Merge completed sets using timestamps
        if (row.completed_sets && typeof row.completed_sets === "object") {
          Object.keys(row.completed_sets).forEach((k) => {
            if (k.endsWith("_ts")) return; // Skip timestamp keys
            
            const cloudVal = row.completed_sets[k];
            const cloudTs = row.completed_sets[k + "_ts"] || {};
            
            if (!existing.completed_sets[k]) {
              existing.completed_sets[k] = { naty: false, alma: false };
            }
            if (!existing.completed_sets[k + "_ts"]) {
              existing.completed_sets[k + "_ts"] = { naty: 0, alma: 0 };
            }
            
            ["naty", "alma"].forEach((u) => {
              const existingVal = existing.completed_sets[k][u];
              const existingTs = existing.completed_sets[k + "_ts"][u] || 0;
              const currentCloudVal = cloudVal[u];
              const currentCloudTs = cloudTs[u] || 0;
              
              if (currentCloudTs > existingTs) {
                existing.completed_sets[k][u] = currentCloudVal;
                existing.completed_sets[k + "_ts"][u] = currentCloudTs;
              } else if (currentCloudTs === existingTs) {
                existing.completed_sets[k][u] = existingVal || currentCloudVal;
              }
            });
          });
        }
      }
    });

    trainingHistory = merged;
    
    // Merge active daily routine checkboxes and weights from cloud
    const activeStateChanged = loadActiveRoutineStateFromHistory(triggerTimers);
    
    // Ensure today's record in trainingHistory has our current local state
    const today = getDateKey(new Date());
    if (!trainingHistory[today]) {
      trainingHistory[today] = { alma: false, naty: false, weights: {}, completed_sets: {} };
    }
    trainingHistory[today].completed_sets = completedSets;
    trainingHistory[today].weights = {
      ...trainingHistory[today].weights,
      ...setWeights,
    };
    
    localStorage.setItem("gymTrainingHistory", JSON.stringify(trainingHistory));
    
    if (activeStateChanged) {
      updateDOMInPlace();
    }
  }

  if (Array.isArray(state.gamification) && state.gamification.length) {
    const natyId = getCloudUserId();
    const almaId = getAlmaUserId();
    
    // Match exact user_id or pick primary record with highest points / achievements
    const natyG = state.gamification.find((r) => r.user_id === natyId || r.user_id === PRIMARY_NATY_ID) ||
                  state.gamification.filter(r => r.user_id && !r.user_id.endsWith("a")).sort((a,b) => (b.points||0) - (a.points||0))[0];

    const almaG = state.gamification.find((r) => r.user_id === almaId || r.user_id === PRIMARY_ALMA_ID) ||
                  state.gamification.filter(r => r.user_id && r.user_id.endsWith("a")).sort((a,b) => (b.points||0) - (a.points||0))[0];

    if (natyG) {
      gamification.naty = {
        ...gamification.naty,
        points: natyG.points ?? gamification.naty.points,
        streak: natyG.streak ?? gamification.naty.streak,
        freezes: natyG.freezes ?? gamification.naty.freezes,
        frozenDays: natyG.frozen_days || natyG.frozenDays || gamification.naty.frozenDays || [],
        achievements: Array.from(new Set([...(gamification.naty.achievements || []), ...(natyG.achievements || [])])),
        lastReset: natyG.last_reset || gamification.naty.lastReset || 0,
        lastRescuePromptDate: natyG.last_rescue_prompt_date || gamification.naty.lastRescuePromptDate || null,
      };
    }
    
    if (almaG) {
      gamification.alma = {
        ...gamification.alma,
        points: almaG.points ?? gamification.alma.points,
        streak: almaG.streak ?? gamification.alma.streak,
        freezes: almaG.freezes ?? gamification.alma.freezes,
        frozenDays: almaG.frozen_days || almaG.frozenDays || gamification.alma.frozenDays || [],
        achievements: Array.from(new Set([...(gamification.alma.achievements || []), ...(almaG.achievements || [])])),
        lastReset: almaG.last_reset || gamification.alma.lastReset || 0,
        lastRescuePromptDate: almaG.last_rescue_prompt_date || gamification.alma.lastRescuePromptDate || null,
      };
    }
    localStorage.setItem("gymGamification", JSON.stringify(gamification));
  }

  if (Array.isArray(state.water_state) && state.water_state.length) {
    const natyId = getCloudUserId();
    const almaId = getAlmaUserId();
    
    const natyW = state.water_state.find((r) => r.user_id === natyId || r.user_id === PRIMARY_NATY_ID) ||
                  state.water_state.find(r => !r.user_id.endsWith("a"));
    if (natyW) {
      waterState.naty = natyW.current_water_ml || 0;
      waterState.natyGoal = natyW.goal_ml || 2500;
      waterState.date = natyW.last_updated_date || waterState.date;
    }
    
    const almaW = state.water_state.find((r) => r.user_id === almaId || r.user_id === PRIMARY_ALMA_ID) ||
                  state.water_state.find(r => r.user_id.endsWith("a"));
    if (almaW) {
      waterState.alma = almaW.current_water_ml || 0;
      waterState.almaGoal = almaW.goal_ml || 2500;
      waterState.date = almaW.last_updated_date || waterState.date;
    }
    localStorage.setItem("water_tracker_state", JSON.stringify(waterState));
  }

  return true;
}

async function syncFromCloud() {
  const state = await cloudAdapter.getState();
  if (!state || state.error) return false;
  return applyCloudState(state);
}

// --- BACKGROUND POLLING FOR REAL-TIME SYNC ---
let syncIntervalId = null;
let lastLocalChangeTime = 0;

function startCloudPolling() {
  if (syncIntervalId) clearInterval(syncIntervalId);
  syncIntervalId = setInterval(async () => {
    if (isSyncing) return;
    if (Date.now() - lastLocalChangeTime < 10000) return; // Skip if user edited recently
    
    try {
      const state = await cloudAdapter.getState();
      if (state && !state.error) {
        if (isSyncing || Date.now() - lastLocalChangeTime < 10000) return;
        applyCloudState(state, true);
      }
    } catch (e) {
      console.warn("Background sync poll failed", e);
    }
  }, 25000);
}

// Start polling on boot
startCloudPolling();

// Pause polling when tab is inactive to save battery/data
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (syncIntervalId) {
      clearInterval(syncIntervalId);
      syncIntervalId = null;
    }
  } else {
    startCloudPolling();
  }
});

// Initialize routines early
initializeRoutines();

// --- STATE ---
// Auto-select Day
const currentDayOfWeek = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
// Mon(1) -> 0, Fri(5) -> 4. Saturday(6)/Sunday(0) -> 0 (Monday)
let activeTab =
  currentDayOfWeek >= 1 && currentDayOfWeek <= 5 ? currentDayOfWeek - 1 : 0;

// Auto-reset daily logic
const todayStr = new Date().toDateString();
const lastVisit = localStorage.getItem("gymLastVisitDate");
if (lastVisit !== todayStr) {
  // Clear all routine sets for all routines
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key === "gymRoutineSets" || key.startsWith("gymRoutineSets_"))) {
      localStorage.removeItem(key);
      i--; // Adjust index since we removed an item
    }
  }
  localStorage.setItem("gymLastVisitDate", todayStr);
}

loadActiveRoutineState();

// Cloud sync is managed exclusively in init() to prevent race conditions


// --- TIMER STATE ---
const timerState = {
  naty: {
    endTime: null,
    totalSeconds: 0,
    currentSeconds: 0,
    exerciseName: "",
    minimized: false,
    active: false,
    isStopwatch: false,
    startTime: null,
  },
  alma: {
    endTime: null,
    totalSeconds: 0,
    currentSeconds: 0,
    exerciseName: "",
    minimized: false,
    active: false,
    isStopwatch: false,
    startTime: null,
  },
  session: {
    endTime: null,
    totalSeconds: 0,
    currentSeconds: 0,
    exerciseName: "",
    minimized: false,
    active: false,
    isStopwatch: false,
    startTime: null,
  },
};

let globalTimerInterval = null;
let activeFullModalUser = 'naty'; // 'naty', 'alma', or null
let savedScrollY = 0;

// --- CALENDAR STATE ---
let currentView = "routine"; // 'routine' or 'history'
let calendarMonth = new Date().getMonth();
let calendarYear = new Date().getFullYear();
let trainingHistory = JSON.parse(localStorage.getItem("gymTrainingHistory")) || {};
let isSyncing = false;
let _saveToCloudTimer = null;

// Debounced save: batches rapid saves into one call (e.g. typing weights)
function debouncedSaveToCloud(delay) {
  lastLocalChangeTime = Date.now();
  isSyncing = true;
  clearTimeout(_saveToCloudTimer);
  // Always save locally immediately
  localStorage.setItem("gymTrainingHistory", JSON.stringify(trainingHistory));
  localStorage.setItem("gymGamification", JSON.stringify(gamification));
  _saveToCloudTimer = setTimeout(() => saveToCloud(), delay || 2000);
}

// --- CLOUD SYNC FUNCTIONS ---
async function loadFromCloud() {
  const loaded = await syncFromCloud();
  if (!loaded) {
    trainingHistory = JSON.parse(localStorage.getItem("gymTrainingHistory")) || {};
  }
}

// --- GAMIFICATION STATE ---
let gamification = JSON.parse(localStorage.getItem("gymGamification")) || {
  naty: {
    points: 0,
    streak: 0,
    freezes: 0,
    frozenDays: [],
    lastRescuePromptDate: null,
    achievements: [],
    lastReset: 0,
  },
  alma: {
    points: 0,
    streak: 0,
    freezes: 0,
    frozenDays: [],
    lastRescuePromptDate: null,
    achievements: [],
    lastReset: 0,
  },
};

// Ensure structure integrity if updating from older version
["naty", "alma"].forEach((u) => {
  if (!gamification[u])
    gamification[u] = {
      points: 0,
      streak: 0,
      freezes: 0,
      frozenDays: [],
      lastRescuePromptDate: null,
      achievements: [],
      lastReset: 0,
    };
  // Migrar de frozenWeeks a frozenDays si existe
  if (gamification[u].frozenWeeks && !gamification[u].frozenDays) {
    gamification[u].frozenDays = gamification[u].frozenWeeks;
    delete gamification[u].frozenWeeks;
  }
  if (!gamification[u].frozenDays) gamification[u].frozenDays = [];
  if (gamification[u].lastRescuePromptDate === undefined)
    gamification[u].lastRescuePromptDate = null;
  if (gamification[u].lastReset === undefined) gamification[u].lastReset = 0;
  if (!gamification[u].achievements) gamification[u].achievements = [];
  if (gamification[u].streak === undefined) gamification[u].streak = 0;
});

// Clean up unearned achievements if no workouts have been performed yet
const hasWorkouts = Object.values(trainingHistory || {}).some((d) => d && d.naty);
if (!hasWorkouts && gamification && gamification.naty) {
  gamification.naty.achievements = [];
  localStorage.setItem("gymGamification", JSON.stringify(gamification));
}

// Optimization: Update Render immediately with local data (don't wait for cloud/init)
if (typeof updateGamificationUI === "function") {
  updateGamificationUI();
}

async function saveToCloud() {
  lastLocalChangeTime = Date.now();
  isSyncing = true;
  // Always save locally first
  localStorage.setItem("gymTrainingHistory", JSON.stringify(trainingHistory));
  localStorage.setItem("gymGamification", JSON.stringify(gamification));
  localStorage.setItem("water_tracker_state", JSON.stringify(waterState));
  const ok = await cloudAdapter.saveState(buildCloudPayload());
  if (!ok) {
    console.warn("Cloud save failed");
  }
  isSyncing = false;
}

async function seedCloudIfEmpty() {
  const state = await cloudAdapter.getState();
  if (!state) return false;

  const hasAnyData =
    (state.profiles && state.profiles.length) ||
    (state.routines && state.routines.length) ||
    (state.routine_days && state.routine_days.length) ||
    (state.routine_exercises && state.routine_exercises.length) ||
    (state.training_history && state.training_history.length) ||
    (state.gamification && state.gamification.length) ||
    (state.water_state && state.water_state.length);

  if (hasAnyData) return false;

  const res = await fetch("./api/state", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload: buildCloudPayload() }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("Seed failed:", res.status, errText);
    showToast("alert-circle", "text-red-400", `Seed error: ${errText.slice(0, 60)}`);
  }
  const seeded = res.ok;

  if (seeded) await syncFromCloud();
  return seeded;
}

// Startup cloud loading is coordinated in init() to prevent flickering


// --- THEME STATE ---
let currentTheme = localStorage.getItem("gymTheme") || "dark";

async function ensureCloudUserId() {
  return getCloudUserId();
}

async function refreshCloudStatus() {
  const status = document.getElementById("cloud-sync-status");
  if (!status) return null;
  try {
    const test = await fetch(cloudAdapter.stateEndpoint(), { method: "GET" });
    if (test.ok) {
      const data = await test.json();
      status.textContent = data.error
        ? `Error: ${data.error}`
        : `OK - ${data.routines?.length || 0} rutinas, ${data.training_history?.length || 0} historial`;
    } else {
      const text = await test.text().catch(() => "");
      status.textContent = `HTTP ${test.status}: ${text.slice(0, 80)}`;
    }
  } catch {
    status.textContent = `No se puede conectar a ${cloudAdapter.stateEndpoint()}`;
  }
  return { ok: true };
}

async function upsertRow(table, row, conflict = "id") {
  void table;
  void row;
  void conflict;
  scheduleCloudSync();
  return true;
}

async function fetchRows(table, filters = {}) {
  void table;
  void filters;
  const state = await fetchCloudState();
  if (!state) return null;
  return state[table] || [];
}

async function deleteRows(table, filters = {}) {
  void table;
  void filters;
  scheduleCloudSync();
  return true;
}

function makeRowId(prefix) {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildRoutineTablesFromData(routineId, routineDataArray) {
  const days = [];
  const exercises = [];

  routineDataArray.forEach((day, dayIndex) => {
    const dayId = makeRowId(`${routineId}-day`);
    days.push({
      id: dayId,
      routine_id: routineId,
      day_index: dayIndex,
      day_name: day.day,
      title: day.title,
    });

    (day.exercises || []).forEach((ex, position) => {
      exercises.push({
        id: makeRowId(`${routineId}-ex`),
        routine_day_id: dayId,
        position,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        rir: ex.rir,
        notes: ex.notes,
        primary_muscles: ex.muscles?.primary || [],
        secondary_muscles: ex.muscles?.secondary || [],
      });
    });
  });

  return { days, exercises };
}

function buildRoutineDataFromTables(routineId, daysRows, exercisesRows) {
  const routineDays = (daysRows || [])
    .filter((d) => d.routine_id === routineId)
    .sort((a, b) => a.day_index - b.day_index);

  return routineDays.map((day) => ({
    day: day.day_name,
    title: day.title,
    exercises: (exercisesRows || [])
      .filter((ex) => ex.routine_day_id === day.id)
      .sort((a, b) => a.position - b.position)
      .map((ex) => ({
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        rir: ex.rir,
        notes: ex.notes,
        muscles: {
          primary: ex.primary_muscles || [],
          secondary: ex.secondary_muscles || [],
        },
      })),
  }));
}

async function saveRoutineToCloud(routine) {
  void routine;
  scheduleCloudSync();
  return true;
}

async function setActiveRoutineCloud(routineId) {
  void routineId;
  scheduleCloudSync();
  return true;
}

async function migrateLocalStorageToCloud() {
  const userId = await ensureCloudUserId();
  const migratedFlag = `gymCloudMigrated_${userId}`;
  if (localStorage.getItem(migratedFlag) === "true") return true;

  await saveToCloud();

  localStorage.setItem(migratedFlag, "true");
  return true;
}

let _cloudSyncTimer = null;

function scheduleCloudSync(delay = 1500) {
  clearTimeout(_cloudSyncTimer);
  _cloudSyncTimer = setTimeout(() => {
    saveToCloud();
  }, delay);
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme();
  localStorage.setItem("gymTheme", currentTheme);
}

function applyTheme() {
  const body = document.body;
  const html = document.documentElement; // Tailwind looks here by default
  const icon = document.getElementById("theme-icon");
  const sidebarIcon = document.getElementById("theme-icon-sidebar");

  if (currentTheme === "light") {
    body.classList.add("light");
    body.classList.remove("dark", "bg-slate-950", "text-slate-200");
    html.classList.add("light");
    html.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
    body.setAttribute("data-theme", "light");
    if (icon) icon.outerHTML = '<i id="theme-icon" data-lucide="sun" class="w-4 h-4 text-amber-500"></i>';
    if (sidebarIcon) sidebarIcon.outerHTML = '<i id="theme-icon-sidebar" data-lucide="sun" class="w-4 h-4 text-amber-500"></i>';
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    html.classList.remove("light");
    html.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    body.setAttribute("data-theme", "dark");
    if (icon) icon.outerHTML = '<i id="theme-icon" data-lucide="moon" class="w-4 h-4 text-slate-300"></i>';
    if (sidebarIcon) sidebarIcon.outerHTML = '<i id="theme-icon-sidebar" data-lucide="moon" class="w-4 h-4 text-slate-400"></i>';
  }
  
  if (window.lucide) {
      window.lucide.createIcons();
  }

  // Update theme-color meta tag for mobile status bar matching
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", currentTheme === "light" ? "#f9fafb" : "#000000");
  }

  if (typeof lucide !== "undefined" && lucide.createIcons) {
    safeCreateIcons();
  }
}

// Apply saved theme on load
onReady(() => {
  applyTheme();

  // Format Date for Header and Sidebar
  const dateResult = document.getElementById("header-full-date");
  const sidebarDate = document.getElementById("sidebar-date");
  const now = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formatted = now.toLocaleDateString("es-ES", options);
  const formattedUpper = formatted.toUpperCase();

  if (dateResult) dateResult.textContent = formattedUpper;
  if (sidebarDate) sidebarDate.textContent = formatted;
});

// --- VIEW FUNCTIONS ---
let scrollPosition = 0;

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains("open");

  if (isOpen) {
    sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
  } else {
    sidebar.classList.add("open");
    if (overlay) overlay.classList.add("open");
  }
  if (typeof triggerHaptic === "function") triggerHaptic();
}

function closeSidebarIfOpen() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  if (sidebar && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
  }
}

function navigateTo(view) {
  closeSidebarIfOpen();
  currentView = view;

  // Hide all main views
  const viewIds = [
    "routine-view",
    "history-view",
    "view-water",
    "view-stats",
    "view-achievements",
    "ai-routine-view"
  ];
  viewIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  // Show selected view and trigger render
  if (view === "routine") {
    document.getElementById("routine-view").classList.remove("hidden");
  } else if (view === "history") {
    const historyView = document.getElementById("history-view");
    if (historyView) historyView.classList.remove("hidden");
    try {
      renderCalendar();
      updateStats();
    } catch(err) {
      if (historyView) {
        historyView.innerHTML = `<div style="color:red; padding:20px; font-weight:bold;">Error: ${err.message}<br/>${err.stack}</div>`;
      }
    }
  } else if (view === "water") {
    const waterView = document.getElementById("view-water");
    if (waterView) {
      waterView.classList.remove("hidden");
      calculateAndRenderWaterGoal();
    }
  } else if (view === "stats") {
    const statsView = document.getElementById("view-stats");
    if (statsView) {
      statsView.classList.remove("hidden");
      renderCharts();
    }
  } else if (view === "achievements") {
    const achievementsView = document.getElementById("view-achievements");
    if (achievementsView) {
      achievementsView.classList.remove("hidden");
      renderAchievements();
    }
  } else if (view === "ai-routine") {
    const aiView = document.getElementById("ai-routine-view");
    if (aiView) {
      aiView.classList.remove("hidden");
      // Only initialize if no existing conversation
      if (chatMessages.length === 0) {
        initAIChat();
      }
    }
  }

  // Update Sidebar Active State
  const navItems = document.querySelectorAll("#sidebar nav button");
  navItems.forEach((btn) => {
    if (btn.onclick && btn.onclick.toString().includes(`'${view}'`)) {
      btn.classList.add("bg-slate-800", "text-white");
      btn.classList.remove("text-slate-300");
    } else {
      btn.classList.remove("bg-slate-800", "text-white");
      btn.classList.add("text-slate-300");
    }
  });

  // Close Sidebar on Mobile
  const sidebar = document.getElementById("sidebar");
  if (sidebar && sidebar.classList.contains("open")) {
    toggleSidebar();
  }

  safeCreateIcons();
  if (typeof triggerHaptic === "function") triggerHaptic();
}

// --- SWIPE GESTURES FOR MOBILE ---
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", (e) => {
  if (e.touches && e.touches.length > 0) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}, { passive: true });

document.addEventListener("touchend", (e) => {
  if (!e.changedTouches || e.changedTouches.length === 0) return;
  const deltaX = e.changedTouches[0].clientX - touchStartX;
  const deltaY = e.changedTouches[0].clientY - touchStartY;
  
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
    const sidebar = document.getElementById("sidebar");
    const isOpen = sidebar && sidebar.classList.contains("open");
    
    // Swipe Right from edge -> Open
    if (deltaX > 0 && touchStartX < 50 && !isOpen) {
      toggleSidebar();
    }
    // Swipe Left -> Close
    else if (deltaX < 0 && isOpen) {
      toggleSidebar();
    }
  }
}, { passive: true });

// --- CALENDAR FUNCTIONS ---
function getDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

function markDayCompleted(who) {
  const today = getDateKey(new Date());

  if (!trainingHistory[today]) {
    trainingHistory[today] = { alma: false, naty: false, weights: {} };
  }

  // Ensure weights object exists if migrating from old data
  if (!trainingHistory[today].weights) {
    trainingHistory[today].weights = {};
  }

  // Snapshot current weights into history for today
  // We merge to avoid overwriting if they check one person then the other
  trainingHistory[today].weights = {
    ...trainingHistory[today].weights,
    ...setWeights,
  };

  // AWARD POINTS
  const POINTS_PER_WORKOUT = 100;
  let pointsMsg = "";

  // Track previous streak for celebration popup
  const prevNatyStreak = gamification.naty ? (gamification.naty.streak || 0) : 0;
  const prevAlmaStreak = gamification.alma ? (gamification.alma.streak || 0) : 0;

  if (who === "alma") {
    trainingHistory[today].alma = true;
    gamification.alma.points += POINTS_PER_WORKOUT;
    pointsMsg = ` (+${POINTS_PER_WORKOUT} pts)`;
  } else if (who === "naty") {
    trainingHistory[today].naty = true;
    gamification.naty.points += POINTS_PER_WORKOUT;
    pointsMsg = ` (+${POINTS_PER_WORKOUT} pts)`;
  } else if (who === "both") {
    trainingHistory[today].alma = true;
    trainingHistory[today].naty = true;
    gamification.alma.points += POINTS_PER_WORKOUT;
    gamification.naty.points += POINTS_PER_WORKOUT;
    pointsMsg = ` (+${POINTS_PER_WORKOUT} pts c/u)`;
  }

  if (typeof checkAchievements === "function") {
    checkAchievements();
  }

  updateGamificationUI();
  saveToCloud();

  // Trigger Duolingo-style streak celebration if streak increased
  const newNatyStreak = gamification.naty ? (gamification.naty.streak || 0) : 0;
  const newAlmaStreak = gamification.alma ? (gamification.alma.streak || 0) : 0;

  if ((who === "naty" || who === "both") && newNatyStreak > prevNatyStreak) {
    setTimeout(() => showStreakCelebration("naty", newNatyStreak), 400);
  } else if (who === "alma" && newAlmaStreak > prevAlmaStreak) {
    setTimeout(() => showStreakCelebration("alma", newAlmaStreak), 400);
  }

  // Show toast notification
  const iconType = who === "both" ? "users" : "user";
  const iconColor =
    who === "both"
      ? "text-emerald-400"
      : who === "alma"
        ? "text-pink-400"
        : "text-blue-400";
  const name =
    who === "both" ? "Alma y Naty" : who === "alma" ? "Alma" : "Naty";
  showToast(iconType, iconColor, `¡Día registrado para ${name}!${pointsMsg}`);

  if (currentView === "history") {
    renderCalendar();
    updateStats();
  }
}

function showToast(iconType, iconColor, message) {
  const toast = document.getElementById("toast");
  const iconEl = document.getElementById("toast-icon");
  iconEl.setAttribute("data-lucide", iconType);
  iconEl.className = `w-6 h-6 ${iconColor}`;
  document.getElementById("toast-message").textContent = message;
  toast.classList.remove("hidden");
  safeCreateIcons();
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

function changeMonth(delta) {
  calendarMonth += delta;
  if (calendarMonth > 11) {
    calendarMonth = 0;
    calendarYear++;
  } else if (calendarMonth < 0) {
    calendarMonth = 11;
    calendarYear--;
  }
  renderCalendar();
  updateStats();
}

function prevMonth() {
  changeMonth(-1);
}

function nextMonth() {
  changeMonth(1);
}

// --- CALENDAR RENDERER ---
function renderCalendar() {
  const grid = document.getElementById("calendar-grid");
  const monthLabel = document.getElementById("calendar-month") || document.getElementById("current-month-year");

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  if (monthLabel) {
    monthLabel.textContent = `${monthNames[calendarMonth]} ${calendarYear}`;
  }

  if (!grid) return;
  grid.innerHTML = "";

  const firstDay = new Date(calendarYear, calendarMonth, 1);
  const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const today = new Date();
  const todayKey = getDateKey(today);

  // Empty cells for days before month starts
  for (let i = 0; i < startDayOfWeek; i++) {
    grid.innerHTML += `<div class="p-2"></div>`;
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(calendarYear, calendarMonth, day);
    const dateKey = getDateKey(date);

    // Legacy support
    const legacyKey = date.toDateString();

    const isToday = dateKey === todayKey;

    // Check both
    const history = (trainingHistory || {})[dateKey] || (trainingHistory || {})[legacyKey];

    let bgClass = "bg-slate-800/50 hover:bg-slate-800";
    let borderClass = "border-transparent";
    let icon = "";

    if (history && !history.deleted) {
      if (history.naty) {
        bgClass = "bg-blue-500/20";
        borderClass = "border-blue-500";
        icon = '<i data-lucide="check" class="w-3.5 h-3.5 text-blue-400"></i>';
      }
    }

    // Water indicators
    let waterIndicators = "";
    if (history && history.water) {
      // Naty Water Dot
      if (history.water.naty >= (history.water.natyGoal || 3500)) {
        waterIndicators +=
          '<div class="w-1.5 h-1.5 rounded-full bg-blue-500" title="Naty: Meta cumplida"></div>';
      } else if (history.water.naty > 0) {
        waterIndicators +=
          '<div class="w-1.5 h-1.5 rounded-full bg-slate-500" title="Naty: ' +
          history.water.naty +
          'ml"></div>';
      }
    }

    // Check if we have hydration data in waterState (for TODAY live update)
    if (isToday && waterState) {
      // Reset to re-calc based on live waterState if it's today
      waterIndicators = "";
      if (waterState.naty >= (waterState.natyGoal || 3500)) {
        waterIndicators +=
          '<div class="w-1.5 h-1.5 rounded-full bg-blue-500" title="Naty: Meta cumplida"></div>';
      } else if (waterState.naty > 0) {
        waterIndicators +=
          '<div class="w-1.5 h-1.5 rounded-full bg-slate-500" title="Naty: ' +
          waterState.naty +
          'ml"></div>';
      }
    }

    const todayRing = isToday
      ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900"
      : "";

    grid.innerHTML += `
                    <div class="min-h-[3rem] p-1 ${bgClass} border ${borderClass} rounded-lg flex flex-col items-center justify-center ${todayRing} transition-colors cursor-pointer" 
                         onclick="toggleDayModal('${dateKey}')">
                        <span class="text-sm font-medium ${
                          isToday ? "text-emerald-400" : "text-slate-300"
                        }">${day}</span>
                        <div class="flex gap-1 items-center justify-center mt-0.5">
                            ${icon}
                            ${waterIndicators ? `<div class="flex gap-0.5">${waterIndicators}</div>` : ""}
                        </div>
                    </div>
                `;
  }
  safeCreateIcons();
}

function getVolumeHistory(user, days) {
  const history = [];
  const date = new Date();

  // Go back 'days' amount
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(date.getDate() - i);
    const key = getDateKey(d);

    // Legacy mapping
    const legacyKey = d.toDateString();

    // Calculate volume for that day
    let vol = 0;

    // Check both keys
    const record = trainingHistory[key] || trainingHistory[legacyKey];

    if (record && record.weights) {
      // Iterate all keys in weights
      Object.entries(record.weights).forEach(([wKey, pair]) => {
        if (wKey.endsWith("_ts")) return; // Skip timestamp keys
        if (pair[user]) vol += (parseInt(pair[user]) || 0) * 10;
      });
    }
    // Correct format for new chart logic {date, value}
    history.push({ date: key, value: vol });
  }
  return history;
}

function toggleDayModal(dateKey) {
  const history = trainingHistory[dateKey];
  const [year, month, day] = dateKey.split("-");
  const dateStr = `${day}/${month}/${year}`;

  let status = "Sin registro";
  if (history) {
    if (history.alma && history.naty) status = "Ambos entrenaron";
    else if (history.alma) status = "Solo Alma";
    else if (history.naty) status = "Solo Naty";
  }

  // Water status
  let waterStatus = "";
  if (history && history.water) {
    const natyWater = history.water.naty || 0;
    const almaWater = history.water.alma || 0;

    if (natyWater > 0 || almaWater > 0) {
      waterStatus = `<div class="mt-3 pt-3 border-t border-slate-700">
        <div class="flex items-center gap-2 mb-2">
          <i data-lucide="droplets" class="w-4 h-4 text-sky-400"></i>
          <span class="text-xs font-bold text-slate-400">HIDRATACIÓN</span>
        </div>
        <div class="flex gap-4 text-sm">
          ${
            natyWater > 0
              ? `<div class="flex items-center gap-1">
            <span><i data-lucide="user" class="w-4 h-4 text-sky-400"></i></span>
            <span class="${natyWater >= 2500 ? "text-emerald-400" : "text-sky-300"}">${natyWater >= 2500 ? "✅ Meta" : natyWater + "ml"}</span>
          </div>`
              : ""
          }
          ${
            almaWater > 0
              ? `<div class="flex items-center gap-1">
            <span><i data-lucide="user" class="w-4 h-4 text-pink-400"></i></span>
            <span class="${almaWater >= 2000 ? "text-emerald-400" : "text-pink-300"}">${almaWater >= 2000 ? "✅ Meta" : almaWater + "ml"}</span>
          </div>`
              : ""
          }
        </div>
      </div>`;
    }
  }

  // Show custom modal
  document.getElementById("day-modal-title").textContent = dateStr;
  document.getElementById("day-modal-status").innerHTML = status + waterStatus;
  selectedDateKey = dateKey;

  const modal = document.getElementById("day-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  safeCreateIcons();
}

let selectedDateKey = null;

// --- WEATHER & WATER LOGIC ---

// Persistent User Data (Weights, Heights, Ages)
let userProfile = JSON.parse(localStorage.getItem("gymUserProfile")) || {
  naty: { weight: 80, height: 175, age: 23 },
  alma: { weight: 60, height: 165, age: 23 },
};

// Ensure fields exist (migration from old data)
if (!userProfile.naty.height) userProfile.naty.height = 175;
if (!userProfile.alma.height) userProfile.alma.height = 165;
if (!userProfile.naty.age) userProfile.naty.age = 23;
if (!userProfile.alma.age) userProfile.alma.age = 23;

// Water State
let waterState = JSON.parse(localStorage.getItem("water_tracker_state")) || {
  naty: 0,
  alma: 0,
  natyGoal: 2500,
  almaGoal: 2000,
  history: [],
  date: new Date().toDateString(),
};

// Reset if new day
if (waterState.date !== new Date().toDateString()) {
  waterState.naty = 0;
  waterState.alma = 0;
  waterState.history = [];
  waterState.date = new Date().toDateString();
  saveWaterState(); // Safe to call if defined, or we define it below
}

let currentTemp = parseInt(localStorage.getItem("cachedTemp")) || 25; // Load cached or default

// Show cached temp immediately on load
if (localStorage.getItem("cachedTemp")) {
  setTimeout(() => updateWeatherUI(), 0);
}

async function fetchWeather() {
  try {
    const res = await fetch("https://wttr.in/Mendoza?format=j1");
    if (res.ok) {
      const data = await res.json();
      if (data.current_condition && data.current_condition.length > 0) {
        currentTemp = parseInt(data.current_condition[0].temp_C);
        localStorage.setItem("cachedTemp", currentTemp); // Cache for next load
        updateWeatherUI();
      }
    }
  } catch (e) {
    console.warn("Weather fetch failed", e);
  }
}

function updateWeatherUI() {
  // Header (desktop)
  const el = document.getElementById("weather-temp-header");
  const container = document.getElementById("header-weather");

  if (el) {
    el.textContent = `${currentTemp}°C`;
    if (container) container.classList.remove("hidden");
  }

  // Sidebar (mobile)
  const sidebarTemp = document.getElementById("sidebar-temp");
  const sidebarWeatherContainer = document.getElementById("sidebar-weather");

  if (sidebarTemp) {
    sidebarTemp.textContent = `${currentTemp}°C`;
    if (sidebarWeatherContainer)
      sidebarWeatherContainer.classList.remove("hidden");
  }
}

// --- AQUAFLOW LOGIC ---

const TANK_HEIGHT_SVG = 605; // Matches SVG ViewBox Height

// Smart Water Goal Calculator
function calculateSmartWaterGoal(user) {
  const profile = userProfile[user];
  const weight = profile.weight || 70;
  const height = profile.height || 170;
  const age = profile.age || 25;

  // Base: 35ml per kg of body weight
  let goal = weight * 35;

  // Height adjustment: +100ml if taller than 170cm
  if (height > 170) {
    goal += 100;
  }

  // Age adjustment: +100ml if under 30 (more active metabolism)
  if (age < 30) {
    goal += 100;
  } else if (age > 50) {
    goal -= 100;
  }

  // Temperature bonus
  if (currentTemp > 30) {
    goal += 500;
  } else if (currentTemp > 25) {
    goal += 300;
  }

  // Training day bonus: check if today is a training day
  const today = getDateKey(new Date());
  const history = trainingHistory[today];
  if (history && history[user]) {
    goal += 400;
  }

  // Round to nearest 50
  goal = Math.round(goal / 50) * 50;

  // Clamp between 1500 and 4500
  return Math.max(1500, Math.min(4500, goal));
}

function initAquaFlow() {
  // Calculate smart goals based on profile and conditions
  waterState.natyGoal = calculateSmartWaterGoal("naty");
  waterState.almaGoal = calculateSmartWaterGoal("alma");
  saveWaterState();

  renderAquaFlow();
  startBubbleEngine("naty");
  startBubbleEngine("alma");

  // Set Slider Values
  const sliderNaty = document.getElementById("goal-input-naty");
  const sliderAlma = document.getElementById("goal-input-alma");
  if (sliderNaty) {
    sliderNaty.value = waterState.natyGoal;
    sliderNaty.addEventListener("input", (e) => {
      waterState.natyGoal = parseInt(e.target.value);
      saveWaterState();
      renderAquaFlow();
    });
  }
  if (sliderAlma) {
    sliderAlma.value = waterState.almaGoal;
    sliderAlma.addEventListener("input", (e) => {
      waterState.almaGoal = parseInt(e.target.value);
      saveWaterState();
      renderAquaFlow();
    });
  }
}

function calculateAndRenderWaterGoal() {
  // Redirect to new renderer
  renderAquaFlow();
  renderWaterHistory();
}

function renderAquaFlow() {
  renderUserWater("naty");
  renderUserWater("alma");
}

function renderUserWater(user) {
  console.log(`[DEBUG] renderUserWater called for ${user}`);
  const current = waterState[user] || 0;
  const goal = waterState[`${user}Goal`] || 2500;
  console.log(`[DEBUG] Code State: current=${current}, goal=${goal}`);

  // Update Text
  const percent = Math.min(100, Math.floor((current / goal) * 100));
  const percentEl = document.getElementById(`percent-${user}`);
  const amountEl = document.getElementById(`amount-${user}`);
  const goalTextEl = document.getElementById(`goal-text-${user}`);

  console.log(
    `[DEBUG] Elements found? percent=${!!percentEl}, amount=${!!amountEl}`,
  );

  if (percentEl) percentEl.textContent = `${percent}%`;
  if (amountEl) amountEl.textContent = `${current} / ${goal} ml`;
  if (goalTextEl) goalTextEl.textContent = `${goal} ml`;

  // Update SVG Water Level
  // visualPercent clamped to 1 (100%) so it doesn't overflow visually
  const visualPercent = Math.min(1, current / goal);
  const newY = TANK_HEIGHT_SVG - visualPercent * TANK_HEIGHT_SVG;
  console.log(`[DEBUG] NewY: ${newY}`);

  const rect = document.getElementById(`water-rect-${user}`);
  console.log(`[DEBUG] Rect found? ${!!rect}`);
  if (rect) {
    rect.setAttribute("y", newY);
  }
}

// Override addWater to handle new signature
// Old: addWater(amount) -> implied Naty? No, original app didn't specify user clearly in addWater,
// actually the previous code had specific buttons? Let's check.
// The new HTML uses addWater('naty', 250).

// We need to keep a compatible signature or update all calls.
// The HTML calls `addWater('naty', 250)`, so we update global addWater.

// Override addWater to handle new signature
// Override addWater to handle new signature
function addWater(user, amount) {
  console.log(`[DEBUG] addWater called for ${user}, amount: ${amount}`);
  if (!amount || amount === 0) return;

  const current = waterState[user] || 0;
  const goal = waterState[`${user}Goal`] || 2500;
  const oldPercent = current / goal;

  // Update State
  waterState[user] = Math.max(0, current + amount);

  // Add to History
  if (!waterState.history) waterState.history = [];
  waterState.history.unshift({
    user: user,
    amount: amount,
    time: new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
  // Keep last 20 entries
  if (waterState.history.length > 20) waterState.history.pop();

  saveWaterState();

  // SYNC WITH TRAINING HISTORY (for calendar display)
  try {
    const todayKey = getDateKey(new Date());
    if (!trainingHistory[todayKey]) {
      trainingHistory[todayKey] = { alma: false, naty: false, weights: {} };
    }
    if (!trainingHistory[todayKey].water) {
      trainingHistory[todayKey].water = {};
    }
    trainingHistory[todayKey].water.naty = waterState.naty;
    trainingHistory[todayKey].water.alma = waterState.alma;
    localStorage.setItem("gymTrainingHistory", JSON.stringify(trainingHistory));

    // TRIGGER CLOUD SYNC IMMEDIATELY
    saveToCloud();

    // Reward +25 gems first time goal reached today
    if (oldPercent < 1 && waterState[user] >= goal && user === "naty") {
      if (!gamification.naty) gamification.naty = { points: 0, streak: 0, freezes: 0 };
      gamification.naty.points = (gamification.naty.points || 0) + 25;
      saveToCloud();
      updateGamificationUI();
      if (typeof showToast === "function") {
        showToast("droplet", "text-sky-400", "¡Meta de agua completada! +25 💎");
      }
      if (typeof triggerConfetti === "function") triggerConfetti();
    }
  } catch (e) {
    console.error("Error syncing water:", e);
  }

  // Visuals
  try {
    if (amount > 0) {
      animateStream(user);
      animateShake(user);

      // Check Goal
      const newPercent = waterState[user] / goal;
      const oldPercent = Math.max(0, waterState[user] - amount) / goal; // Approx existing logic
      if (oldPercent < 1 && newPercent >= 1) {
        triggerConfetti();
      }
    }
  } catch (e) {
    console.warn("Anim error", e);
  }

  console.log(`[DEBUG] Calling renderAquaFlow from addWater`);
  renderAquaFlow();
  renderWaterHistory();
}

// --- HELPERS ---
function getDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function renderWaterHistory() {
  const container = document.getElementById("water-history-list");
  if (!container) return; // Need to create this in HTML first

  container.innerHTML = "";
  const history = waterState.history || [];

  if (history.length === 0) {
    container.innerHTML =
      '<p class="text-slate-500 text-xs italic text-center">Sin registros hoy</p>';
    return;
  }

  history.forEach((entry) => {
    const item = document.createElement("div");
    item.className =
      "flex justify-between items-center bg-slate-800/50 p-2 rounded-lg text-xs";
    const color = entry.user === "naty" ? "text-blue-400" : "text-pink-400";
    const icon = entry.user === "naty" ? `<i data-lucide="user" class="w-4 h-4 inline-block text-sky-400"></i>` : `<i data-lucide="user" class="w-4 h-4 inline-block text-pink-400"></i>`;
    item.innerHTML = `
            <span class="flex items-center gap-2 ${color}">
                <span>${icon}</span>
                <span class="font-bold">${entry.user === "naty" ? "Naty" : "Alma"}</span>
            </span>
            <span class="text-white font-mono">${entry.amount > 0 ? "+" : ""}${entry.amount}ml</span>
            <span class="text-slate-500">${entry.time}</span>
        `;
    container.appendChild(item);
  });
}

function saveWaterState() {
  localStorage.setItem("water_tracker_state", JSON.stringify(waterState));
  scheduleCloudSync();
}

function resetDay(user) {
  // Reset water for this user
  waterState[user] = 0;

  // Also clear history entries for this user
  if (waterState.history) {
    waterState.history = waterState.history.filter(
      (entry) => entry.user !== user,
    );
  }

  saveWaterState();
  renderAquaFlow();
  renderWaterHistory();

  // Show friendly toast instead of browser alert
  const userName = user === "naty" ? "Naty" : "Alma";
  const iconColor = user === "naty" ? "text-blue-400" : "text-pink-400";
  showToast("rotate-ccw", iconColor, `Consumo de ${userName} reiniciado`);
}

// Animations
function animateStream(user) {
  const stream = document.getElementById(`water-stream-${user}`);
  const bottle = document.getElementById(`bottle-container-${user}`);
  if (!stream || !bottle) return;

  // Approx height logic
  const goal = waterState[`${user}Goal`] || 2500;
  const current = waterState[user] || 0;
  const percent = Math.min(1, current / goal);

  const waterHeightPx = bottle.offsetHeight * percent;
  const dropDistance = bottle.offsetHeight - waterHeightPx + 15;

  stream.style.height = `${dropDistance}px`;
  stream.classList.add("active");

  setTimeout(() => {
    stream.classList.remove("active");
    stream.style.height = "0";
  }, 600);
}

function animateShake(user) {
  const b = document.getElementById(`bottle-container-${user}`);
  if (b) {
    b.classList.remove("shaking");
    void b.offsetWidth; // trigger reflow
    b.classList.add("shaking");
  }
}

function startBubbleEngine(user) {
  const group = document.getElementById(`bubbles-group-${user}`);
  if (!group) return;

  setInterval(
    () => {
      // Only if water exists
      if ((waterState[user] || 0) > 0) {
        const bubble = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        const x = Math.random() * 100 + 40;
        const r = Math.random() * 5 + 2;
        const startY = 600;

        bubble.setAttribute("cx", x);
        bubble.setAttribute("cy", startY);
        bubble.setAttribute("r", r);
        bubble.classList.add("svg-bubble");

        group.appendChild(bubble);
        setTimeout(() => bubble.remove(), 4000);
      }
    },
    1500 + Math.random() * 1000,
  ); // Randomize
}

function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Simple confetti
  let particles = [];
  const colors = ["#0ea5e9", "#ec4899", "#fcd34d"];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 100,
    });
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;
    particles.forEach((p) => {
      if (p.life > 0) {
        active = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.5;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    if (active) requestAnimationFrame(tick);
  }
  tick();
}

// --- PROFILE MODAL FUNCTIONS ---
function openProfileModal() {
  closeSidebarIfOpen();
  const wEl = document.getElementById("profile-weight-naty");
  const hEl = document.getElementById("profile-height-naty");
  const aEl = document.getElementById("profile-age-naty");

  if (wEl) wEl.value = userProfile.naty.weight;
  if (hEl) hEl.value = userProfile.naty.height;
  if (aEl) aEl.value = userProfile.naty.age;

  const apiKeyInput = document.getElementById("profile-gemini-key");
  if (apiKeyInput) {
    apiKeyInput.value = localStorage.getItem("gymGeminiApiKey") || "";
  }

  const cloudApiBaseUrlInput = document.getElementById("cloud-api-base-url");
  if (cloudApiBaseUrlInput) {
    cloudApiBaseUrlInput.value = getCloudApiBaseUrl();
  }

  refreshCloudStatus();

  const modal = document.getElementById("profile-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  setTimeout(() => {
    modal.classList.remove("opacity-0");
    const inner = modal.querySelector("div");
    if (inner) inner.classList.remove("scale-95");
  }, 10);

  safeCreateIcons();
}

function closeProfileModal() {
  const modal = document.getElementById("profile-modal");
  if (!modal) return;
  modal.classList.add("opacity-0");
  const inner = modal.querySelector("div");
  if (inner) inner.classList.add("scale-95");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

function saveProfile() {
  const wEl = document.getElementById("profile-weight-naty");
  const hEl = document.getElementById("profile-height-naty");
  const aEl = document.getElementById("profile-age-naty");

  if (wEl && wEl.value) userProfile.naty.weight = parseInt(wEl.value);
  if (hEl && hEl.value) userProfile.naty.height = parseInt(hEl.value);
  if (aEl && aEl.value) userProfile.naty.age = parseInt(aEl.value);

  localStorage.setItem("gymUserProfile", JSON.stringify(userProfile));

  const apiKeyInput = document.getElementById("profile-gemini-key");
  if (apiKeyInput) {
    localStorage.setItem("gymGeminiApiKey", apiKeyInput.value.trim());
  }

  const cloudApiBaseUrlInput = document.getElementById("cloud-api-base-url");
  if (cloudApiBaseUrlInput) {
    const value = cloudApiBaseUrlInput.value.trim();
    if (value) localStorage.setItem("gymCloudApiBaseUrl", value);
  }

  scheduleCloudSync();

  // Recalculate water goals based on new profile
  waterState.natyGoal = calculateSmartWaterGoal("naty");
  saveWaterState();

  renderAquaFlow();
  closeProfileModal();
  showToast(
    "user-cog",
    "text-violet-400",
    "Perfil actualizado - meta de agua recalculada",
  );
}

// --- ADVANCED STATS LOGIC ---
function renderAdvancedStats() {
  const now = new Date();

  // 1. Weekly Progress (Mon-Sun) - Goal: Naty 4 days (Mon, Tue, Wed, Fri)
  const day = now.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const monday = new Date(now.getFullYear(), now.getMonth(), diff);

  let natyWeekCount = 0;

  // Iterate 7 days from Monday
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const k = getDateKey(d);
    if ((trainingHistory || {})[k] && (trainingHistory || {})[k].naty) {
      natyWeekCount++;
    }
  }

  // Update Week UI
  const weekNatyEl = document.getElementById("week-naty-current");
  if (weekNatyEl) weekNatyEl.textContent = natyWeekCount;

  const natyPct = Math.min(100, (natyWeekCount / 4) * 100);

  const weekNatyBar = document.getElementById("week-naty-bar");
  if (weekNatyBar) weekNatyBar.style.width = `${natyPct}%`;

  // Badge status
  const weekBadge = document.getElementById("week-status-badge");
  if (weekBadge) {
    if (natyWeekCount >= 4) {
      weekBadge.textContent = "¡Meta Semanal Cumplida!";
      weekBadge.className =
        "px-2 py-1 rounded-md bg-emerald-500/20 text-xs font-bold text-emerald-400 border border-emerald-500/50";
    } else {
      weekBadge.textContent = "En Progreso";
      weekBadge.className =
        "px-2 py-1 rounded-md bg-slate-800 text-xs font-bold text-slate-500 border border-slate-700";
    }
  }

  // 2. Month & Year Totals - VOLUME BASED (Kg)
  let monthVolume = 0;
  let yearVolume = 0; // In Tonnes likely, or High Kg
  let totalNatyYearVol = 0;

  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const currentYearKey = `${now.getFullYear()}`;
  const AVG_REPS = 10; // Placeholder for volume calc

  Object.keys(trainingHistory || {}).forEach((key) => {
    // Check if entry belongs to current month/year
    const isMonth = key.startsWith(currentMonthKey);
    const isYear = key.startsWith(currentYearKey);

    if (!isYear) return;

    const dayWeights = (trainingHistory[key] && trainingHistory[key].weights) ? trainingHistory[key].weights : {};
    let dayVolNaty = 0;

    Object.entries(dayWeights).forEach(([wKey, val]) => {
      if (wKey.endsWith("_ts")) return; // Skip timestamp keys
      if (val && val.naty) dayVolNaty += (parseFloat(val.naty) || 0) * AVG_REPS;
    });

    if (isMonth) {
      monthVolume += dayVolNaty;
    }
    if (isYear) {
      yearVolume += dayVolNaty;
      totalNatyYearVol += dayVolNaty;
    }
  });

  // Render Volume Stats
  const monthEl = document.getElementById("month-volume");
  if (monthEl) monthEl.textContent = monthVolume.toLocaleString("es-AR");

  const yearEl = document.getElementById("year-volume");
  if (yearEl) yearEl.textContent = (yearVolume / 1000).toFixed(1);

  const natyYearEl = document.getElementById("total-naty-volume");
  if (natyYearEl)
    natyYearEl.textContent = (totalNatyYearVol / 1000).toFixed(1) + " t";
}

// Hook into existing updateStats
function setDayTraining(who) {
  if (!selectedDateKey) return;

  if (who === "clear") {
    trainingHistory[selectedDateKey] = {
      alma: false,
      naty: false,
      deleted: true,
      weights: {},
      completed_sets: {},
      water: {}
    };
    showToast("trash-2", "text-red-400", "¡Registro eliminado!");
  } else {
    trainingHistory[selectedDateKey] = {
      alma: false,
      naty: true,
      deleted: false,
      weights: trainingHistory[selectedDateKey]?.weights || {},
      completed_sets: trainingHistory[selectedDateKey]?.completed_sets || {},
      water: trainingHistory[selectedDateKey]?.water || {}
    };
    showToast("check-circle", "text-emerald-400", "¡Día registrado para Naty!");
  }

  if (typeof updateGamificationUI === "function") {
    updateGamificationUI();
  }
  saveToCloud();
  closeDayModal();
  renderCalendar();
  updateStats();
}

function closeDayModal() {
  const modal = document.getElementById("day-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  selectedDateKey = null;
}

function updateStats() {
  let natyCount = 0;

  // Count for current month only
  Object.keys(trainingHistory || {}).forEach((dateKey) => {
    const [year, month] = dateKey.split("-").map(Number);
    if (year === calendarYear && month === calendarMonth + 1) {
      const h = trainingHistory[dateKey];
      if (h && h.naty && !h.deleted) natyCount++;
    }
  });

  const natyStreak = gamification?.naty?.streak || 0;
  const natyPoints = gamification?.naty?.points || 0;

  const statNaty = document.getElementById("stat-naty");
  const statTotal = document.getElementById("stat-total");
  const statBoth = document.getElementById("stat-both");

  if (statNaty) statNaty.innerHTML = `${natyCount} <span class="text-xs text-slate-500">totales</span>`;
  if (statTotal) statTotal.innerHTML = `${natyStreak} <span class="text-xs text-slate-500">días</span>`;
  if (statBoth) statBoth.innerHTML = `${natyPoints}`;

  renderAdvancedStats();
}

// --- HELPER: Parse rest time from notes ---
function parseRestTime(notes) {
  const match = notes.match(/Descanso:\s*(\d+)(?:-\d+)?\s*(min|seg)/i);
  if (match) {
    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    return unit === "min" ? value * 60 : value;
  }
  return 90; // Default 90 seconds
}

// --- HELPER: Parse reps from string (e.g., "8-10" -> 9, "12" -> 12) ---
function parseReps(repsStr) {
  if (!repsStr) return 10;
  const match = repsStr.match(/(\d+)\s*-\s*(\d+)/);
  if (match) {
    return Math.round((parseInt(match[1]) + parseInt(match[2])) / 2);
  }
  const single = repsStr.match(/(\d+)/);
  if (single) {
    return parseInt(single[1]);
  }
  return 10;
}

// --- SILENT AUDIO & LOCK SCREEN / DYNAMIC ISLAND MEDIA SESSION ---
function createSilentAudioDataUri() {
  const sampleRate = 8000;
  const numChannels = 1;
  const bitsPerSample = 8;
  const durationSec = 10;
  const numSamples = sampleRate * durationSec;
  const dataSize = numSamples * numChannels * (bitsPerSample / 8);
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF header
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + dataSize, true);
  view.setUint32(8, 0x57415645, false); // "WAVE"
  // fmt chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
  view.setUint16(32, numChannels * (bitsPerSample / 8), true);
  view.setUint16(34, bitsPerSample, true);
  // data chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, dataSize, true);
  // 8-bit PCM silence is 128 (0x80)
  for (let i = 0; i < dataSize; i++) {
    view.setUint8(44 + i, 128);
  }
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return "data:audio/wav;base64," + btoa(binary);
}

let bgAudio = new Audio(createSilentAudioDataUri());
bgAudio.loop = true;

// Dynamic Lock Screen & Dynamic Island Artwork Generator
function createTimerArtworkBlob(user, timeStr, exerciseName) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "favicon.svg";

    const isNaty = user === "naty";
    const primaryColor = isNaty ? "#00f0ff" : "#ff0055";
    const userName = isNaty ? "NATY" : "ALMA";

    // Deep Dark Background
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, 512, 512);

    // Neon Frame
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 14;
    ctx.strokeRect(14, 14, 484, 484);

    // Top Header
    ctx.fillStyle = "#64748b";
    ctx.font = "bold 24px monospace";
    ctx.textAlign = "center";
    ctx.fillText("VITAL // DESCANSO", 256, 85);

    // User Tag
    ctx.fillStyle = primaryColor;
    ctx.font = "900 34px monospace";
    ctx.fillText(`${userName}`, 256, 140);

    // Big Time Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 110px monospace";
    ctx.fillText(timeStr, 256, 275);

    // Exercise Name
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 28px sans-serif";
    const shortEx = exerciseName.length > 22 ? exerciseName.substring(0, 20) + "..." : exerciseName;
    ctx.fillText(shortEx, 256, 365);

    // Footer
    ctx.fillStyle = primaryColor;
    ctx.font = "bold 22px monospace";
    ctx.fillText("⏱️ TEMPORIZADOR ACTIVO", 256, 430);

    return canvas.toDataURL("image/png");
  } catch (e) {
    return "favicon.svg";
  }
}

// Native iOS Live Activity Plugin Bridge (Capacitor)
let _liveActivityPluginCache = null;
function getLiveActivityPlugin() {
  if (!window.Capacitor) return null;
  const platform = window.Capacitor.getPlatform ? window.Capacitor.getPlatform() : (window.Capacitor.platform || "");
  if (platform !== "ios") return null; // Live Activity is exclusive to iOS Dynamic Island
  if (_liveActivityPluginCache) return _liveActivityPluginCache;
  if (window.Capacitor.Plugins && window.Capacitor.Plugins.LiveActivity) {
    _liveActivityPluginCache = window.Capacitor.Plugins.LiveActivity;
    return _liveActivityPluginCache;
  }
  if (window.Capacitor.registerPlugin) {
    _liveActivityPluginCache = window.Capacitor.registerPlugin("LiveActivity");
    return _liveActivityPluginCache;
  }
  return null;
}

function enableBackgroundMode(exerciseName, duration, user = "naty") {
  // Background audio keepalive for standard web browsers
  if (window.Capacitor && (window.Capacitor.isNativePlatform ? window.Capacitor.isNativePlatform() : window.Capacitor.platform === "ios")) {
    return;
  }
  bgAudio.play().catch(() => {});
}

function disableBackgroundMode() {
  if (window.Capacitor && (window.Capacitor.isNativePlatform ? window.Capacitor.isNativePlatform() : window.Capacitor.platform === "ios")) {
    return;
  }
  try {
    bgAudio.pause();
    bgAudio.currentTime = 0;
  } catch (e) {}
}

// --- CHARTS LOGIC ---
function renderCharts() {
  const container = document.getElementById("charts-container");
  if (!container) return;
  container.innerHTML = "";

  ["naty"].forEach((user) => {
    const dataPoints = getVolumeHistory(user, 14); // Last 14 days
    const chartHTML = generateSVGLineChart(
      dataPoints,
      "var(--accent-naty)",
      user,
    );

    const card = document.createElement("div");
    card.className = "bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all duration-300";
    card.innerHTML = `
        <h3 class="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-cyan-400">
            <i data-lucide="trending-up" class="w-4 h-4 text-cyan-400"></i>
            Volumen de Naty
            <span class="text-xs text-slate-500 font-normal normal-case tracking-normal">(Últimos 14 días)</span>
        </h3>
        ${chartHTML}
      `;
    container.appendChild(card);
  });
  safeCreateIcons();
}

function getVolumeHistory(user, days) {
  const history = [];
  const date = new Date();
  // Go back 'days' amount
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(date.getDate() - i);
    const key = getDateKey(d);

    // Legacy Key Support (toDateString)
    // Some data might be saved as "Mon Jan 22 2026"
    const legacyKey = d.toDateString();

    // Calculate volume for that day
    let vol = 0;

    // Check both keys
    const record = trainingHistory[key] || trainingHistory[legacyKey];

    if (record && record.weights) {
      // Iterate all keys in weights
      Object.entries(record.weights).forEach(([wKey, pair]) => {
        if (wKey.endsWith("_ts")) return; // Skip timestamp keys
        if (pair[user]) vol += (parseInt(pair[user]) || 0) * 10;
      });
    }
    // Expected format for new SVG chart: { date: "YYYY-MM-DD", value: 123 }
    history.push({ date: key, value: vol });
  }
  return history;
}

function generateSVGLineChart(data, color, user) {
  const width = 600;
  const height = 250; // Increased height for labels
  const padding = 40; // Increased padding for axis text

  if (data.every((d) => d.value === 0)) {
    return `<div class="h-64 flex flex-col items-center justify-center text-slate-500 gap-2 border-2 border-dashed border-slate-800 bg-slate-900/10">
                <i data-lucide="bar-chart-2" class="w-8 h-8 opacity-30 text-slate-600"></i>
                <span class="text-xs font-bold uppercase tracking-wider font-mono text-slate-600">Sin datos recientes</span>
            </div>`;
  }

  const maxValue = Math.max(...data.map((d) => d.value)) || 100;
  const roundedMax = Math.ceil(maxValue / 100) * 100; // Round up to nearest 100 for cleaner scale

  // Helper to map Value to Y
  const getY = (val) =>
    height - padding - (val / roundedMax) * (height - padding * 2);

  // Helper to map Index to X
  const getX = (i) => padding + (i / (data.length - 1)) * (width - padding * 2);

  // Grid Lines & Labels (0, 50%, 100%)
  const gridLines = [0, roundedMax / 2, roundedMax]
    .map((val) => {
      const y = getY(val);
      return `
      <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="2,2" />
      <text x="${padding - 10}" y="${y + 4}" fill="#475569" font-size="9" font-weight="900" font-family="'JetBrains Mono', monospace" text-anchor="end">${Math.round(val)}</text>
    `;
    })
    .join("");

  // X Axis Labels (Show approx 5 dates)
  const xLabels = data
    .map((d, i) => {
      // Show label only for specific indices to avoid clutter
      if (i % 3 === 0 || i === data.length - 1) {
        const dateStr = d.date.split("-").slice(1).join("/"); // MM/DD
        const x = getX(i);
        return `<text x="${x}" y="${height - 10}" fill="#475569" font-size="9" font-weight="900" font-family="'JetBrains Mono', monospace" text-anchor="middle">${dateStr}</text>`;
      }
      return "";
    })
    .join("");

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" ");

  // Gradient area below the line
  const areaPoints = `${getX(0)},${getY(0)} ${points} ${getX(data.length - 1)},${getY(0)}`;
  const gradientId = `grad-${user}`;
  const filterId = `line-glow-${user}`;

  return `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto font-mono" style="overflow: visible;">
         <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" style="stop-color:${color};stop-opacity:0.25" />
               <stop offset="100%" style="stop-color:${color};stop-opacity:0" />
            </linearGradient>
            
            <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="5" result="blur" />
               <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
               </feMerge>
            </filter>
         </defs>

         <!-- Grid & Axis Labels -->
         ${gridLines}
         ${xLabels}
         
         <!-- Axis Lines -->
         <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#334155" stroke-width="2" />
         <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#334155" stroke-width="2" />
         
         <!-- Area Fill -->
         <polygon points="${areaPoints}" fill="url(#${gradientId})" stroke="none" />

         <!-- Path -->
         <polyline fill="none" stroke="${color}" stroke-width="3" points="${points}" 
                   stroke-linecap="round" stroke-linejoin="round"
                   filter="url(#${filterId})"
                   class="animate-draw-line" />
                   
         <!-- Interactive Points -->
         ${data
           .map((d, i) => {
             const x = getX(i);
             const y = getY(d.value);
             return `
               <g class="group cursor-pointer">
                 <!-- Outer pulsing hover ring -->
                 <circle cx="${x}" cy="${y}" r="8" fill="${color}" opacity="0"
                         class="group-hover:opacity-20 group-hover:scale-125 transition-all duration-200"
                         style="transform-box: fill-box; transform-origin: center;" />
                 <circle cx="${x}" cy="${y}" r="4" fill="${color}" stroke="#090d16" stroke-width="2" 
                         class="group-hover:scale-110 transition-transform" 
                         style="transform-box: fill-box; transform-origin: center;" />
                 <!-- Tooltip (Simulated via title) -->
                 <title>${d.date}: ${d.value} kg</title>
               </g>
             `;
           })
           .join("")}
      </svg>
    `;
}

// --- TIMER FUNCTIONS ---
let wakeLock = null;
let lastNotificationSeconds = null;

async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      wakeLock = await navigator.wakeLock.request("screen");
      console.log("Wake Lock active");
    }
  } catch (err) {
    console.error(`Wake Lock error: ${err.name}, ${err.message}`);
  }
}

async function releaseWakeLock() {
  if (wakeLock !== null) {
    await wakeLock.release();
    wakeLock = null;
    console.log("Wake Lock released");
  }
}

function updateBodyScrollLock() {
  const needsLock = !!(
    activeFullModalUser &&
    timerState[activeFullModalUser] &&
    timerState[activeFullModalUser].active &&
    !timerState[activeFullModalUser].minimized
  );

  const appContent = document.getElementById("app-content");
  if (needsLock) {
    if (appContent) appContent.style.overflow = "hidden";
  } else {
    if (appContent) appContent.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.touchAction = "";
  }
}

function showTimer(user, exerciseName, seconds, options = {}) {
  const isStopwatch = options.isStopwatch || false;
  
  // 1. Set State for this user
  timerState[user] = {
    endTime: isStopwatch ? null : Date.now() + seconds * 1000,
    startTime: isStopwatch ? (options.startTime || Date.now()) : null,
    totalSeconds: seconds,
    currentSeconds: isStopwatch ? 0 : seconds,
    exerciseName: exerciseName,
    minimized: false,
    active: true,
    isStopwatch: isStopwatch
  };

  // 2. Logic to determine display
  // If another user is already Full Screen, minimize them?
  // OR just force this new one to be Full Screen and minimize the other.
  // We'll force this one to Full Screen.

  if (activeFullModalUser && activeFullModalUser !== user) {
    // Minimize the currently active user
    timerState[activeFullModalUser].minimized = true;
  }

  activeFullModalUser = user;
  timerState[user].minimized = false;

  // Manage Scroll Lock
  updateBodyScrollLock();

  // 3. Render and Start
  renderTimerUI();
  startGlobalTimerIfNeeded();

  // Audio & Lock
  requestWakeLock();
  enableBackgroundMode(exerciseName, seconds, user);

  // Native Live Activity for Dynamic Island (Capacitor iOS only)
  const LiveActivity = getLiveActivityPlugin();
  if (LiveActivity) {
    LiveActivity.startRestTimer({
      exerciseName: exerciseName,
      userName: user === "naty" ? "Naty" : (user === "session" ? "Session" : "Alma"),
      seconds: seconds,
      isStopwatch: isStopwatch,
      startTime: timerState[user].startTime ? timerState[user].startTime : -1
    }).then(result => {
      if (!result || !result.success) {
        console.warn("[LA] startRestTimer info: ", result?.message || "unknown");
      }
    }).catch(e => {
      console.warn("[LA] LiveActivity startRestTimer skipped: ", e);
    });
  }
}

function startGlobalTimerIfNeeded() {
  if (globalTimerInterval) return;

  globalTimerInterval = setInterval(() => {
    const now = Date.now();
    let anyoneActive = false;

    ["naty", "alma", "session"].forEach((user) => {
      const state = timerState[user];
      if (!state || !state.active) return;
      anyoneActive = true;

      if (state.isStopwatch) {
          const diff = now - state.startTime;
          state.currentSeconds = Math.floor(diff / 1000);
          state.totalSeconds = state.currentSeconds; // Update total for progress bars (though hidden)
      } else {
          const diff = state.endTime - now;
          state.currentSeconds = Math.ceil(diff / 1000);

          if (state.currentSeconds <= 0) {
            state.currentSeconds = 0;
            // Timer Finished Logic
            handleTimerComplete(user);
          }
      }
    });

    if (!anyoneActive) {
      clearInterval(globalTimerInterval);
      globalTimerInterval = null;
      document.title = "VITAL // GYM";
      releaseWakeLock();
      disableBackgroundMode();
    } else {
      updateTimerDisplay();

      const mainUser = activeFullModalUser || (timerState.naty.active ? "naty" : (timerState.alma.active ? "alma" : "session"));
      const state = timerState[mainUser];

      if (state && state.active) {
        const displaySecs = Math.max(0, state.currentSeconds);
        const hrs = Math.floor(displaySecs / 3600);
        const mins = Math.floor((displaySecs % 3600) / 60);
        const secs = displaySecs % 60;
        
        let timeStr = "";
        if (hrs > 0) {
            timeStr = `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        } else {
            timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;
        }
        
        const userName = mainUser === "naty" ? "Naty" : (mainUser === "session" ? "Session" : "Alma");

        // Update document tab title
        document.title = `⏱️ ${timeStr} | ${state.exerciseName} - VITAL`;

        // Update Lock Screen & Dynamic Island Media Player
        if ("mediaSession" in navigator && state.lastMediaUpdate !== displaySecs) {
          state.lastMediaUpdate = displaySecs;
          try {
            navigator.mediaSession.metadata.title = `⏱️ ${timeStr} - ${state.exerciseName} (${userName})`;
            navigator.mediaSession.metadata.artist = `Descanso: ${timeStr} restantes // VITAL`;
            navigator.mediaSession.setPositionState({
              duration: state.totalSeconds,
              playbackRate: 1,
              position: Math.max(0, state.totalSeconds - displaySecs),
            });
          } catch (e) {}
        }
      }
    }
  }, 200);
}

function handleTimerComplete(user) {
  try {
    const state = timerState[user];
  state.active = false;

  // Sound
  playTimerEnd();

  // End Native iOS Live Activity
  const LiveActivity = getLiveActivityPlugin();
  if (LiveActivity) {
    LiveActivity.endRestTimer({ userName: user === "naty" ? "Naty" : "Alma" }).catch(() => {});
  }

  document.title = `¡TIEMPO! - ${state.exerciseName} (${user === "naty" ? "Naty" : "Alma"})`;

  // Notifications
  if ("Notification" in window && Notification.permission === "granted") {
    const title = "¡Tiempo Terminado!";
    const options = {
      body: `Descanso finalizado para ${state.exerciseName} (${user === "naty" ? "Naty" : "Alma"})`,
      icon: "favicon.svg",
      vibrate: [200, 100, 200, 100, 200],
      tag: `timer-end-${user}`,
      renotify: true,
    };

    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) =>
        reg.showNotification(title, options),
      );
    } else {
      new Notification(title, options);
    }
  }

  // Auto-hide UI after delay
  setTimeout(() => {
    hideTimer(user);
  }, 1500);

  // Force UI update immediately to show 0:00
  renderTimerUI();
  } catch(err) {
    alert("CRITICAL ERROR in handleTimerComplete: " + err.message);
  }
}

function handleNotifications() {
  // Simple logic: If in backgound, update notification for the user with LEAST time remaining?
  // Or just update the one that is Full Screen (most relevant).
  if (
    document.visibilityState === "hidden" &&
    "Notification" in window && Notification.permission === "granted"
  ) {
    // Find the most urgent timer
    let urgentUser = null;
    let minTime = Infinity;

    ["naty", "alma"].forEach((user) => {
      if (
        timerState[user].active &&
        timerState[user].currentSeconds < minTime
      ) {
        minTime = timerState[user].currentSeconds;
        urgentUser = user;
      }
    });

    if (urgentUser) {
      const state = timerState[urgentUser];
      if (state.currentSeconds !== lastNotificationSeconds) {
        lastNotificationSeconds = state.currentSeconds;
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((reg) => {
            const mins = Math.floor(state.currentSeconds / 60);
            const secs = state.currentSeconds % 60;
            reg.showNotification(
              `Descansando (${urgentUser === "naty" ? "Naty" : "Alma"}): ${mins}:${secs.toString().padStart(2, "0")}`,
              {
                body: state.exerciseName,
                icon: "favicon.svg",
                tag: "timer-progress",
                silent: true,
                renotify: false,
                visibility: "public",
              },
            );
          });
        }
      }
    }
  }
}

function renderTimerUI() {
  const modal = document.getElementById("timer-modal");
  const fullContainer = document.getElementById("timer-full");
  const miniContainer = document.getElementById("mini-timers-container");
  const bgFlash = document.getElementById("timer-bg-flash");

  // Clear Mini Container
  if (miniContainer) {
    miniContainer.innerHTML = "";
  }

  // Check if anyone is active
  const anyActive = timerState.naty.active || timerState.alma.active || (timerState.session && timerState.session.active);

  if (!anyActive) {
    if (modal) {
      modal.classList.add("hidden", "pointer-events-none");
      modal.classList.remove("flex", "pointer-events-auto", "bg-black/80", "backdrop-blur-sm");
    }
    if (bgFlash) {
      bgFlash.classList.add("pointer-events-none");
      bgFlash.classList.remove("pointer-events-auto");
    }
    updateBodyScrollLock();
    return;
  }

  // Render Bubbles (for anyone minimized or NOT the active full screen)
  ["naty", "alma", "session"].forEach((user) => {
    const state = timerState[user];
    if (state.active && (state.minimized || user !== activeFullModalUser)) {
      const bubble = createMiniTimerBubble(user, state);
      if (miniContainer) miniContainer.appendChild(bubble);
    }
  });

  // Render Full Modal?
  const isFullScreen = !!(
    activeFullModalUser &&
    timerState[activeFullModalUser] &&
    timerState[activeFullModalUser].active &&
    !timerState[activeFullModalUser].minimized
  );

  if (isFullScreen) {
    // Show Full Modal Overlay
    if (modal) {
      modal.classList.remove("hidden", "pointer-events-none");
      modal.classList.add("flex", "pointer-events-auto", "bg-black/80", "backdrop-blur-sm");
    }
    if (fullContainer) {
      fullContainer.classList.remove("hidden");
    }
    if (bgFlash) {
      bgFlash.classList.remove("pointer-events-none");
      bgFlash.classList.add("pointer-events-auto");
    }

    const user = activeFullModalUser;
    const state = timerState[user];
    const exerciseNameElem = document.getElementById("timer-exercise-name");
    if (exerciseNameElem) {
      exerciseNameElem.textContent =
        `${state.exerciseName} (${user === "naty" ? "Naty" : (user === "session" ? "Session" : "Alma")})`;
    }
  } else {
    // Completely hide full modal wrapper so user can interact with 100% of the app
    if (modal) {
      modal.classList.add("hidden", "pointer-events-none");
      modal.classList.remove("flex", "pointer-events-auto", "bg-black/80", "backdrop-blur-sm");
    }
    if (fullContainer) {
      fullContainer.classList.add("hidden");
    }
    if (bgFlash) {
      bgFlash.classList.add("pointer-events-none");
      bgFlash.classList.remove("pointer-events-auto");
    }
  }

  updateBodyScrollLock();
  safeCreateIcons();
}

function createMiniTimerBubble(user, state) {
  const div = document.createElement("div");
  const textColor = user === "naty" ? "text-sky-400" : "text-pink-400";
  const ringColor = user === "naty" ? "text-sky-500" : "text-pink-500";

  // Vital Aesthetic for minimized bubble: theme-aware bg, border, rounded-[24px]
  div.className = `bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-[24px] p-3 pr-5 shadow-2xl cursor-pointer hover:scale-105 transition-all duration-200 pointer-events-auto flex items-center gap-3`;
  div.onclick = () => expandTimer(user);

  const hrs = Math.floor(state.currentSeconds / 3600);
  const mins = Math.floor((state.currentSeconds % 3600) / 60);
  const secs = state.currentSeconds % 60;
  let timeStr = "";
  if (hrs > 0) {
      timeStr = `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else {
      timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  div.innerHTML = `
        <div class="relative w-11 h-11 flex-shrink-0">
             <svg class="w-11 h-11 transform -rotate-90 drop-shadow-md ${state.isStopwatch ? 'hidden' : ''}">
                <circle cx="22" cy="22" r="18" stroke="currentColor" stroke-width="4" fill="none" class="text-[var(--border-strong)] opacity-40" />
                <circle id="mini-ring-${user}" cx="22" cy="22" r="18" stroke="currentColor" stroke-width="4"
                    fill="none" stroke-linecap="round" stroke-dasharray="113.1" stroke-dashoffset="0"
                    class="${ringColor} transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_rgba(currentColor,0.5)]" />
            </svg>
             <div class="absolute inset-0 flex items-center justify-center">
                 ${state.isStopwatch ? `<i data-lucide="timer" class="w-5 h-5 text-emerald-500"></i>` : `<span class="text-[12px] font-black uppercase text-[var(--text-main)]">${user === "naty" ? "N" : "A"}</span>`}
             </div>
        </div>
        <div class="text-left flex flex-col justify-center">
            <div id="mini-display-${user}" class="text-2xl font-mono font-black text-[var(--text-main)] tabular-nums leading-none tracking-tight">${timeStr}</div>
            <p class="text-[10px] text-[var(--text-dim)] max-w-[100px] truncate font-bold uppercase mt-1">${state.exerciseName}</p>
        </div>
    `;
  return div;
}
function updateTimerDisplay() {
  if (
    activeFullModalUser &&
    timerState[activeFullModalUser] &&
    timerState[activeFullModalUser].active &&
    !timerState[activeFullModalUser].minimized
  ) {
    const user = activeFullModalUser;
    const state = timerState[user];

    const display = document.getElementById("timer-display");
    const ring = document.getElementById("timer-ring");
    const secondsLeft = document.getElementById("timer-seconds-left");

    const displaySeconds = Math.max(0, state.currentSeconds);
    const hrs = Math.floor(displaySeconds / 3600);
    const mins = Math.floor((displaySeconds % 3600) / 60);
    const secs = displaySeconds % 60;
    
    let timeStr = "";
    if (hrs > 0) {
        timeStr = `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    } else {
        timeStr = `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    if (display && display.textContent !== timeStr) {
      display.textContent = timeStr;
      if (secondsLeft) secondsLeft.textContent = displaySeconds;

      if (!state.isStopwatch && ring && state.totalSeconds > 0) {
          const circumference = 502.65;
          const progress = Math.max(0, displaySeconds / state.totalSeconds);
          ring.style.strokeDashoffset = circumference * (1 - progress);
      }
    }

    // Low time warning colors (< 10s)
    const isWarning = displaySeconds <= 10 && displaySeconds > 0 && !state.isStopwatch;
    if (ring) {
      if (isWarning) {
        ring.style.stroke = "#f43f5e";
        if (display) display.className = "text-5xl font-mono font-black text-rose-400 tabular-nums tracking-tight animate-pulse";
      } else {
        ring.style.stroke = "#8b5cf6";
        if (display) display.className = "text-5xl font-mono font-black text-white tabular-nums tracking-tight";
      }
    }
  }

  // Update Minis
  ["naty", "alma", "session"].forEach((user) => {
    const displayMini = document.getElementById(`mini-display-${user}`);
    const ringMini = document.getElementById(`mini-ring-${user}`);
    const container = displayMini?.closest("div.bg-slate-900"); // Get the bubble container

    if (displayMini && ringMini && timerState[user].active) {
      const state = timerState[user];
      const displaySeconds = Math.max(0, state.currentSeconds);
      const mins = Math.floor(displaySeconds / 60);
      const secs = displaySeconds % 60;
      displayMini.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;

      const progress = Math.max(0, displaySeconds / state.totalSeconds);
      const circumference = 100.53;
      ringMini.style.strokeDashoffset = circumference * (1 - progress);

      // Color logic for mini
      if (displaySeconds <= 10) {
        ringMini.style.stroke = "#ef4444";
        displayMini.classList.remove("text-blue-400", "text-pink-400");
        displayMini.classList.add("text-red-400");
        if (container) {
          container.classList.add("border-red-500", "shadow-red-500/30");
          container.classList.remove(
            "border-blue-500",
            "shadow-blue-500/30",
            "border-pink-500",
            "shadow-pink-500/30",
          );
        }
      } else {
        // Restore default colors
        let defaultColor = "blue";
        let strokeColor = "#60a5fa";
        if (user === "alma") {
            defaultColor = "pink";
            strokeColor = "#f472b6";
        } else if (user === "session") {
            defaultColor = "green";
            strokeColor = "#4ade80";
        }
        ringMini.style.stroke = strokeColor;
        // Re-add correct text color
        displayMini.classList.remove("text-red-400");
        displayMini.classList.add(`text-${defaultColor}-400`);

        if (container) {
          container.classList.remove("border-red-500", "shadow-red-500/30");
          container.classList.add(
            `border-${defaultColor}-500`,
            `shadow-${defaultColor}-500/30`,
          );
        }
      }
    }
  });
}

function hideTimer(user) {
  const LiveActivity = getLiveActivityPlugin();
  if (LiveActivity) {
    LiveActivity.endRestTimer({ userName: user === "naty" ? "Naty" : (user === "session" ? "Session" : "Alma"), dismissImmediately: true }).catch(e => console.warn("[LA] endRestTimer: ", e));
  }

  if (user) {
    // Hide specific user
    timerState[user].active = false;

    // Logic: If the user being hidden was the Active Full Screen one...
    if (activeFullModalUser === user) {
      // If there are other active users, we could expand one.
      // For simplicity, we just clear the full screen if the active one is hidden.
      const others = ["naty", "alma", "session"].filter(u => u !== user);
      const nextUser = others.find(u => timerState[u].active && !timerState[u].minimized);

      if (nextUser) {
        expandTimer(nextUser);
      } else {
        // Others are minimized or inactive
        // We do NOT expand them automatically. We just clear the full screen slot.
        activeFullModalUser = null;
      }
    }
  } else {
    // Force Hide ALL (e.g. skip button if we want it to close current)
    if (activeFullModalUser) {
      hideTimer(activeFullModalUser);
      return;
    }
  }

  // Manage Scroll Lock
  updateBodyScrollLock();

  renderTimerUI();
}

// --- TIMER MINIMIZE/EXPAND FUNCTIONS ---
function minimizeTimer() {
  if (activeFullModalUser) {
    timerState[activeFullModalUser].minimized = true;
    updateBodyScrollLock();
    renderTimerUI();
  }
}

function expandTimer(user) {
  if (timerState[user].active) {
    activeFullModalUser = user;
    timerState[user].minimized = false;
    updateBodyScrollLock();
    renderTimerUI();
  }
}

// --- CUSTOM MODAL FUNCTIONS ---
let confirmCallback = null;

function showConfirmModal(title, message, callback) {
  const modal = document.getElementById("confirm-modal");
  document.getElementById("confirm-title").textContent = title;
  document.getElementById("confirm-message").textContent = message;

  confirmCallback = callback;

  modal.classList.remove("hidden");
  // Small timeout for animation
  setTimeout(() => {
    modal.classList.remove("opacity-0", "scale-95");
    modal.classList.add("opacity-100", "scale-100");
  }, 10);
}

function hideConfirmModal() {
  const modal = document.getElementById("confirm-modal");
  modal.classList.add("opacity-0", "scale-95");
  modal.classList.remove("opacity-100", "scale-100");

  setTimeout(() => {
    modal.classList.add("hidden");
    confirmCallback = null;
  }, 300);
}

// --- AUDIO UNLOCKER ---
let audioCtx = null;

function unlockAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Attach unlock to all interactive elements if possible, or just global click once
document.addEventListener("click", unlockAudio, { once: true });
document.addEventListener("touchstart", unlockAudio, { once: true });

function playTimerEnd() {
  // Vibrate if supported
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }
  // Play beep sound
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = 880;
    oscillator.type = "sine";
    gainNode.gain.value = 0.5; // Slightly louder
    oscillator.start();
    setTimeout(() => oscillator.stop(), 500); // Longer beep
  } catch (e) {
    console.error("Audio play error", e);
  }
}

// Timer event listeners
// Timer event listeners
document
  .getElementById("confirm-cancel-btn")
  .addEventListener("click", hideConfirmModal);
document.getElementById("confirm-ok-btn").addEventListener("click", () => {
  if (confirmCallback) confirmCallback();
  hideConfirmModal();
});
document
  .getElementById("timer-skip-btn")
  .addEventListener("click", () => hideTimer(activeFullModalUser));
document.getElementById("timer-add-btn").addEventListener("click", () => {
  if (activeFullModalUser && timerState[activeFullModalUser].active) {
    const user = activeFullModalUser;
    const state = timerState[user];

    state.endTime += 30000; // Add 30 seconds
    state.totalSeconds += 30;

    // Force immediate update
    const diff = state.endTime - Date.now();
    state.currentSeconds = Math.ceil(diff / 1000);
    updateTimerDisplay();
  }
});

// Timer minimize/expand event listeners
document
  .getElementById("timer-minimize-btn")
  .addEventListener("click", minimizeTimer);

// --- GAMIFICATION V2 (LOGROS) ---
const achievementsConfig = [
  // --- TIER 1: COMÚN (Fácil / Inicio) ---
  {
    id: "first_workout",
    title: "Primer Paso",
    icon: "footprints",
    desc: "Completa tu primer entrenamiento",
    tier: "Común",
    condition: (u) => gamification[u].points > 0,
  },
  {
    id: "hydrated",
    title: "Hidratado",
    icon: "droplets",
    desc: "Alcanza tu meta diaria de agua",
    tier: "Común",
    condition: (u) => waterState[u] >= (waterState[u + "Goal"] || 2000),
  },
  {
    id: "streak_3",
    title: "Constancia",
    icon: "flame",
    desc: "Racha de 3 días",
    tier: "Común",
    condition: (u) => calculateUserStreak(u) >= 3,
  },
  {
    id: "active_5",
    title: "Iniciado",
    icon: "play",
    desc: "Completa 5 entrenamientos",
    tier: "Común",
    condition: (u) => getTotalWorkouts(u) >= 5,
  },
  {
    id: "active_10",
    title: "Aprendiz",
    icon: "activity",
    desc: "Completa 10 entrenamientos",
    tier: "Común",
    condition: (u) => getTotalWorkouts(u) >= 10,
  },
  {
    id: "duo_workout",
    title: "Compañeros",
    icon: "users",
    desc: "Entrena con tu pareja por primera vez",
    tier: "Común",
    condition: (u) => getDuoWorkouts() >= 1,
  },
  {
    id: "hydrated_3_days",
    title: "Agua x3",
    icon: "droplet",
    desc: "Cumple meta de agua 3 días seguidos",
    tier: "Común",
    condition: (u) => getHydrationStreak(u) >= 3,
  },
  {
    id: "first_points_50",
    title: "Primeros Puntos",
    icon: "coins",
    desc: "Acumula 50 puntos",
    tier: "Común",
    condition: (u) => gamification[u].points >= 50,
  },
  // --- NEW COMMON ACHIEVEMENTS ---
  {
    id: "streak_2",
    title: "El Dúo",
    icon: "flame",
    desc: "Racha de 2 días seguidos",
    tier: "Común",
    condition: (u) => calculateUserStreak(u) >= 2,
  },
  {
    id: "points_100",
    title: "Centenario",
    icon: "piggy-bank",
    desc: "Acumula 100 puntos",
    tier: "Común",
    condition: (u) => gamification[u].points >= 100,
  },
  {
    id: "active_2",
    title: "Calentando",
    icon: "play",
    desc: "Completa 2 entrenamientos",
    tier: "Común",
    condition: (u) => getTotalWorkouts(u) >= 2,
  },
  {
    id: "active_8",
    title: "En Marcha",
    icon: "fast-forward",
    desc: "Completa 8 entrenamientos",
    tier: "Común",
    condition: (u) => getTotalWorkouts(u) >= 8,
  },
  {
    id: "duo_3",
    title: "Trio Dinámico",
    icon: "users",
    desc: "Entrena 3 veces con tu pareja",
    tier: "Común",
    condition: (u) => getDuoWorkouts() >= 3,
  },
  {
    id: "duo_5",
    title: "Equipo",
    icon: "users",
    desc: "Entrena 5 veces con tu pareja",
    tier: "Común",
    condition: (u) => getDuoWorkouts() >= 5,
  },
  {
    id: "volume_1k",
    title: "Kilo a Kilo",
    icon: "dumbbell",
    desc: "Levanta 1,000kg en total (histórico)",
    tier: "Común",
    condition: (u) => getTotalLiftedVolume(u) >= 1000,
  },
  {
    id: "volume_3k",
    title: "Tres Mil",
    icon: "dumbbell",
    desc: "Levanta 3,000kg en total (histórico)",
    tier: "Común",
    condition: (u) => getTotalLiftedVolume(u) >= 3000,
  },
  {
    id: "volume_day_1k",
    title: "Tonelada Diaria",
    icon: "weight",
    desc: "Levanta 1,000kg en un solo día",
    tier: "Común",
    condition: (u) => getDailyVolume(u) >= 1000,
  },
  {
    id: "volume_day_2k",
    title: "Fuerza Diaria",
    icon: "weight",
    desc: "Levanta 2,000kg en un solo día",
    tier: "Común",
    condition: (u) => getDailyVolume(u) >= 2000,
  },
  {
    id: "monday_motivation",
    title: "Odio los Lunes",
    icon: "calendar-check",
    desc: "Entrena un Lunes",
    tier: "Común",
    condition: (u) =>
      new Date().getDay() === 1 &&
      trainingHistory[getDateKey(new Date())] &&
      trainingHistory[getDateKey(new Date())][u],
  },
  {
    id: "hump_day",
    title: "Ombligo",
    icon: "calendar",
    desc: "Entrena un Miércoles",
    tier: "Común",
    condition: (u) =>
      new Date().getDay() === 3 &&
      trainingHistory[getDateKey(new Date())] &&
      trainingHistory[getDateKey(new Date())][u],
  },
  {
    id: "weekend_warrior_easy",
    title: "Finde Activo",
    icon: "sun",
    desc: "Entrena un Sábado o Domingo",
    tier: "Común",
    condition: (u) =>
      (new Date().getDay() === 6 || new Date().getDay() === 0) &&
      trainingHistory[getDateKey(new Date())] &&
      trainingHistory[getDateKey(new Date())][u],
  },
  {
    id: "early_bird_easy",
    title: "Mañanero",
    icon: "sunrise",
    desc: "Entrena antes de las 11 AM",
    tier: "Común",
    condition: (u) =>
      new Date().getHours() < 11 &&
      trainingHistory[getDateKey(new Date())] &&
      trainingHistory[getDateKey(new Date())][u],
  },
  {
    id: "night_owl",
    title: "Búho",
    icon: "moon",
    desc: "Entrena después de las 20:00",
    tier: "Común",
    condition: (u) =>
      new Date().getHours() >= 20 &&
      trainingHistory[getDateKey(new Date())] &&
      trainingHistory[getDateKey(new Date())][u],
  },
  {
    id: "water_500",
    title: "Sediento",
    icon: "glass-water",
    desc: "Registra 500ml de agua",
    tier: "Común",
    condition: (u) => (waterState[u] || 0) >= 500,
  },
  {
    id: "water_1000",
    title: "Litro",
    icon: "glass-water",
    desc: "Registra 1 Litro de agua",
    tier: "Común",
    condition: (u) => (waterState[u] || 0) >= 1000,
  },
  {
    id: "water_streak_2",
    title: "Hidratado x2",
    icon: "droplet",
    desc: "Meta de agua 2 días seguidos",
    tier: "Común",
    condition: (u) => getHydrationStreak(u) >= 2,
  },
  {
    id: "first_freeze",
    title: "Protegido",
    icon: "shield",
    desc: "Ten al menos 1 protector de racha",
    tier: "Común",
    condition: (u) => gamification[u].freezes >= 1,
  },
  {
    id: "perfect_week_start",
    title: "Buen Inicio",
    icon: "calendar-check-2",
    desc: "Completa el Lunes y Martes seguidos",
    tier: "Común",
    condition: (u) => {
      const today = new Date();
      const yest = new Date();
      yest.setDate(today.getDate() - 1);
      const k1 = getDateKey(today);
      const k2 = getDateKey(yest);
      return (
        today.getDay() === 2 &&
        trainingHistory[k1] &&
        trainingHistory[k1][u] &&
        trainingHistory[k2] &&
        trainingHistory[k2][u]
      );
    },
  },

  // --- TIER 2: RARO (Intermedio) ---
  {
    id: "streak_7",
    title: "Imparable",
    icon: "zap",
    desc: "Racha de 7 días",
    tier: "Raro",
    condition: (u) => calculateUserStreak(u) >= 7,
  },
  {
    id: "streak_14",
    title: "Quincena",
    icon: "calendar",
    desc: "Racha de 14 días",
    tier: "Raro",
    condition: (u) => calculateUserStreak(u) >= 14,
  },
  {
    id: "volume_10k",
    title: "Levantador",
    icon: "dumbbell",
    desc: "Levanta 10,000kg en total",
    tier: "Raro",
    condition: (u) => getTotalLiftedVolume(u) >= 10000,
  },
  {
    id: "volume_25k",
    title: "Máquina",
    icon: "cog",
    desc: "Levanta 25,000kg en total",
    tier: "Raro",
    condition: (u) => getTotalLiftedVolume(u) >= 25000,
  },
  {
    id: "weekend_warrior",
    title: "Finde Warrior",
    icon: "calendar-check",
    desc: "Entrena un Sábado o Domingo",
    tier: "Raro",
    condition: (u) => {
      const d = new Date().getDay();
      return (
        (d === 0 || d === 6) &&
        trainingHistory[getDateKey(new Date())] &&
        trainingHistory[getDateKey(new Date())][u]
      );
    },
  },
  {
    id: "active_25",
    title: "Regular",
    icon: "repeat",
    desc: "Completa 25 entrenamientos",
    tier: "Raro",
    condition: (u) => getTotalWorkouts(u) >= 25,
  },
  {
    id: "active_50",
    title: "Veterano",
    icon: "medal",
    desc: "Completa 50 entrenamientos",
    tier: "Raro",
    condition: (u) => getTotalWorkouts(u) >= 50,
  },
  {
    id: "early_bird",
    title: "Madrugador",
    icon: "sunrise",
    desc: "Entrena antes de las 9 AM",
    tier: "Raro",
    condition: (u) => {
      const h = new Date().getHours();
      return (
        h < 9 &&
        trainingHistory[getDateKey(new Date())] &&
        trainingHistory[getDateKey(new Date())][u]
      );
    },
  },
  {
    id: "night_owl",
    title: "Noctámbulo",
    icon: "moon",
    desc: "Entrena después de las 9 PM",
    tier: "Raro",
    condition: (u) => {
      const h = new Date().getHours();
      return (
        h >= 21 &&
        trainingHistory[getDateKey(new Date())] &&
        trainingHistory[getDateKey(new Date())][u]
      );
    },
  },
  {
    id: "duo_10",
    title: "Dúo Dinámico",
    icon: "heart-handshake",
    desc: "Entrena 10 veces con tu pareja",
    tier: "Raro",
    condition: (u) => getDuoWorkouts() >= 10,
  },
  {
    id: "hydrated_7_days",
    title: "Fuente Natural",
    icon: "glass-water",
    desc: "Cumple meta de agua 7 días seguidos",
    tier: "Raro",
    condition: (u) => getHydrationStreak(u) >= 7,
  },
  {
    id: "volume_single_day_5k",
    title: "Día Pesado",
    icon: "arrow-up-circle",
    desc: "Levanta 5,000kg en un solo día",
    tier: "Raro",
    condition: (u) => getDailyVolume(u) >= 5000,
  },
  {
    id: "points_200",
    title: "Coleccionista",
    icon: "piggy-bank",
    desc: "Acumula 200 puntos",
    tier: "Raro",
    condition: (u) => gamification[u].points >= 200,
  },

  // --- NEW RARE ACHIEVEMENTS ---
  {
    id: "streak_10",
    title: "Decatleta",
    icon: "medal",
    desc: "Racha de 10 días seguidos",
    tier: "Raro",
    condition: (u) => calculateUserStreak(u) >= 10,
  },
  {
    id: "active_15",
    title: "Iniciado Pro",
    icon: "star",
    desc: "Completa 15 entrenamientos",
    tier: "Raro",
    condition: (u) => getTotalWorkouts(u) >= 15,
  },
  {
    id: "active_30",
    title: "Hábito Mensual",
    icon: "calendar-days",
    desc: "Completa 30 entrenamientos",
    tier: "Raro",
    condition: (u) => getTotalWorkouts(u) >= 30,
  },
  {
    id: "duo_15",
    title: "Pareja Fitness",
    icon: "heart-handshake",
    desc: "Entrena 15 veces con tu pareja",
    tier: "Raro",
    condition: (u) => getDuoWorkouts() >= 15,
  },
  {
    id: "volume_15k",
    title: "Peso Medio",
    icon: "dumbbell",
    desc: "Levanta 15,000kg en total",
    tier: "Raro",
    condition: (u) => getTotalLiftedVolume(u) >= 15000,
  },
  {
    id: "volume_day_3k",
    title: "Día de Furia",
    icon: "biceps-flexed",
    desc: "Levanta 3,000kg en un solo día",
    tier: "Raro",
    condition: (u) => getDailyVolume(u) >= 3000,
  },
  {
    id: "points_300",
    title: "Ahorrador Pro",
    icon: "wallet",
    desc: "Acumula 300 puntos",
    tier: "Raro",
    condition: (u) => gamification[u].points >= 300,
  },
  {
    id: "four_days_week",
    title: "Intenso",
    icon: "zap",
    desc: "Entrena 4 veces en los últimos 7 días",
    tier: "Raro",
    condition: (u) => {
      let count = 0;
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const k = getDateKey(d);
        if (trainingHistory[k] && trainingHistory[k][u]) count++;
      }
      return count >= 4;
    },
  },
  {
    id: "night_owl_hard",
    title: "Turno Noche",
    icon: "moon-star",
    desc: "Entrena después de las 22:00",
    tier: "Raro",
    condition: (u) =>
      new Date().getHours() >= 22 &&
      trainingHistory[getDateKey(new Date())] &&
      trainingHistory[getDateKey(new Date())][u],
  },
  {
    id: "water_streak_5",
    title: "Oasis",
    icon: "droplets",
    desc: "Meta de agua 5 días seguidos",
    tier: "Raro",
    condition: (u) => getHydrationStreak(u) >= 5,
  },

  // --- TIER 3: ÉPICO (Difícil) ---
  {
    id: "streak_21",
    title: "Hábito Forjado",
    icon: "hammer",
    desc: "Racha de 21 días (se forma un hábito)",
    tier: "Épico",
    condition: (u) => calculateUserStreak(u) >= 21,
  },
  {
    id: "streak_30",
    title: "Leyenda",
    icon: "crown",
    desc: "Racha de 30 días",
    tier: "Épico",
    condition: (u) => calculateUserStreak(u) >= 30,
  },
  {
    id: "volume_50k",
    title: "Hércules",
    icon: "biceps-flexed",
    desc: "Levanta 50,000kg en total",
    tier: "Épico",
    condition: (u) => getTotalLiftedVolume(u) >= 50000,
  },
  {
    id: "volume_75k",
    title: "Coloso",
    icon: "mountain",
    desc: "Levanta 75,000kg en total",
    tier: "Épico",
    condition: (u) => getTotalLiftedVolume(u) >= 75000,
  },
  {
    id: "hydrated_master",
    title: "Poseidón",
    icon: "waves",
    desc: "Bebe 4 litros en un día",
    tier: "Épico",
    condition: (u) => waterState[u] >= 4000,
  },
  {
    id: "active_75",
    title: "Atleta",
    icon: "user-check",
    desc: "Completa 75 entrenamientos",
    tier: "Épico",
    condition: (u) => getTotalWorkouts(u) >= 75,
  },
  {
    id: "active_100",
    title: "Centurión",
    icon: "shield-check",
    desc: "Completa 100 entrenamientos",
    tier: "Épico",
    condition: (u) => getTotalWorkouts(u) >= 100,
  },
  {
    id: "duo_25",
    title: "Alma Gemela",
    icon: "heart",
    desc: "Entrena 25 veces con tu pareja",
    tier: "Épico",
    condition: (u) => getDuoWorkouts() >= 25,
  },
  {
    id: "hydrated_14_days",
    title: "Océano",
    icon: "anchor",
    desc: "Cumple meta de agua 14 días seguidos",
    tier: "Épico",
    condition: (u) => getHydrationStreak(u) >= 14,
  },
  {
    id: "volume_single_day_8k",
    title: "Bestia",
    icon: "skull",
    desc: "Levanta 8,000kg en un solo día",
    tier: "Épico",
    condition: (u) => getDailyVolume(u) >= 8000,
  },
  {
    id: "points_500",
    title: "Banquero",
    icon: "landmark",
    desc: "Acumula 500 puntos",
    tier: "Épico",
    condition: (u) => gamification[u].points >= 500,
  },

  // --- TIER 4: LEGENDARIO (Muy Difícil) ---
  {
    id: "streak_60",
    title: "Dios del Gym",
    icon: "award",
    desc: "Racha de 60 días",
    tier: "Legendario",
    condition: (u) => calculateUserStreak(u) >= 60,
  },
  {
    id: "streak_90",
    title: "Imbatible",
    icon: "shield",
    desc: "Racha de 90 días",
    tier: "Legendario",
    condition: (u) => calculateUserStreak(u) >= 90,
  },
  {
    id: "streak_180",
    title: "Semidiós",
    icon: "star",
    desc: "Racha de 180 días (6 meses)",
    tier: "Legendario",
    condition: (u) => calculateUserStreak(u) >= 180,
  },
  {
    id: "volume_100k",
    title: "Titán",
    icon: "weight",
    desc: "Levanta 100,000kg en total",
    tier: "Legendario",
    condition: (u) => getTotalLiftedVolume(u) >= 100000,
  },
  {
    id: "volume_200k",
    title: "Atlas",
    icon: "globe",
    desc: "Levanta 200,000kg en total",
    tier: "Legendario",
    condition: (u) => getTotalLiftedVolume(u) >= 200000,
  },
  {
    id: "active_200",
    title: "Espartano",
    icon: "swords",
    desc: "Completa 200 entrenamientos",
    tier: "Legendario",
    condition: (u) => getTotalWorkouts(u) >= 200,
  },
  {
    id: "year_warrior",
    title: "Inmortal",
    icon: "infinity",
    desc: "Entrena durante un año entero",
    tier: "Legendario",
    condition: (u) => getTotalWorkouts(u) >= 300,
  },
  {
    id: "year_complete",
    title: "Año Dorado",
    icon: "trophy",
    desc: "Completa 365 entrenamientos",
    tier: "Legendario",
    condition: (u) => getTotalWorkouts(u) >= 365,
  },
  {
    id: "duo_50",
    title: "Eternos",
    icon: "gem",
    desc: "Entrena 50 veces con tu pareja",
    tier: "Legendario",
    condition: (u) => getDuoWorkouts() >= 50,
  },
  {
    id: "hydrated_30_days",
    title: "Neptuno",
    icon: "ship",
    desc: "Cumple meta de agua 30 días seguidos",
    tier: "Legendario",
    condition: (u) => getHydrationStreak(u) >= 30,
  },
  {
    id: "points_1000",
    title: "Magnate",
    icon: "crown",
    desc: "Acumula 1000 puntos",
    tier: "Legendario",
    condition: (u) => gamification[u].points >= 1000,
  },
];

// --- ACHIEVEMENT HELPERS ---
function getTotalWorkouts(user) {
  let count = 0;
  Object.values(trainingHistory).forEach((day) => {
    if (day[user]) count++;
  });
  return count;
}

function getTotalLiftedVolume(user) {
  let total = 0;
  Object.values(trainingHistory).forEach((day) => {
    if (day.weights) {
      // weights keys are "dayIndex-exIndex-setIndex"
      // values are like { naty: 50, alma: 30 }
      Object.entries(day.weights).forEach(([wKey, weightObj]) => {
        if (wKey.endsWith("_ts")) return; // Skip timestamp keys
        if (weightObj[user]) {
          // We need reps to calculate volume!
          // Currently history only stores WEIGHT used.
          // To acturately calculate TOTAL volume we need Sets x Reps x Weight.
          // But we don't store exact Reps done per historical set, only the default "10" or "8-10" in routine data.
          // APPROXIMATION: Use 10 reps as standard for volume calc, or just sum "Kg Lifted" as a "Max Effort Accumulator".
          // Let's assume 10 reps per set for gamification purposes.
          total += (parseInt(weightObj[user]) || 0) * 10;
        }
      });
    }
  });
  return total;
}

// Count days where BOTH Naty and Alma trained together
function getDuoWorkouts() {
  let count = 0;
  Object.values(trainingHistory).forEach((day) => {
    if (day.naty && day.alma) count++;
  });
  return count;
}

// Count consecutive days meeting water goal
function getHydrationStreak(user) {
  const goal = waterState[user + "Goal"] || 2000;
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = getDateKey(date);
    const dayData = trainingHistory[key];

    if (dayData && dayData.water && dayData.water[user] >= goal) {
      streak++;
    } else if (i === 0) {
      // Today might not be saved yet, check waterState
      if (waterState[user] >= goal) {
        streak++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return streak;
}

// Get volume lifted on a specific day
function getDailyVolume(user, date = new Date()) {
  const key = getDateKey(date);
  const dayData = trainingHistory[key];
  if (!dayData || !dayData.weights) return 0;

  let total = 0;
  Object.entries(dayData.weights).forEach(([wKey, weightObj]) => {
    if (wKey.endsWith("_ts")) return; // Skip timestamp keys
    if (weightObj[user]) {
      total += (parseInt(weightObj[user]) || 0) * 10; // Assume 10 reps
    }
  });
  return total;
}

function checkAchievements() {
  if (Date.now() - appStartTime < 5000) {
    return;
  }

  const user = "naty";
  if (!gamification[user]) gamification[user] = { points: 0, streak: 0, freezes: 0, achievements: [] };
  if (!gamification[user].achievements) gamification[user].achievements = [];

  let newUnlock = false;
  achievementsConfig.forEach((ach) => {
    if (!gamification[user].achievements.includes(ach.id)) {
      try {
        if (typeof ach.condition === "function" && ach.condition(user)) {
          gamification[user].achievements.push(ach.id);
          newUnlock = true;
          showAchievementModal(ach, user);
          triggerConfetti();
        }
      } catch (e) {
        console.warn("Achievement check error", e);
      }
    }
  });

  if (newUnlock) {
    localStorage.setItem("gymGamification", JSON.stringify(gamification));
    saveToCloud();
  }
}

// --- ACHIEVEMENT MODAL FUNCTIONS ---
function showAchievementModal(achievement, user) {
  const modal = document.getElementById("achievement-modal");
  const content = document.getElementById("achievement-modal-content");
  const card = document.getElementById("achievement-modal-card");
  const glow = document.getElementById("achievement-modal-glow");
  const iconBg = document.getElementById("achievement-modal-icon-bg");
  const icon = document.getElementById("achievement-modal-icon");
  const tier = document.getElementById("achievement-modal-tier");
  const title = document.getElementById("achievement-modal-title");
  const desc = document.getElementById("achievement-modal-desc");
  const userName = document.getElementById("achievement-modal-user");
  const btn = document.getElementById("achievement-modal-btn");

  if (!modal) return;

  // Tier-based styling
  const tierStyles = {
    Común: {
      card: "border-slate-500 bg-slate-900",
      glow: "bg-gradient-to-br from-slate-400/20 to-slate-600/10",
      iconBg: "bg-slate-700",
      tier: "bg-slate-700 text-slate-300",
      btn: "bg-slate-600 hover:bg-slate-500",
    },
    Raro: {
      card: "border-blue-500 bg-slate-900",
      glow: "bg-gradient-to-br from-blue-500/30 to-cyan-500/10",
      iconBg: "bg-blue-600",
      tier: "bg-blue-600 text-white",
      btn: "bg-blue-600 hover:bg-blue-500",
    },
    Épico: {
      card: "border-purple-500 bg-slate-900",
      glow: "bg-gradient-to-br from-purple-500/40 to-pink-500/20",
      iconBg: "bg-purple-600",
      tier: "bg-purple-600 text-white",
      btn: "bg-purple-600 hover:bg-purple-500",
    },
    Legendario: {
      card: "border-fuchsia-400 bg-slate-900",
      glow: "bg-gradient-to-br from-fuchsia-400/50 to-violet-500/30",
      iconBg: "bg-gradient-to-br from-fuchsia-400 to-violet-500",
      tier: "bg-gradient-to-r from-fuchsia-400 to-violet-500 text-black",
      btn: "bg-gradient-to-r from-fuchsia-500 to-violet-500 hover:from-fuchsia-400 hover:to-violet-400",
    },
  };

  const style = tierStyles[achievement.tier] || tierStyles["Común"];

  // Apply styles
  card.className = `relative overflow-hidden rounded-3xl border-2 p-6 text-center ${style.card}`;
  glow.className = `absolute inset-0 opacity-30 ${style.glow}`;
  iconBg.className = `mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl animate-bounce ${style.iconBg}`;
  tier.className = `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${style.tier}`;
  btn.className = `relative z-10 w-full py-3 rounded-xl font-bold text-white transition-all active:scale-95 ${style.btn}`;

  // Set content
  icon.setAttribute("data-lucide", achievement.icon);
  tier.textContent = achievement.tier || "Común";
  title.textContent = achievement.title;
  desc.textContent = achievement.desc;
  userName.innerHTML = user === "naty" ? `<i data-lucide="user" class="w-5 h-5 inline-block text-sky-400"></i> Naty` : `<i data-lucide="user" class="w-5 h-5 inline-block text-pink-400"></i> Alma`; setTimeout(() => lucide.createIcons(), 50);
  userName.className = `font-bold ${user === "naty" ? "text-blue-400" : "text-pink-400"}`;

  // Show modal with animation
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Trigger animation
  setTimeout(() => {
    content.classList.remove("scale-0");
    content.classList.add("scale-100");
  }, 50);

  safeCreateIcons();
}

function closeAchievementModal() {
  const modal = document.getElementById("achievement-modal");
  const content = document.getElementById("achievement-modal-content");

  content.classList.remove("scale-100");
  content.classList.add("scale-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}



// --- MUSCLE MAP GENERATOR ---
const getMuscleMapSVG = (primary = [], secondary = []) => {
  const getClass = (muscleId) => {
    if (primary.includes(muscleId)) return "muscle-path muscle-primary";
    if (secondary.includes(muscleId)) return "muscle-path muscle-secondary";
    return "muscle-path muscle-inactive";
  };

  const strokeWidth = "2";

  return `
    <div class="flex gap-2 h-56 w-full justify-center opacity-95 transition-opacity duration-500 hover:opacity-100 py-2 relative">
        <style>
          .hud-grid {
            stroke: #1e293b;
            stroke-width: 0.75;
            opacity: 0.4;
          }
          .hud-circle {
            stroke: #334155;
            stroke-width: 0.5;
            fill: none;
            opacity: 0.2;
          }
          .hud-scanner {
            stroke: var(--accent-vigor);
            stroke-width: 0.5;
            fill: none;
            opacity: 0.15;
            stroke-dasharray: 5, 5;
            animation: rotate-scan 40s linear infinite;
            transform-origin: center;
          }
          @keyframes rotate-scan {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .hud-text {
            font-family: 'JetBrains Mono', monospace;
            font-size: 10px;
            fill: #475569;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 900;
          }
          .body-frame {
            fill: #0c0f17;
            stroke: #334155;
            stroke-width: 2;
          }
          .muscle-path {
            transition: all 0.2s ease;
          }
          .muscle-inactive {
            fill: #1a202c;
            stroke: #2d3748;
            stroke-width: 2;
          }
          .muscle-primary {
            fill: var(--accent-alma);
            stroke: #000;
            stroke-width: 2;
            filter: url(#glow-primary);
          }
          .muscle-secondary {
            fill: var(--accent-vigor);
            stroke: #000;
            stroke-width: 2;
            filter: url(#glow-secondary);
          }
          .joint {
            fill: #1a202c;
            stroke: #334155;
            stroke-width: 2;
          }
        </style>
        
        <!-- FRONT VIEW -->
        <svg viewBox="0 0 400 780" class="h-full w-auto drop-shadow-md">
            <defs>
              <filter id="glow-primary" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComponentTransfer in="blur" result="glow1">
                  <feFuncA type="linear" slope="0.8"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-secondary" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComponentTransfer in="blur" result="glow1">
                  <feFuncA type="linear" slope="0.8"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- Tech HUD Grid Background -->
            <line x1="200" y1="0" x2="200" y2="780" class="hud-grid" />
            <line x1="0" y1="390" x2="400" y2="390" class="hud-grid" />
            <line x1="100" y1="0" x2="100" y2="780" class="hud-grid" stroke-dasharray="2,2" />
            <line x1="300" y1="0" x2="300" y2="780" class="hud-grid" stroke-dasharray="2,2" />
            
            <circle cx="200" cy="350" r="100" class="hud-circle" />
            <circle cx="200" cy="350" r="220" class="hud-circle" />
            
            <!-- Scan Overlay -->
            <circle cx="200" cy="350" r="180" class="hud-scanner" />

            <text x="20" y="30" class="hud-text">SYS: VITAL_HUD</text>
            <text x="20" y="45" class="hud-text">VIEW: ANTERIOR</text>

            <!-- Head & Neck -->
            <ellipse cx="200" cy="60" rx="35" ry="45" class="body-frame" />
            <rect x="185" y="100" width="30" height="25" class="body-frame" />

            <!-- Traps -->
            <path d="M185,105 L150,115 L140,125 L185,120 Z" class="${getClass("traps")}" stroke-width="${strokeWidth}" />
            <path d="M215,105 L250,115 L260,125 L215,120 Z" class="${getClass("traps")}" stroke-width="${strokeWidth}" />

            <!-- Shoulders -->
            <path d="M140,125 Q115,130 110,160 Q120,185 140,170 Q150,150 140,125 Z" class="${getClass("shoulders")}" stroke-width="${strokeWidth}" />
            <path d="M260,125 Q285,130 290,160 Q280,185 260,170 Q250,150 260,125 Z" class="${getClass("shoulders")}" stroke-width="${strokeWidth}" />

            <!-- Chest -->
            <path d="M200,130 L160,130 Q140,135 140,160 Q160,190 200,190 L200,130 Z" class="${getClass("chest")}" stroke-width="${strokeWidth}" />
            <path d="M200,130 L240,130 Q260,135 260,160 Q240,190 200,190 L200,130 Z" class="${getClass("chest")}" stroke-width="${strokeWidth}" />

            <!-- Abs -->
            <path d="M170,195 H230 V280 Q200,290 170,280 Z" class="${getClass("abs")}" stroke-width="${strokeWidth}" />
            
            <!-- Obliques -->
            <path d="M170,195 L155,200 Q150,240 160,270 L170,280 V195 Z" class="${getClass("obliques")}" stroke-width="${strokeWidth}" />
            <path d="M230,195 L245,200 Q250,240 240,270 L230,280 V195 Z" class="${getClass("obliques")}" stroke-width="${strokeWidth}" />

            <!-- Biceps -->
            <path d="M110,160 Q100,190 110,210 Q130,205 140,170 Z" class="${getClass("biceps")}" stroke-width="${strokeWidth}" />
            <path d="M290,160 Q300,190 290,210 Q270,205 260,170 Z" class="${getClass("biceps")}" stroke-width="${strokeWidth}" />

            <!-- Forearms -->
            <path d="M110,210 Q95,250 100,290 L120,285 Q125,240 130,210 Z" class="${getClass("forearms")}" stroke-width="${strokeWidth}" />
            <path d="M290,210 Q305,250 300,290 L280,285 Q275,240 270,210 Z" class="${getClass("forearms")}" stroke-width="${strokeWidth}" />

            <!-- Quads -->
            <path d="M160,285 Q140,350 150,450 L195,450 Q195,350 195,290 Z" class="${getClass("quads")}" stroke-width="${strokeWidth}" />
            <path d="M240,285 Q260,350 250,450 L205,450 Q205,350 205,290 Z" class="${getClass("quads")}" stroke-width="${strokeWidth}" />
            
            <!-- Tibials (Calves color mapping) -->
            <path d="M155,480 Q150,530 160,580 L175,580 Q170,530 170,480 Z" class="${getClass("calves")}" stroke-width="${strokeWidth}" />
            <path d="M245,480 Q250,530 240,580 L225,580 Q230,530 230,480 Z" class="${getClass("calves")}" stroke-width="${strokeWidth}" />

            <!-- Knees -->
            <circle cx="172" cy="465" r="12" class="joint" />
            <circle cx="228" cy="465" r="12" class="joint" />
        </svg>

        <!-- BACK VIEW -->
        <svg viewBox="0 0 400 780" class="h-full w-auto drop-shadow-md">
            <!-- Tech HUD Grid Background -->
            <line x1="200" y1="0" x2="200" y2="780" class="hud-grid" />
            <line x1="0" y1="390" x2="400" y2="390" class="hud-grid" />
            <line x1="100" y1="0" x2="100" y2="780" class="hud-grid" stroke-dasharray="2,2" />
            <line x1="300" y1="0" x2="300" y2="780" class="hud-grid" stroke-dasharray="2,2" />
            
            <circle cx="200" cy="350" r="100" class="hud-circle" />
            <circle cx="200" cy="350" r="220" class="hud-circle" />
            
            <!-- Scan Overlay -->
            <circle cx="200" cy="350" r="180" class="hud-scanner" />

            <text x="20" y="30" class="hud-text">SYS: VITAL_HUD</text>
            <text x="20" y="45" class="hud-text">VIEW: POSTERIOR</text>

            <!-- Head & Neck -->
            <ellipse cx="200" cy="60" rx="35" ry="45" class="body-frame" />
            <rect x="185" y="100" width="30" height="20" class="body-frame" />

            <!-- Traps (Back) -->
            <path d="M200,100 L160,120 L180,180 L200,230 L220,180 L240,120 Z" class="${getClass("traps")}" stroke-width="${strokeWidth}" />

            <!-- Shoulders (Rear) -->
            <path d="M140,125 Q115,135 110,160 L130,170 Q145,150 160,120 Z" class="${getClass("shoulders")}" stroke-width="${strokeWidth}" />
            <path d="M260,125 Q285,135 290,160 L270,170 Q255,150 240,120 Z" class="${getClass("shoulders")}" stroke-width="${strokeWidth}" />

            <!-- Lats -->
            <path d="M180,180 L150,200 L160,260 L200,280 L240,260 L250,200 L220,180 L200,230 Z" class="${getClass("lats")}" stroke-width="${strokeWidth}" />

            <!-- Lower Back -->
            <path d="M185,280 V300 Q185,310 200,310 Q215,310 215,300 V280 Z" class="${getClass("lower_back")}" stroke-width="${strokeWidth}" />

            <!-- Triceps -->
            <path d="M110,160 Q100,180 110,210 L130,205 Q135,170 130,170 Z" class="${getClass("triceps")}" stroke-width="${strokeWidth}" />
            <path d="M290,160 Q300,180 290,210 L270,205 Q265,170 270,170 Z" class="${getClass("triceps")}" stroke-width="${strokeWidth}" />

            <!-- Forearms (Rear) -->
            <path d="M110,210 Q95,250 100,290 L120,285 Q125,240 130,210 Z" class="${getClass("forearms")}" stroke-width="${strokeWidth}" />
            <path d="M290,210 Q305,250 300,290 L280,285 Q275,240 270,210 Z" class="${getClass("forearms")}" stroke-width="${strokeWidth}" />

            <!-- Glutes -->
            <path d="M160,280 Q140,300 145,340 Q170,360 200,340 Q230,360 255,340 Q260,300 240,280 Q200,300 160,280 Z" class="${getClass("glutes")}" stroke-width="${strokeWidth}" />

            <!-- Hamstrings -->
            <path d="M150,350 Q145,400 155,460 L190,460 Q195,400 190,350 Z" class="${getClass("hamstrings")}" stroke-width="${strokeWidth}" />
            <path d="M250,350 Q255,400 245,460 L210,460 Q205,400 210,350 Z" class="${getClass("hamstrings")}" stroke-width="${strokeWidth}" />
            
            <!-- Popliteal -->
            <rect x="160" y="460" width="30" height="15" class="body-frame" stroke="none" />
            <rect x="210" y="460" width="30" height="15" class="body-frame" stroke="none" />

            <!-- Calves -->
            <path d="M155,475 Q140,500 160,560 L185,550 Q195,500 185,475 Z" class="${getClass("calves")}" stroke-width="${strokeWidth}" />
            <path d="M245,475 Q260,500 240,560 L215,550 Q205,500 215,475 Z" class="${getClass("calves")}" stroke-width="${strokeWidth}" />
        </svg>
    </div>
  `;
};

// --- INIT & RENDER FUNCTIONS ---

// --- HISTORY STATE ---
// (trainingHistory is already defined globally at the top)

// DATA MIGRATION: Check for old 'gymTrainingHistory' vs 'gymRoutineHistory' mismatch if needed
// (If trainingHistory is empty, try to see if there's other data? No, just ensure variable exists)
if (Object.keys(trainingHistory || {}).length === 0) {
  const s = localStorage.getItem("gymTrainingHistory");
  if (s) trainingHistory = JSON.parse(s) || {};

  const oldKeys = Object.keys(localStorage).filter((k) =>
    k.startsWith("gym_history_"),
  );
  if (oldKeys.length > 0) {
    console.log("Found separated history keys, consider migrating if needed.");
  }
}

// --- SMART AUTOFILL HELPER ---
function getLastWeight(exerciseName, user, dayIndex) {
  // Scans trainingHistory backwards to find the last weight for this exercise
  const dates = Object.keys(trainingHistory).sort(
    (a, b) => new Date(b) - new Date(a),
  ); // Newest first

  // We need to iterate over days to find matching exercise name.
  // This is expensive if history is huge, but it's local string comparisons.
  // We don't have a direct map of "Exercise Name" -> "Last Weight".
  // So we have to infer from the structure.

  // Strategy:
  // 1. We know the current dayIndex (e.g. 0 for Monday).
  // 2. We know the exerciseName.
  // 3. We iterate history.
  //    If history[date] exists...
  //    We need to know which setKey corresponds to exerciseName?
  //    We can't rely on index if user changes routine.
  //    BUT, `setWeights` is saved by setKey "day-ex-set".
  //    Wait, `trainingHistory` stores `weights` object which matches `setWeights` structure.

  //    If we assume the routine structure (order of exercises) hasn't changed dramatically:
  //    We can look for keys starting with `${dayIndex}-`.
  //    But we need to match the specific exercise index.
  //    We don't know the exercise index for `exerciseName` unless we scan `routineData`?
  //    Yes, we can find the index of `exerciseName` in `routineData[dayIndex]`.

  // Find exIndex
  const dayRoutine = routineData[dayIndex];
  if (!dayRoutine) return "";

  const exIndex = dayRoutine.exercises.findIndex(
    (e) => e.name === exerciseName,
  );
  if (exIndex === -1) return "";

  for (const date of dates) {
    const dayData = trainingHistory[date];
    if (dayData && dayData.weights) {
      // Look for any set of this exercise (0, 1, 2, 3...)
      // We want the MAX weight or the LAST set weight? Usually "working set" weight.
      // Let's take the first non-empty value we find (newest set).

      // Check sets 0 to 5
      for (let s = 0; s < 6; s++) {
        const key = `${dayIndex}-${exIndex}-${s}`;
        if (dayData.weights[key] && dayData.weights[key][user]) {
          return dayData.weights[key][user];
        }
      }
    }
  }
  return "";
}

function init() {
  // Initialize Session Stopwatch
  if (typeof initSessionStopwatch === "function") {
    initSessionStopwatch();
  }

  // Set Date (Legacy removed)

  // Initialize Gamification / Streak Display Immediately
  if (typeof updateGamificationUI === "function") {
    updateGamificationUI();
  }

  // Initialize AquaFlow
  if (typeof initAquaFlow === "function") {
    initAquaFlow();
  }

  // Initialize Who Trains Today UI
  if (typeof updateWhoTrainsUI === "function") {
    updateWhoTrainsUI();
  }

  renderTabs();
  renderContent();
  renderCalendar();
  updateStats();
  safeCreateIcons();

  // Check Achievements on startup
  if (typeof checkAchievements === "function") checkAchievements();

  // Safely dismiss HTML loader exactly once
  let loaderDismissed = false;
  function hideAppLoader() {
    if (loaderDismissed) return;
    loaderDismissed = true;
    
    const loader = document.getElementById("app-initial-loader");
    
    // Open Daily Motivation modal directly underneath the loader before fade-out
    if (typeof checkAndShowDailyMotivation === "function") {
      checkAndShowDailyMotivation();
    }

    if (loader) {
      loader.classList.add("opacity-0");
      setTimeout(() => {
        try { loader.remove(); } catch (e) { loader.style.display = "none"; }
      }, 500);
    }
  }

  // Load cloud data and dismiss loader safely
  Promise.race([
    loadFromCloud().catch(() => {}),
    new Promise((resolve) => setTimeout(resolve, 800)) // Wait at most 800ms
  ]).then(() => {
    if (typeof updateGamificationUI === "function") updateGamificationUI();
    if (typeof checkAchievements === "function") checkAchievements();
    if (typeof initWeather === "function") initWeather();
    renderTabs();
    renderContent();
    renderCalendar();
    updateStats();
    safeCreateIcons();
    
    hideAppLoader();
  });

  // --- POLLING FOR LIVE SYNC ---
  // Check cloud every 30 seconds
  setInterval(() => {
    if (!document.hidden) {
      loadFromCloud();
    }
  }, 30000);

  // Also check when tab becomes visible
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      loadFromCloud();
    }
  });

  // Global Event Listener for Weight Inputs (Delegation)
  document.body.addEventListener("input", (e) => {
    if (e.target.classList.contains("weight-input")) {
      const key = e.target.getAttribute("data-set-key");
      const user = e.target.getAttribute("data-user");
      const value = e.target.value;

      if (key && user) {
        if (!setWeights[key]) setWeights[key] = {};
        setWeights[key][user] = value;
        lastLocalUpdates[`${key}-${user}-weight`] = Date.now();
        localStorage.setItem("gymRoutineWeights_" + activeRoutineId, JSON.stringify(setWeights));
        debouncedSaveToCloud(3000); // Batch cloud sync while typing
        if (typeof updateLiveVolumeUI === "function") {
          updateLiveVolumeUI();
        }
      }
    }
  });
}

function renderTabs() {
  if (activeTab >= routineData.length) {
    activeTab = 0;
  }
  const container = document.getElementById("tabs-container");
  container.innerHTML = "";

  routineData.forEach((day, index) => {
    const isActive = index === activeTab;
    const btn = document.createElement("button");

    // Determine color theme based on index
    const dayColors = ["emerald", "blue", "violet", "cyan", "rose"]; // Lunes, Martes, Miércoles, Jueves, Viernes
    const activeColor = dayColors[index] || "emerald";

    // Tailwind classes for buttons
    let classes =
      "flex-shrink-0 md:w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group border relative overflow-hidden ";

    if (isActive) {
      // Active State - Add specific class for CSS styling
      classes += `active-tab-${activeColor} translate-x-1 shadow-[0_0_20px_rgba(0,0,0,0.1)]`;
    } else {
      // Inactive State
      classes +=
        "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-700";
    }
    btn.className = classes;

    btn.onclick = () => {
      activeTab = index;
      renderTabs();
      renderContent();
    };

    // Inner HTML
    // Inner HTML
    const activeGradient = `from-${activeColor}-500/10`;
    const activeTextLight = `text-${activeColor}-300`; // for dark mode text
    const activeTextMain = `text-${activeColor}-500`; // for icon

    btn.innerHTML = `
                    ${
                      isActive
                        ? `<div class="absolute inset-0 bg-gradient-to-r ${activeGradient} to-transparent opacity-50"></div>`
                        : ""
                    }
                    <div class="flex flex-col relative z-10">
                        <span class="text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${
                          isActive ? activeTextLight : "text-slate-500"
                        } ${isActive ? "active-tab-label" : ""}">${
                          day.day
                        }</span>
                        <span class="font-medium text-sm whitespace-normal break-words leading-tight md:w-auto">${
                          day.title
                        }</span>
                    </div>
                    <i data-lucide="chevron-right" class="w-4 h-4 transition-all duration-300 relative z-10 ${
                      isActive
                        ? activeTextMain + " translate-x-0 active-tab-icon"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }"></i>
                `;

    container.appendChild(btn);
  });
  safeCreateIcons();
}

// --- WARMUP TIMER LOGIC ---
const warmupTimers = {}; // Stores intervals and state: { id: { time: N, interval: ID, isRunning: bool, original: N } }

function renderTimerCard(ex) {
  // Init state if new
  if (!warmupTimers[ex.id]) {
    const saved = localStorage.getItem("warmup_completed_" + ex.id);
    warmupTimers[ex.id] = {
      time: ex.duration,
      original: ex.duration,
      isRunning: false,
      interval: null,
      isCompleted: saved === "true",
    };
  }

  const state = warmupTimers[ex.id];
  const mins = Math.floor(state.time / 60)
    .toString()
    .padStart(2, "0");
  const secs = (state.time % 60).toString().padStart(2, "0");
  const progressPercent =
    ((state.original - state.time) / state.original) * 100;

  const card = document.createElement("div");
  // Applying 'premium' styling similar to main cards but specific for timers
  let borderClass = `border-${ex.color}-500/30`;
  let bgClass = "bg-slate-900";
  let opacityClass = "";

  if (state.isSkipped) {
    borderClass = "border-slate-800";
    bgClass = "bg-slate-900/50";
    opacityClass = "opacity-50 grayscale";
  } else if (state.isCompleted) {
    borderClass = `border-${ex.color}-500/60`;
    bgClass = "bg-slate-900";
    opacityClass = "opacity-60";
  }

  card.className = `relative overflow-hidden ${bgClass} border ${borderClass} rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 group hover:border-${ex.color}-500/30 transition-all ${opacityClass}`;

  // Render HTML
  card.innerHTML = `
      <!-- Background Progress Bar (Subtle) -->
      ${
        !state.isSkipped
          ? `
      <div class="absolute bottom-0 left-0 h-1 bg-${ex.color}-900/30 w-full">
          <div id="warmup-timer-progress-${ex.id}" class="h-full bg-${ex.color}-500 shadow-[0_0_10px_currentColor] transition-all duration-1000 ease-linear" style="width: ${progressPercent}%"></div>
      </div>`
          : ""
      }

      <!-- Icon & Info -->
      <div class="flex items-center gap-4 w-full md:w-auto">
          <div class="w-12 h-12 rounded-xl bg-${ex.color}-500/10 flex items-center justify-center border border-${ex.color}-500/20 group-hover:scale-110 transition-transform relative">
              <i data-lucide="${ex.icon}" class="w-6 h-6 text-${ex.color}-400"></i>
              ${state.isCompleted ? '<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 absolute -top-1 -right-1 drop-shadow-lg"></i>' : ""}
          </div>
          <div>
              <h4 class="font-bold text-[var(--text-main)] text-lg leading-tight md:mb-1">
                  ${ex.title}
                  ${state.isCompleted ? '<span class="text-xs text-emerald-400 ml-2 font-bold uppercase">(Completado)</span>' : ""}
                  ${state.isSkipped ? '<span class="text-xs text-red-400 ml-2 font-bold uppercase">(Saltado)</span>' : ""}
              </h4>
              <p class="text-xs text-[var(--text-dim)] font-medium">${ex.desc}</p>
          </div>
      </div>

      <!-- Timer Controls -->
      <div class="flex items-center gap-4 ml-auto w-full md:w-auto justify-between md:justify-end bg-[var(--bg-input)] p-2 rounded-xl border border-[var(--border-strong)]">
          <!-- Digital Display -->
          <div id="warmup-timer-display-${ex.id}" class="font-mono text-2xl font-bold tracking-widest ${state.isRunning ? `text-${ex.color}-400` : "text-[var(--text-dim)]"} w-24 text-center">
              ${mins}:${secs}
          </div>

          <div class="flex gap-2">
              <button onclick="toggleWarmupTimer('${ex.id}')" ${state.isSkipped ? "disabled" : ""} class="p-2 rounded-lg ${state.isRunning ? "bg-fuchsia-500/20 text-fuchsia-400 hover:bg-fuchsia-500/30" : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"} transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i data-lucide="${state.isRunning ? "pause" : "play"}" class="w-5 h-5 fill-current"></i>
              </button>
              <button onclick="resetWarmupTimer('${ex.id}')" class="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-panel-alt)] transition-all active:scale-95">
                  <i data-lucide="rotate-ccw" class="w-5 h-5"></i>
              </button>
               <button onclick="skipWarmupTimer('${ex.id}')" class="p-2 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-900/40 transition-all active:scale-95" title="Saltar">
                  <i data-lucide="skip-forward" class="w-5 h-5"></i>
              </button>
          </div>
      </div>
  `;

  return card;
}

function toggleWarmupTimer(id) {
  const state = warmupTimers[id];
  if (!state) return;

  if (state.isRunning) {
    // Pause
    clearInterval(state.interval);
    state.isRunning = false;
    // Calculate remaining time precisely on pause
    if (state.endTime) {
      state.time = Math.max(0, Math.ceil((state.endTime - Date.now()) / 1000));
    }
    
    releaseWakeLock();
    disableBackgroundMode();
    
    const LiveActivity = getLiveActivityPlugin();
    if (LiveActivity) {
      LiveActivity.endRestTimer({ userName: "Naty" }).catch(e => alert("Error pausing (Naty): " + JSON.stringify(e)));
      LiveActivity.endRestTimer({ userName: "Alma" }).catch(e => alert("Error pausing (Alma): " + JSON.stringify(e)));
    }
  } else {
    // Start
    if (state.time <= 0) return; // Finished
    state.isRunning = true;
    state.endTime = Date.now() + (state.time * 1000);
    
    requestWakeLock();
    enableBackgroundMode("Calentamiento", state.time, whoTrainsToday === "alma" ? "alma" : "naty");
    
    state.interval = setInterval(() => {
      const now = Date.now();
      state.time = Math.max(0, Math.ceil((state.endTime - now) / 1000));
      
      if (state.time <= 0) {
        // Finished
        clearInterval(state.interval);
        state.isRunning = false;
        state.time = 0;
        state.isCompleted = true;
        localStorage.setItem("warmup_completed_" + id, "true");
        
        releaseWakeLock();
        disableBackgroundMode();
        
        const LiveActivity = getLiveActivityPlugin();
        if (LiveActivity) {
          LiveActivity.endRestTimer({ userName: "Naty" }).catch(e => console.warn("[LA] end (Naty):", e));
        }
        
        // Play sound? or visual cue
        playTimerEnd(); // Play the same sound as main timers
        try {
          showToast("check-circle", "text-emerald-400", "¡Tiempo completado!");
        } catch (e) {}
      }
      updateTimerDOM(id);
    }, 1000);
    
    const LiveActivity = getLiveActivityPlugin();
    if (LiveActivity) {
      const exName = id === "bike" ? "Bicicleta Estática" : "Activación";
      
      LiveActivity.startRestTimer({
        exerciseName: exName,
        userName: whoTrainsToday === "alma" ? "Alma" : "Naty",
        seconds: state.time
      }).catch(e => console.warn("[LA] start:", e));
    }
  }

  // Initial UI update for button state
  renderContent();
}

function resetWarmupTimer(id) {
  const state = warmupTimers[id];
  if (!state) return;
  clearInterval(state.interval);
  state.isRunning = false;
  state.isSkipped = false;
  state.isCompleted = false;
  state.time = state.original;
  state.endTime = null;
  localStorage.setItem("warmup_completed_" + id, "false");
  
  releaseWakeLock();
  disableBackgroundMode();
  
  const LiveActivity = getLiveActivityPlugin();
  if (LiveActivity) {
    LiveActivity.endRestTimer({ userName: "Naty" }).catch(e => console.warn("[LA] reset:", e));
  }
  
  renderContent();
}

function skipWarmupTimer(id) {
  const state = warmupTimers[id];
  if (!state) return;

  clearInterval(state.interval);
  state.isRunning = false;
  state.isCompleted = false;
  state.isSkipped = true;
  state.time = 0;
  state.endTime = null;
  localStorage.setItem("warmup_completed_" + id, "false");

  releaseWakeLock();
  disableBackgroundMode();

  const LiveActivity = getLiveActivityPlugin();
  if (LiveActivity) {
    LiveActivity.endRestTimer({ userName: "Naty" }).catch(e => console.warn("[LA] skip:", e));
  }

  renderContent();
}

// Helper to update DOM without full re-render
function updateTimerDOM(id) {
  const state = warmupTimers[id];
  if (!state) return;

  const display = document.getElementById(`warmup-timer-display-${id}`);
  const progressBar = document.getElementById(`warmup-timer-progress-${id}`);

  if (display && progressBar) {
    const mins = Math.floor(state.time / 60)
      .toString()
      .padStart(2, "0");
    const secs = (state.time % 60).toString().padStart(2, "0");
    const progressPercent =
      ((state.original - state.time) / state.original) * 100;

    display.textContent = `${mins}:${secs}`;
    progressBar.style.width = `${progressPercent}%`;
  } else {
    // Fallback if elements not found (e.g. view changed)
    renderContent();
  }
}

function updateSingleSetUI(setKey, user, isCompleted, clickedBtn) {
  const btn = clickedBtn || document.querySelector(`.set-btn[data-set-key="${setKey}"][data-user="${user}"]`);
  if (btn) {
    const row = btn.closest(".flex.items-center.justify-between");
    const numberBadge = row ? row.querySelector(".w-8.h-8") : null;
    
    if (isCompleted) {
      btn.className = "set-btn shrink-0 w-12 h-11 min-w-[48px] rounded-2xl flex items-center justify-center transition-all cursor-pointer bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 active:scale-95";
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      if (row) {
        row.className = "flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all duration-200 border bg-violet-950/20 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.1)]";
      }
      if (numberBadge) {
        numberBadge.className = "w-8 h-8 rounded-xl bg-violet-600 text-white font-black text-xs flex items-center justify-center shrink-0 font-mono transition-colors";
      }
    } else {
      btn.className = "set-btn shrink-0 w-12 h-11 min-w-[48px] rounded-2xl flex items-center justify-center transition-all cursor-pointer bg-[var(--bg-input)] text-[var(--text-dim)] border border-[var(--border-strong)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]";
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      if (row) {
        row.className = "flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all duration-200 border bg-[var(--bg-panel-alt)] border-[var(--border-strong)] hover:border-violet-500/30";
      }
      if (numberBadge) {
        numberBadge.className = "w-8 h-8 rounded-xl bg-[var(--bg-input)] text-[var(--text-dim)] border border-[var(--border-strong)] font-bold text-xs flex items-center justify-center shrink-0 font-mono transition-colors";
      }
    }
  }

  // Recalculate progress without rebuilding DOM
  const dayData = routineData[activeTab];
  if (!dayData) return;
  
  let totalSets = 0;
  let completedSetsCount = 0;
  dayData.exercises.forEach((exercise, idx) => {
    const numSets = parseInt(exercise.sets) || 3;
    totalSets += numSets;
    for (let s = 0; s < numSets; s++) {
      const k = `${activeTab}-${idx}-${s}`;
      const d = completedSets[k] || { naty: false, alma: false };
      if (d.naty) completedSetsCount++;
    }
  });

  const progress = totalSets === 0 ? 0 : Math.round((completedSetsCount / totalSets) * 100);
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  if (progressText) progressText.textContent = `${progress}%`;
  if (progressBar) progressBar.style.width = `${progress}%`;
  
  const completionMsg = document.getElementById("completion-message");
  if (completionMsg) {
    if (progress === 100) {
      completionMsg.classList.remove("hidden");
      if (typeof openWorkoutSummaryModal === "function") {
        setTimeout(openWorkoutSummaryModal, 600);
      }
    } else {
      completionMsg.classList.add("hidden");
    }
  }

  if (typeof updateLiveVolumeUI === "function") updateLiveVolumeUI();
}

window.toggleWarmupTimer = toggleWarmupTimer;
window.resetWarmupTimer = resetWarmupTimer;
window.skipWarmupTimer = skipWarmupTimer;
window.toggleExerciseComplete = function(tabIdx, exerciseIdx, numSets, isCompleted) {
  const nextState = !isCompleted;
  for (let s = 0; s < numSets; s++) {
    const setKey = `${tabIdx}-${exerciseIdx}-${s}`;
    if (!completedSets[setKey]) {
      completedSets[setKey] = { naty: false, alma: false };
    }
    completedSets[setKey].naty = nextState;
    updateSingleSetUI(setKey, "naty", nextState);
  }
  localStorage.setItem("gymRoutineSets_" + activeRoutineId, JSON.stringify(completedSets));
  
  const today = getDateKey(new Date());
  if (!trainingHistory[today]) {
    trainingHistory[today] = { alma: false, naty: false, weights: {}, completed_sets: {} };
  }
  trainingHistory[today].completed_sets = completedSets;
  if (typeof debouncedSaveToCloud === 'function') debouncedSaveToCloud(1000);
  
  if (nextState && typeof isSessionTimerRunning !== "undefined" && !isSessionTimerRunning) {
    if (typeof startWorkoutSession === "function") startWorkoutSession();
  }
  triggerHaptic();
};

function renderContent(skipAnimations = false) {
  if (activeTab >= routineData.length) {
    activeTab = 0;
  }
  const dayData = routineData[activeTab];

  // Determine active color theme
  const dayColors = ["emerald", "blue", "violet", "cyan", "rose"];
  const activeColor = dayColors[activeTab] || "emerald";

  // Update Headers & Progress
  document.getElementById("day-title").textContent = dayData.title;
  document.getElementById("exercise-count").textContent =
    `${dayData.exercises.length} Ejercicios`;
  if (typeof updateDailyMotivationBanner === "function") {
    updateDailyMotivationBanner();
  }

  // Calculate total sets and completed sets for progress
  let totalSets = 0;
  let completedSetsCount = 0;
  dayData.exercises.forEach((exercise, idx) => {
    const numSets = parseInt(exercise.sets) || 3;
    totalSets += numSets;
    for (let s = 0; s < numSets; s++) {
      const setKey = `${activeTab}-${idx}-${s}`;
      const setData = completedSets[setKey] || { naty: false, alma: false };
      if (setData.naty) completedSetsCount++;
    }
  });

  const progress =
    totalSets === 0 ? 0 : Math.round((completedSetsCount / totalSets) * 100);

  const progressContainer = document.getElementById("progress-container");
  progressContainer.classList.remove("hidden");

  // Show session control panel and refresh UI
  const sessionPanel = document.getElementById("session-control-panel");
  if (sessionPanel) {
    sessionPanel.classList.remove("hidden");
    if (typeof updateStopwatchUI === "function") updateStopwatchUI();
    if (typeof updateStopwatchControls === "function") updateStopwatchControls();
    if (typeof updateLiveVolumeUI === "function") updateLiveVolumeUI();
  }

  // Progress Bar Animation
  const progressBar = document.getElementById("progress-bar");
  document.getElementById("progress-text").textContent = `${progress}%`;

  // Update progress bar color
  progressBar.className = `h-full rounded-full transition-all duration-1000 ease-out bg-${activeColor}-500 shadow-[0_0_10px_rgba(0,0,0,0.3)]`;

  progressBar.style.width = "0%";
  setTimeout(() => {
    progressBar.style.width = `${progress}%`;
  }, 50);

  // Completion Message
  const completionMsg = document.getElementById("completion-message");
  if (progress === 100) {
    completionMsg.classList.remove("hidden");
    if (typeof openWorkoutSummaryModal === "function") {
      setTimeout(openWorkoutSummaryModal, 600);
    }
  } else {
    completionMsg.classList.add("hidden");
  }

  // Render Exercises
  const listContainer = document.getElementById("exercises-list");
  listContainer.innerHTML = "";

  // BLOQUE 0: ACTIVACIÓN (Interactive Timers)
  const warmupContainer = document.createElement("div");
  warmupContainer.className = "mb-8 space-y-4";

  // Header Bloque 0
  warmupContainer.innerHTML = `
      <div class="flex items-center gap-2 mb-4 px-1">
          <i data-lucide="flame" class="w-6 h-6 text-fuchsia-500 animate-pulse"></i>
          <h3 class="text-xl font-black text-fuchsia-500 tracking-tight">BLOQUE 0: ACTIVACIÓN</h3>
          <span class="text-xs text-fuchsia-500/50 font-bold uppercase tracking-wider ml-auto">Pre-Workout</span>
      </div>
  `;

  // Define Warmup Exercises
  const warmupExercises = [
    {
      id: "bike",
      title: "Bicicleta Estática",
      icon: "bike",
      duration: 600, // 10 minutes
      desc: "Ritmo medio constante",
      color: "amber",
    }
  ];

  warmupExercises.forEach((ex) => {
    warmupContainer.appendChild(renderTimerCard(ex));
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(warmupContainer);

  dayData.exercises.forEach((exercise, idx) => {
    const numSets = parseInt(exercise.sets) || 3;
    const restTime = parseRestTime(exercise.notes || "");
    const cleanNotes = (exercise.notes || "").replace(/Descanso:\s*[\d\.]+\s*(min|seg|s|m)\.?/gi, "").trim();

    // Count completed sets for this exercise
    let exerciseCompletedChecks = 0;
    for (let s = 0; s < numSets; s++) {
      const setKey = `${activeTab}-${idx}-${s}`;
      const setData = completedSets[setKey] || { naty: false, alma: false };
      if (setData.naty) exerciseCompletedChecks++;
    }
    const isExerciseCompleted = exerciseCompletedChecks === numSets;

    const card = document.createElement("div");
    const staggerClass = (!skipAnimations && idx < 6) ? `stagger-${idx + 1}` : "";
    let cardClasses = `${!skipAnimations ? 'animate-slide-up' : ''} ${staggerClass} relative bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-3xl p-1 mb-6 flex flex-col transition-all shadow-sm `;
    
    if (isExerciseCompleted) {
      cardClasses += `opacity-60`;
    }
    card.className = cardClasses;

    // Generate Set Rows (Single clean Naty row)
    let setRowsHTML = `<div class="flex flex-col gap-2.5">`;
    for (let s = 0; s < numSets; s++) {
      const setKey = `${activeTab}-${idx}-${s}`;
      if (typeof completedSets[setKey] !== "object") {
        completedSets[setKey] = { naty: false, alma: false };
      }
      const setData = completedSets[setKey];

      let weightNaty = setWeights[setKey] && setWeights[setKey].naty ? setWeights[setKey].naty : "";
      let repsNaty = setReps[setKey] && setReps[setKey].naty ? setReps[setKey].naty : "";

      if (!weightNaty) {
        const last = getLastWeight(exercise.name, "naty", activeTab);
        if (last) weightNaty = last;
      }
      if (!repsNaty) {
        const last = getLastReps(exercise.name, "naty", activeTab);
        if (last) repsNaty = last;
      }
      
      const targetRepsPlaceholder = exercise.reps ? exercise.reps.replace(/[^0-9-]/g, '').split('-')[0] || "10" : "10";

      setRowsHTML += `
      <div class="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all duration-200 border ${setData.naty ? 'bg-violet-950/20 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.1)]' : 'bg-[var(--bg-panel-alt)] border-[var(--border-strong)] hover:border-violet-500/30'}">
          <!-- Left: Set Number & Inputs -->
          <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl ${setData.naty ? 'bg-violet-600 text-white font-black' : 'bg-[var(--bg-input)] text-[var(--text-dim)] border border-[var(--border-strong)] font-bold'} text-xs flex items-center justify-center shrink-0 font-mono transition-colors">
                  ${s + 1}
              </div>
              
              <!-- Reps & Weight in clean pills -->
              <div class="flex items-center gap-2">
                  <div class="flex items-center bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl px-2.5 py-1">
                      <input type="number" value="${repsNaty}" placeholder="${targetRepsPlaceholder}" data-set-key="${setKey}" data-user="naty"
                          class="reps-input w-10 text-center font-bold text-[var(--text-main)] bg-transparent text-sm outline-none m-0 p-0" onclick="event.stopPropagation()">
                      <span class="text-[11px] font-semibold text-[var(--text-muted)] ml-1">reps</span>
                  </div>
                  
                  <span class="text-[var(--text-muted)] font-bold">×</span>
                  
                  <div class="flex items-center gap-2 bg-[var(--bg-input)] border border-[var(--border-strong)] rounded-xl px-2.5 py-1">
                      <input type="number" value="${weightNaty}" placeholder="0" data-set-key="${setKey}" data-user="naty"
                          class="weight-input w-12 text-center font-bold text-[var(--text-main)] bg-transparent text-sm outline-none m-0 p-0" onclick="event.stopPropagation()">
                      <span class="text-[11px] font-semibold text-[var(--text-muted)] ml-1 tracking-wider uppercase">kg</span>
                  </div>
              </div>
          </div>
          
          <!-- Right: Check Action -->
          <button data-set-key="${setKey}" data-user="naty" data-exercise-name="${exercise.name}" data-rest-time="${restTime}"
              class="set-btn shrink-0 w-12 h-11 min-w-[48px] rounded-2xl flex items-center justify-center transition-all cursor-pointer ${setData.naty ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 active:scale-95' : 'bg-[var(--bg-input)] text-[var(--text-dim)] border border-[var(--border-strong)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'}">
              <i data-lucide="check" class="w-5 h-5"></i>
          </button>
      </div>
      `;
    }
    setRowsHTML += `</div>`;

    // Assemble Card HTML
    card.innerHTML = `
        <!-- Card Header -->
        <div class="p-4 sm:p-5 flex items-start gap-4">
            <!-- Thumbnail -->
            <div class="w-20 h-20 rounded-2xl bg-black flex items-center justify-center shrink-0 overflow-hidden relative cursor-pointer border border-slate-800/80 hover:border-violet-500/50 transition-all shadow-md group" onclick='event.stopPropagation(); openImageModal("${getExerciseImage(exercise)}", "${(exercise.name || "").replace(/"/g, "&quot;")}")'>
                <img src="${getExerciseImage(exercise)}" alt="${exercise.name}" loading="lazy" decoding="async" class="w-full h-full object-cover grayscale opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105" onerror="this.onerror=null; this.src='./assets/exercises/squat.jpg';" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                    <i data-lucide="maximize-2" class="w-3.5 h-3.5 text-white drop-shadow"></i>
                </div>
            </div>
            
            <!-- Title & Metadata -->
            <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start gap-2">
                    <h3 class="font-extrabold text-lg sm:text-xl text-[var(--text-main)] leading-tight tracking-tight">${exercise.name}</h3>
                    <button onclick="event.stopPropagation(); showExerciseHistory('${exercise.name}')" title="Ver historial del ejercicio" class="text-[var(--text-dim)] hover:text-violet-400 p-1.5 rounded-full hover:bg-[var(--bg-panel-alt)] transition-colors shrink-0">
                        <i data-lucide="info" class="w-4 h-4"></i>
                    </button>
                </div>
                <div class="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span class="text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                        ${exercise.muscles.primary.join(", ")}
                    </span>
                    <span class="text-xs text-[var(--text-dim)] flex items-center gap-1 font-medium">
                        <i data-lucide="timer" class="w-3 h-3 text-[var(--text-dim)]"></i> ${restTime >= 60 ? Math.floor(restTime/60) + ' min' : restTime + 's'}
                    </span>
                </div>
            </div>
        </div>
        
        <!-- Objective & Quick Actions Bar -->
        <div class="px-4 sm:px-5 pb-3 flex items-center justify-between gap-2 flex-wrap">
            <div class="text-xs font-semibold text-[var(--text-dim)] flex items-center gap-1.5 bg-[var(--bg-input)] border border-[var(--border-strong)] px-3 py-1 rounded-full">
                <i data-lucide="target" class="w-3.5 h-3.5 text-emerald-400"></i>
                <span>Objetivo: <strong class="text-[var(--text-main)]">${numSets} series × ${exercise.reps} reps</strong></span>
            </div>
            
            <button onclick="toggleExerciseComplete('${activeTab}', ${idx}, ${numSets}, ${isExerciseCompleted})" 
                class="text-xs font-bold px-3 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ml-auto ${isExerciseCompleted ? 'bg-[var(--bg-panel-alt)] border border-[var(--border-strong)] text-[var(--text-dim)]' : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'}">
                <i data-lucide="${isExerciseCompleted ? 'rotate-ccw' : 'check-circle-2'}" class="w-3.5 h-3.5"></i>
                ${isExerciseCompleted ? 'Deshacer' : 'Completar todo'}
            </button>
        </div>
        
        <!-- Coach Note (only if non-empty text exists) -->
        ${cleanNotes ? `
        <div class="px-4 sm:px-5 mb-3">
             <div class="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex gap-2.5 items-start leading-relaxed">
                 <i data-lucide="lightbulb" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5"></i>
                 <span>${cleanNotes}</span>
             </div>
        </div>
        ` : ''}

        <!-- Sets Tracker Rows -->
        <div class="px-4 sm:px-5 pb-5 w-full">
            ${setRowsHTML}
            
            <!-- Add / Remove Set Row Actions -->
            <div class="flex items-center gap-2.5 mt-3 text-xs">
                <button onclick="addExerciseSet('${activeTab}', ${idx})" class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--bg-panel-alt)] border border-[var(--border-strong)] text-violet-400 font-bold transition-all cursor-pointer active:scale-95 shadow-sm">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Agregar serie
                </button>
                
                ${numSets > 1 ? `
                <button onclick="removeExerciseSet('${activeTab}', ${idx})" class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--bg-panel-alt)] border border-[var(--border-strong)] text-[var(--text-dim)] hover:text-[var(--text-main)] font-medium transition-all cursor-pointer active:scale-95 shadow-sm">
                    <i data-lucide="minus" class="w-3.5 h-3.5"></i> Quitar serie
                </button>
                ` : ''}
            </div>
        </div>
    `;
    fragment.appendChild(card);
  });

  // RESET BUTTON
  const resetBtnContainer = document.createElement("div");
  resetBtnContainer.className =
    "mt-8 mb-12 flex justify-center opacity-80 hover:opacity-100 transition-opacity";
  resetBtnContainer.innerHTML = `
                <button id="reset-progress-btn" class="flex items-center gap-2 px-6 py-3 bg-[var(--bg-panel-alt)] text-[var(--text-dim)] border border-[var(--border-strong)] rounded-2xl hover:bg-red-900/20 hover:text-red-400 hover:border-red-900/50 transition-all duration-300 shadow-sm hover:shadow-red-500/10 active:scale-95 touch-manipulation">
                    <i data-lucide="rotate-ccw" class="w-5 h-5"></i>
                    <span class="font-medium">Reiniciar Entrenamiento</span>
                </button>
            `;
  fragment.appendChild(resetBtnContainer);
  listContainer.appendChild(fragment);
  safeCreateIcons(listContainer);

  // Listener for reset
  setTimeout(() => {
    const btn = document.getElementById("reset-progress-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        showConfirmModal(
          "¿Reiniciar Progreso?",
          "Se borrará todo lo que hiciste hoy. ¿Estás seguro?",
          () => {
            completedSets = {};
            localStorage.removeItem("gymRoutineSets_" + activeRoutineId);
            
            const today = getDateKey(new Date());
            if (!trainingHistory[today]) {
              trainingHistory[today] = { alma: false, naty: false, weights: {}, completed_sets: {} };
            }
            trainingHistory[today].completed_sets = {};
            
            lastLocalUpdates["global-reset"] = Date.now();
            debouncedSaveToCloud(1000);
            renderContent();
          },
        );
      });
    }
  }, 0);

  // Add event listeners to set buttons (UPDATED)
  document.querySelectorAll(".set-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const setKey = btn.dataset.setKey;
      const user = btn.dataset.user; // 'naty' or 'alma'
      const exerciseName = btn.dataset.exerciseName;
      const restTime = parseInt(btn.dataset.restTime);

      // Initialize if missing
      if (!completedSets[setKey] || typeof completedSets[setKey] !== "object") {
        completedSets[setKey] = { naty: false, alma: false };
      }

      // Record local update timestamp to prevent sync race condition
      const now = Date.now();
      lastLocalUpdates[`${setKey}-${user}`] = now;
      if (!completedSets[setKey + "_ts"]) {
        completedSets[setKey + "_ts"] = {};
      }
      completedSets[setKey + "_ts"][user] = now;

      // Request Notification if needed
      if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
      }

      // Handle Logic
      const currentState = completedSets[setKey][user];

      if (!currentState) {
        // TURN ON
        completedSets[setKey][user] = true;
        // Reward +5 gems per set completed
        if (user === "naty" && gamification && gamification.naty) {
          gamification.naty.points = (gamification.naty.points || 0) + 5;
          updateGamificationUI();
        }
        // Sólo mostrar timer si se activa
        showTimer(user, exerciseName, restTime);
        
        // Auto-start active session timer if not running
        if (typeof isSessionTimerRunning !== "undefined" && !isSessionTimerRunning) {
          if (typeof startWorkoutSession === "function") {
            startWorkoutSession();
          }
        }
      } else {
        // TURN OFF
        completedSets[setKey][user] = false;
        if (user === "naty" && gamification && gamification.naty && gamification.naty.points >= 5) {
          gamification.naty.points -= 5;
          updateGamificationUI();
        }
        
        // Hide the timer if it is currently active for this user
        if (timerState[user] && timerState[user].active) {
            hideTimer(user);
        }
      }

      localStorage.setItem("gymRoutineSets_" + activeRoutineId, JSON.stringify(completedSets));

      // Real-time synchronization
      const today = getDateKey(new Date());
      if (!trainingHistory[today]) {
        trainingHistory[today] = { alma: false, naty: false, weights: {}, completed_sets: {} };
      }
      trainingHistory[today].completed_sets = completedSets;
      trainingHistory[today].weights = {
        ...trainingHistory[today].weights,
        ...setWeights,
      };
      
      debouncedSaveToCloud(1000);
      updateSingleSetUI(setKey, user, completedSets[setKey][user], btn);
      if (typeof triggerHaptic === "function") triggerHaptic();
    });
  });

  // Handle Weight Inputs
  document.querySelectorAll(".weight-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const setKey = e.target.dataset.setKey;
      const user = e.target.dataset.user;
      const val = e.target.value;

      if (!setWeights[setKey]) {
        setWeights[setKey] = { naty: "", alma: "" };
      }
      setWeights[setKey][user] = val;
      const now = Date.now();
      lastLocalUpdates[`${setKey}-${user}-weight`] = now;
      if (!setWeights[setKey + "_ts"]) {
        setWeights[setKey + "_ts"] = {};
      }
      setWeights[setKey + "_ts"][user] = now;

      localStorage.setItem("gymRoutineWeights_" + activeRoutineId, JSON.stringify(setWeights));

      // Real-time synchronization
      const today = getDateKey(new Date());
      if (!trainingHistory[today]) {
        trainingHistory[today] = { alma: false, naty: false, weights: {}, completed_sets: {} };
      }
      trainingHistory[today].weights = {
        ...trainingHistory[today].weights,
        ...setWeights,
      };
      trainingHistory[today].completed_sets = completedSets;

      debouncedSaveToCloud(1500);
      if (typeof updateLiveVolumeUI === "function") {
        updateLiveVolumeUI();
      }
    });

    // Auto-select on focus
    input.addEventListener("focus", (e) => e.target.select());
    // Stop propagation of clicks to prevent triggering exercise completion or other bubbling
    input.addEventListener("click", (e) => e.stopPropagation());
  });

  // Re-init icons for newly added elements
  safeCreateIcons();
}

function openImageModal(imgSrc, title = "Vista Previa") {
  const modal = document.getElementById("image-modal");
  const container = document.getElementById("image-modal-content");
  const titleEl = document.getElementById("image-modal-title");

  if (!modal || !container) return;

  if (titleEl) {
    titleEl.textContent = title || "Vista Previa";
  }

  // Inject the image full size with high contrast B&W styling
  container.innerHTML = `
    <div class="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black flex items-center justify-center">
      <img id="modal-image" src="${imgSrc}" alt="${title}" class="w-full h-full object-cover grayscale contrast-125 brightness-95 transition-transform duration-500 hover:scale-105" onerror="this.onerror=null; this.src='./assets/exercises/squat.jpg';" />
    </div>`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  safeCreateIcons();
}

function closeImageModal() {
  const modal = document.getElementById("image-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;

// --- VISIBILITY HANDLER ---
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // Resume audio context if suspended
    unlockAudio();

    // Check if any timer expired while in background
    let needsUpdate = false;
    const now = Date.now();

    ["naty", "alma"].forEach((user) => {
      const state = timerState[user];
      if (state.active) {
        if (!state.isStopwatch) {
          const diff = state.endTime - now;
          if (diff <= 0) {
            // Expired while in background
            state.currentSeconds = 0;
            handleTimerComplete(user);
            needsUpdate = true;
          } else {
            state.currentSeconds = Math.ceil(diff / 1000);
            needsUpdate = true;
          }
        }
      }
    });

    if (needsUpdate) {
      updateTimerDisplay();
    }
  } else if (document.visibilityState === "hidden") {
    // Immediate notification update
    handleNotifications();
  }
});

// --- CAPACITOR APP STATE FALLBACK (for iOS reliable wakeups) ---
if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
  window.Capacitor.Plugins.App.addListener('appStateChange', ({ isActive }) => {
    if (isActive) {
      unlockAudio();
      let needsUpdate = false;
      const now = Date.now();
      ["naty", "alma", "session"].forEach((user) => {
        const state = timerState[user];
        if (state.active && !state.isStopwatch) {
          const diff = state.endTime - now;
          if (diff <= 0) {
            state.currentSeconds = 0;
            handleTimerComplete(user);
            needsUpdate = true;
          } else {
            state.currentSeconds = Math.ceil(diff / 1000);
            needsUpdate = true;
          }
        }
      });
      if (needsUpdate) updateTimerDisplay();
    } else {
      handleNotifications();
    }
  });
}

// --- SERVICE WORKER REGISTRATION REMOVED ---
// Service workers in Capacitor cause infinite reload loops and prevent APK updates from applying.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
  if ("caches" in window) {
    caches.keys().then(function(names) {
      for (let name of names) caches.delete(name);
    });
  }
}

// Debug
// Debug Click Handler (Global)
function handleTestClick() {
  logToScreen("--- DIAGNÓSTICO INICIADO ---");
  logToScreen(`🔒 Estado Crudo: '${Notification.permission}'`);
  logToScreen(`🔐 Seguro (HTTPS): ${window.isSecureContext}`);
  logToScreen(`📱 ServiceWorker Reg: ${!!navigator.serviceWorker.controller}`);

  if (Notification.permission === "denied") {
    logToScreen("❌ El navegador reporta 'DENIED'.", "error");
    logToScreen(
      "⚠️ Esto significa que el BLOQUEO es del SITIO WEB, no del celular.",
      "error",
    );
    showPermissionModal();
  } else if (Notification.permission !== "granted") {
    logToScreen("⚠️ Permisos 'default'. Solicitando...", "info");
    Notification.requestPermission().then((res) => {
      logToScreen(`📝 Respuesta solicitud: '${res}'`);
      if (res === "granted") {
        logToScreen("✅ Permiso ACEPTADO.", "success");
        sendTestNotif();
      } else {
        logToScreen("❌ Solicitud Rechazada/Ignorada.", "error");
        showPermissionModal();
      }
    });
  } else {
    logToScreen("✅ Permisos OK. Enviando test...", "success");
    sendTestNotif();
  }
}

// Ensure function is global
window.handleTestClick = handleTestClick;

function sendTestNotif() {
  logToScreen("Iniciando Test de Notificación...", "info");

  if (Notification.permission !== "granted") {
    logToScreen("❌ Permiso NO concedido: " + Notification.permission, "error");
    return;
  }

  if (!navigator.serviceWorker) {
    logToScreen("⚠️ Service Worker no soportado en este navegador.", "error");
    try {
      new Notification("Test Fallback", { body: "Prueba sin SW" });
      logToScreen("✅ Notificación Fallback enviada.", "success");
    } catch (e) {
      logToScreen("❌ Error Fallback: " + e, "error");
    }
    return;
  }

  navigator.serviceWorker
    .getRegistration()
    .then((reg) => {
      if (!reg) {
        logToScreen(
          "❌ Service Worker NO registrado (scope undefined).",
          "error",
        );
        return;
      }

      logToScreen("✅ SW Encontrado. Scope: " + reg.scope, "success");

      reg
        .showNotification("Test Gym SW", {
          body: "Si ves esto, funciona el SW.",
          icon: "favicon.svg",
          vibrate: [100, 50, 100],
          tag: "test-" + Date.now(), // Unique tag to ensure it always fires
        })
        .then(() => {
          logToScreen("🚀 SW: Promesa resuelta (Enviado al OS).", "success");
        })
        .catch((err) => {
          logToScreen("❌ SW Error al enviar: " + err, "error");
        });
    })
    .catch((err) => {
      logToScreen("❌ Error obteniendo registro SW: " + err, "error");
    });
}

// --- PERMISSION MODAL ---
function showPermissionModal() {
  const modal = document.getElementById("permission-modal");
  if (modal) {
    modal.classList.remove("hidden");
    // Animation trigger
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0", "scale-95");
      modal.classList.add("opacity-100", "scale-100");
    });
    safeCreateIcons();
  }
}

function closePermissionModal() {
  const modal = document.getElementById("permission-modal");
  if (modal) {
    modal.classList.remove("opacity-100", "scale-100");
    modal.classList.add("opacity-0", "scale-95");
    setTimeout(() => modal.classList.add("hidden"), 300);
  }
}

function switchPermTab(tabName) {
  const tabs = ["android-chrome", "android-app", "ios"];

  tabs.forEach((t) => {
    const content = document.getElementById(`perm-content-${t}`);
    const btn = document.getElementById(`perm-tab-${t}`);

    if (t === tabName) {
      if (content) content.classList.remove("hidden");
      if (btn) {
        btn.classList.remove("text-slate-400", "hover:bg-slate-700/50");
        btn.classList.add("bg-indigo-500", "text-white", "shadow-sm");
      }
    } else {
      if (content) content.classList.add("hidden");
      if (btn) {
        btn.classList.add("text-slate-400", "hover:bg-slate-700/50");
        btn.classList.remove("bg-indigo-500", "text-white", "shadow-sm");
      }
    }
  });
}

// Make functions global
window.closePermissionModal = closePermissionModal;
window.switchPermTab = switchPermTab;

// --- DEBUG CONSOLE LGOIC ---
function logToScreen(msg, type = "info") {
  const debugContent = document.getElementById("debug-content");
  if (!debugContent) return;

  const entry = document.createElement("div");
  const time = new Date().toLocaleTimeString();
  entry.textContent = `[${time}] ${msg}`;

  if (type === "error") entry.className = "text-red-400";
  else if (type === "success") entry.className = "text-emerald-400";
  else entry.className = "text-slate-300";

  debugContent.prepend(entry); // Newest top
}

function toggleDebug() {
  const consoleEl = document.getElementById("debug-console");
  if (consoleEl) consoleEl.classList.toggle("hidden");
}

// Override console
const originalLog = console.log;
const originalError = console.error;

console.log = function (...args) {
  originalLog.apply(console, args);
  logToScreen(args.join(" "));
};

console.error = function (...args) {
  originalError.apply(console, args);
  logToScreen(args.join(" "), "error");
};

// Make global
window.toggleDebug = toggleDebug;
window.logToScreen = logToScreen;

// Log startup
setTimeout(
  () => logToScreen("🚀 Sistema v2.1 Cargado. Listo para tests.", "success"),
  500,
);

// --- EXPORT DATA ---
const exportBtn = document.getElementById("export-data-btn");
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    const dataStr = JSON.stringify(
      {
        gymRoutineSets: JSON.parse(localStorage.getItem("gymRoutineSets")),
        gymRoutineWeights: JSON.parse(
          localStorage.getItem("gymRoutineWeights"),
        ),
        gymRoutineHistory: JSON.parse(
          localStorage.getItem("gymRoutineHistory"),
        ),
      },
      null,
      2,
    );
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup_gym_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  });
}

// --- PLATE CALCULATOR ---
function openCalculatorModal() {
  closeSidebarIfOpen();
  savedScrollY = window.scrollY; // Capture current scroll position
  const modal = document.getElementById("calculator-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Robust Mobile Scroll Lock
  document.body.style.position = "fixed";
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.width = "100%";
  document.body.classList.add("overflow-hidden");

  document.getElementById("calc-weight-input").focus();
}

function closeCalculatorModal() {
  const modal = document.getElementById("calculator-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");

  // Release Scroll Lock & Restore Position
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.classList.remove("overflow-hidden");
  window.scrollTo(0, savedScrollY);
}

function calculatePlates(val) {
  const weight = parseFloat(val);
  const input = document.getElementById("calc-weight-input");

  // Update input value if called via button
  if (input.value != weight) input.value = weight;

  const display = document.getElementById("plate-display");
  const text = document.getElementById("plate-text");

  // Reset Display
  display.innerHTML =
    '<div class="h-4 w-full bg-slate-600 absolute z-0 rounded-full"></div><span class="text-slate-600 text-xs font-bold absolute -top-4">LADO ÚNICO</span>'; // Keep bar
  text.textContent = "Barra vacía (20kg)";

  if (!weight || weight <= 20) {
    if (weight < 20 && weight > 0) text.textContent = "Menos de la barra...";
    return;
  }

  const weightPerSide = (weight - 20) / 2;
  let remaining = weightPerSide;

  const plates = [
    { w: 25, color: "bg-red-600", h: "h-32" }, // Rojo
    { w: 20, color: "bg-blue-600", h: "h-32" }, // Azul
    { w: 15, color: "bg-yellow-500", h: "h-24" }, // Amarillo
    { w: 10, color: "bg-green-600", h: "h-20" }, // Verde
    { w: 5, color: "bg-white", h: "h-14" }, // Blanco
    { w: 2.5, color: "bg-slate-400", h: "h-10" }, // Gris
    { w: 1.25, color: "bg-slate-600", h: "h-8" }, // Negro chico
  ];

  const needed = [];

  plates.forEach((p) => {
    while (remaining >= p.w) {
      needed.push(p);
      remaining -= p.w;
    }
  });

  // Render Plates
  let html =
    '<div class="h-4 w-full bg-slate-600 absolute z-0 rounded-full"></div><span class="text-slate-600 text-xs font-bold absolute -top-4">LADO ÚNICO</span>'; // Reset again to be safe

  // Center alignment wrapper
  html += '<div class="flex items-center gap-1 z-10">';

  // Bumper/Inside Collar
  html += '<div class="w-2 h-10 bg-slate-400 rounded-sm"></div>';

  needed.forEach((p) => {
    html += `<div class="${p.h} w-4 ${p.color} rounded-sm border-x border-black/20 shadow-sm" title="${p.w}kg"></div>`;
  });

  html += "</div>";

  display.innerHTML = html;

  // Update Text
  const plateText = needed.map((p) => p.w).join(" + ");
  text.innerHTML = `<span class="text-blue-400 font-bold">${weightPerSide}kg</span> por lado: [ ${plateText} ]`;
}

// Global
window.openCalculatorModal = openCalculatorModal;
window.closeCalculatorModal = closeCalculatorModal;
window.calculatePlates = calculatePlates;

// --- 1RM CALCULATOR ---
function calculate1RM() {
  const w = parseFloat(document.getElementById("rm-weight").value) || 0;
  const r = parseFloat(document.getElementById("rm-reps").value) || 0;
  const resultDisplay = document.getElementById("rm-result");

  if (w > 0 && r > 0) {
    // Epley Formula
    const oneRM = Math.round(w * (1 + r / 30));
    resultDisplay.innerHTML = `${oneRM} <span class="text-sm text-emerald-600">kg</span>`;
  } else {
    resultDisplay.innerHTML = `0 <span class="text-sm text-emerald-600">kg</span>`;
  }
}
window.calculate1RM = calculate1RM;

// --- STREAK LOGIC & DUOLINGO-STYLE GAMIFICATION ---
let currentStreakUser = "naty";

function updateGamificationUI() {
  calculateUserStreak("naty");

  // Verificar oportunidades de rescate para Naty
  setTimeout(() => {
    checkForStreakRescue("naty");
  }, 1000);

  // Update Header Duolingo-style Streak Badge
  const streakNaty = gamification.naty ? (gamification.naty.streak || 0) : 0;
  const isFire = streakNaty > 0;

  // Direct fast DOM update if element exists in index.html
  const streakCountEl = document.getElementById("header-streak-count");
  if (streakCountEl) {
    streakCountEl.textContent = streakNaty;
    streakCountEl.className = `text-sm font-black font-mono tracking-tight ${isFire ? 'text-amber-300' : 'text-slate-400'}`;
  }
  const streakIconEl = document.getElementById("header-streak-icon");
  if (streakIconEl) {
    streakIconEl.className = `w-4 h-4 ${isFire ? 'text-orange-500 fill-orange-500 animate-flame-flicker drop-shadow-[0_0_8px_rgba(249,115,22,0.9)]' : 'text-slate-600 fill-slate-700'}`;
  }

  // Update Header & Sidebar Gems Badges
  const gemsNaty = gamification.naty ? (gamification.naty.points || 0) : 0;
  const headerGemsEl = document.getElementById("header-gems-count");
  if (headerGemsEl) headerGemsEl.textContent = gemsNaty;
  const sidebarGemsEl = document.getElementById("sidebar-gems-count");
  if (sidebarGemsEl) sidebarGemsEl.textContent = gemsNaty;

  const container = document.getElementById("streak-display");
  if (container) {
    container.classList.remove("hidden");
    container.innerHTML = `
      <button onclick="openStreakModal('naty')" title="Ver racha de entrenamiento de Naty"
          class="group relative flex items-center gap-1.5 sm:gap-2.5 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 hover:from-amber-500/25 hover:to-orange-500/20 border border-amber-500/40 hover:border-amber-400/70 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95 cursor-pointer">
          <span class="text-[11px] font-extrabold uppercase tracking-wider text-violet-400 flex items-center gap-1">
              <i data-lucide="user" class="w-3.5 h-3.5"></i>
              <span>Naty</span>
          </span>
          <div class="flex items-center gap-1 pl-1.5 border-l border-slate-700/60">
              <i id="header-streak-icon" data-lucide="flame" class="w-4 h-4 ${isFire ? 'text-orange-500 fill-orange-500 animate-flame-flicker drop-shadow-[0_0_8px_rgba(249,115,22,0.9)]' : 'text-slate-600 fill-slate-700'}"></i>
              <span id="header-streak-count" class="text-sm font-black font-mono tracking-tight ${isFire ? 'text-amber-300' : 'text-slate-400'}">${streakNaty}</span>
              <span class="text-[10px] font-bold text-amber-400/80 uppercase hidden md:inline">días</span>
          </div>
      </button>`;
    safeCreateIcons();
  }
}

function openStreakModal(user) {
  closeSidebarIfOpen();
  currentStreakUser = user || (whoTrainsToday === "alma" ? "alma" : "naty");
  const userData = gamification[currentStreakUser] || { streak: 0, points: 0, freezes: 0, frozenDays: [] };
  const streak = userData.streak || 0;
  const userName = currentStreakUser === "alma" ? "Alma" : "Naty";

  const modal = document.getElementById("streak-modal");
  if (!modal) return;

  const countEl = document.getElementById("streak-modal-count");
  if (countEl) {
    countEl.innerHTML = `<i data-lucide="flame" class="w-7 h-7 text-orange-500 fill-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.9)]"></i> ${streak} ${streak === 1 ? "DÍA" : "DÍAS"}`;
  }

  const subtitleEl = document.getElementById("streak-modal-subtitle");
  if (subtitleEl) {
    subtitleEl.textContent = `Racha de entrenamiento de ${userName}`;
    subtitleEl.className = `text-xs font-bold uppercase tracking-widest ${currentStreakUser === "alma" ? "text-pink-400" : "text-amber-400"} mt-0.5`;
  }

  const pointsEl = document.getElementById("streak-modal-points");
  if (pointsEl) pointsEl.textContent = userData.points || 0;

  const freezesEl = document.getElementById("streak-modal-freezes");
  if (freezesEl) freezesEl.textContent = userData.freezes || 0;

  // Render weekly days (Lunes a Domingo of current week)
  const daysContainer = document.getElementById("streak-week-days");
  if (daysContainer) {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0=Dom, 1=Lun...
    // Calculate Monday of current week
    const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];
    let daysHtml = "";
    let trainedThisWeekCount = 0;
    const todayKey = getDateKey(today);
    let trainedToday = false;

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dKey = getDateKey(d);
      const isToday = dKey === todayKey;
      const hasTrained = trainingHistory[dKey] && trainingHistory[dKey][currentStreakUser] && !trainingHistory[dKey].deleted;
      const isFrozen = (userData.frozenDays || []).includes(dKey);

      if (hasTrained) {
        trainedThisWeekCount++;
        if (isToday) trainedToday = true;
      }

      let bubbleClass = "bg-[var(--bg-card)] border-[var(--border-strong)] text-[var(--text-dim)]";
      let iconHtml = dayLabels[i];

      if (hasTrained) {
        bubbleClass = "bg-gradient-to-t from-orange-500/30 to-amber-500/20 border-amber-500/60 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]";
        iconHtml = `<i data-lucide="check" class="w-3.5 h-3.5 text-amber-400"></i>`;
      } else if (isFrozen) {
        bubbleClass = "bg-cyan-500/20 border-cyan-500/50 text-cyan-300";
        iconHtml = `<i data-lucide="shield-check" class="w-3.5 h-3.5 text-cyan-400"></i>`;
      } else if (isToday) {
        bubbleClass = "bg-amber-500/10 border-dashed border-amber-400 text-amber-400 animate-pulse";
        iconHtml = `<i data-lucide="flame" class="w-3.5 h-3.5 text-orange-400"></i>`;
      }

      daysHtml += `
        <div class="flex flex-col items-center gap-1">
          <span class="text-[9px] font-bold ${isToday ? 'text-amber-400 font-extrabold' : 'text-[var(--text-muted)]'}">${dayLabels[i]}</span>
          <div class="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-black transition-transform ${bubbleClass}">
            ${iconHtml}
          </div>
        </div>`;
    }
    daysContainer.innerHTML = daysHtml;

    const summaryEl = document.getElementById("streak-week-summary");
    if (summaryEl) {
      summaryEl.textContent = `${trainedThisWeekCount}/4 días meta`;
    }

    // Motivational box
    const titleEl = document.getElementById("streak-motivational-title");
    const descEl = document.getElementById("streak-motivational-desc");
    if (titleEl && descEl) {
      if (trainedToday) {
        titleEl.textContent = "¡Racha a salvo por hoy!";
        descEl.textContent = "Excelente disciplina. Ya registraste tu entrenamiento de hoy. ¡A descansar y recuperar fuerzas!";
      } else if (streak > 0) {
        titleEl.textContent = `¡Mantén viva la llama de ${streak} ${streak === 1 ? 'día' : 'días'}!`;
        descEl.textContent = "No olvides completar tu sesión de hoy para seguir sumando a tu racha.";
      } else {
        titleEl.textContent = "¡Empieza tu racha hoy!";
        descEl.textContent = "Completa tu entrenamiento de hoy para encender tu primer día de racha.";
      }
    }
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  safeCreateIcons();
}

function closeStreakModal() {
  const modal = document.getElementById("streak-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function showStreakCelebration(user, newStreak) {
  const modal = document.getElementById("streak-celebration-modal");
  if (!modal) return;

  const countEl = document.getElementById("celebration-streak-count");
  if (countEl) {
    countEl.innerHTML = `🔥 ${newStreak} ${newStreak === 1 ? "DÍA" : "DÍAS"}`;
  }

  const textEl = document.getElementById("celebration-streak-text");
  if (textEl) {
    const userName = user === "alma" ? "Alma" : "Naty";
    textEl.textContent = `¡Impresionante, ${userName}! Acumulaste ${newStreak} ${newStreak === 1 ? "día seguido" : "días seguidos"} cumpliendo tu plan.`;
  }

  if (typeof triggerConfetti === "function") {
    triggerConfetti();
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  safeCreateIcons();
}

function closeStreakCelebrationModal() {
  const modal = document.getElementById("streak-celebration-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

window.openStreakModal = openStreakModal;
window.closeStreakModal = closeStreakModal;
window.showStreakCelebration = showStreakCelebration;
window.closeStreakCelebrationModal = closeStreakCelebrationModal;

function calculateUserStreak(user) {
  // Asegurar estructura de datos
  if (!gamification[user].frozenDays) gamification[user].frozenDays = [];
  if (!gamification[user].lastReset) gamification[user].lastReset = 0;

  // SCHEDULE de días requeridos por usuario
  // Naty entrena: Lunes(1), Martes(2), Miércoles(3) y Viernes(5)
  // Jueves(4), Sábado(6) y Domingo(0) son días de descanso que NO rompen la racha.
  const SCHEDULE = {
    naty: [1, 2, 3, 5], // L-M-M-V (4 días requeridos)
    alma: [1, 3, 5],
  };

  // HOTFIX: Corregir freeze erróneo del 22/01 para Naty
  if (user === "naty") {
    const badDate = "2026-01-22";
    const idx = gamification.naty.frozenDays.indexOf(badDate);
    if (idx > -1) {
      gamification.naty.frozenDays.splice(idx, 1);
      // No guardamos inmediatamente para no saturar, se guardará al final si cambió algo más
      // o la próxima vez que se persista.
    }
  }

  // 1. NORMALIZAR FECHAS DEL HISTORIAL
  const userDates = new Set();
  const lastReset = gamification[user].lastReset || 0;

  Object.keys(trainingHistory).forEach((key) => {
    // Verificar que el usuario entrenó y no está borrado
    if (trainingHistory[key][user] && !trainingHistory[key].deleted) {
      // Parsear fecha
      const ymdRegex = /^\d{4}-\d{2}-\d{2}$/;
      let dateObj;
      let normalizedKey;

      if (ymdRegex.test(key)) {
        normalizedKey = key;
        const [y, m, d] = key.split("-").map(Number);
        dateObj = new Date(y, m - 1, d);
      } else {
        dateObj = new Date(key);
        if (!isNaN(dateObj)) {
          normalizedKey = getDateKey(dateObj);
        }
      }

      // Verificar que la fecha es posterior al último reset
      if (normalizedKey && dateObj && dateObj.getTime() >= lastReset) {
        userDates.add(normalizedKey);
      }
    }
  });

  // 2. INICIALIZAR CONTADOR
  let streak = 0;
  let stateChanged = false;

  // 3. VERIFICAR SI ENTRENÓ HOY
  const today = new Date();
  const todayKey = getDateKey(today);

  if (userDates.has(todayKey)) {
    streak++; // Si entrenó hoy, la racha empieza en 1
  }

  // 4. ITERAR HACIA ATRÁS (365 días máximo)
  for (let i = 1; i < 365; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = getDateKey(d);
    const dayOfWeek = d.getDay(); // 0=Dom, 6=Sáb

    // 4a. SI ENTRENÓ: Sumar 1 a la racha
    if (userDates.has(key)) {
      streak++;
      continue;
    }

    // 4b. NO ENTRENÓ - Verificar si es fin de semana (Sáb/Dom)
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
      // ✅ FIN DE SEMANA: No rompe la racha, continuar
      continue;
    }

    // 4c. NO ENTRENÓ - Verificar si es día requerido según SCHEDULE
    const isRequired = SCHEDULE[user].includes(dayOfWeek);

    if (!isRequired) {
      // ✅ DÍA NO REQUERIDO para este usuario: No rompe la racha
      continue;
    }

    // 4d. ES DÍA REQUERIDO SIN ENTRENAMIENTO - Verificar freezes
    const alreadyFrozen = gamification[user].frozenDays.includes(key);

    if (alreadyFrozen) {
      // ✅ YA ESTABA CONGELADO: continuar sin romper racha
      continue;
    }

    // 4d. MODIFICADO: NO USAR FREEZE AUTOMÁTICAMENTE
    // Si llegamos acá, es un día requerido, no entrenado y no congelado.
    // La racha se rompe. El usuario deberá "rescatarla" manualmente si quiere.
    // La función checkForStreakRescue se encargará de ofrecer la opción.

    // ❌ ROMPER LA RACHA
    break;
  }

  // 5. GUARDAR RESULTADO
  gamification[user].streak = streak;

  if (stateChanged) {
    saveToCloud();
  }
}

// STREAK RESCUE LOGIC
let rescueTargetUser = null;
let rescueTargetDate = null;

function checkForStreakRescue(user) {
  // Solo si tiene freezes disponibles
  if (gamification[user].freezes <= 0) return;

  // Analizar solo la primera ausencia que rompió la racha
  const today = new Date();
  const todayKey = getDateKey(today);
  // Naty entrena Lunes(1), Martes(2), Miércoles(3), Viernes(5)
  const SCHEDULE = {
    naty: [1, 2, 3, 5],
    alma: [1, 3, 5],
  };

  // No repetir el aviso el mismo día
  if (gamification[user].lastRescuePromptDate === todayKey) return;

  // Buscar el último día entrenado antes de hoy
  let lastTrainingDate = null;
  Object.keys(trainingHistory).forEach((hKey) => {
    if (!trainingHistory[hKey][user] || trainingHistory[hKey].deleted) return;

    const d = new Date(hKey);
    if (isNaN(d) || d >= today) return;

    if (!lastTrainingDate || d > lastTrainingDate) {
      lastTrainingDate = d;
    }
  });

  if (!lastTrainingDate) return;

  // Encontrar el primer día requerido no entrenado después de ese último entrenamiento
  const firstMissedDate = new Date(lastTrainingDate);
  firstMissedDate.setDate(firstMissedDate.getDate() + 1);

  while (firstMissedDate < today) {
    const key = getDateKey(firstMissedDate);
    const dayOfWeek = firstMissedDate.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6 && SCHEDULE[user].includes(dayOfWeek)) {
      const alreadyFrozen = gamification[user].frozenDays.includes(key);
      const trained = !!(trainingHistory[key] && trainingHistory[key][user] && !trainingHistory[key].deleted);

      if (!trained && !alreadyFrozen) {
        const rescueDeadline = new Date(firstMissedDate);
        rescueDeadline.setDate(rescueDeadline.getDate() + 1);

        // Solo ofrecer el rescate el día inmediatamente posterior a la pérdida
        if (getDateKey(rescueDeadline) === todayKey) {
          gamification[user].lastRescuePromptDate = todayKey;
          saveToCloud();
          openRescueModal(user, key);
        }
        return;
      }
    }

    firstMissedDate.setDate(firstMissedDate.getDate() + 1);
  }
}

function openRescueModal(user, dateKey) {
  // Evitar abrir si ya está abierto o si ya declinó (podríamos guardar estado de sesión)
  if (!document.getElementById("rescue-modal").classList.contains("hidden"))
    return;

  // Si el usuario ya dijo "no" en esta sesión, no molestar (opcional, por ahora molestamos)

  rescueTargetUser = user;
  rescueTargetDate = dateKey;

  const modal = document.getElementById("rescue-modal");
  const content = document.getElementById("rescue-modal-content");
  const dateSpan = document.getElementById("rescue-date");
  const streakSpan = document.getElementById("rescue-streak-val");
  const remainingSpan = document.getElementById("rescue-remaining");

  // Formatear fecha
  const parts = dateKey.split("-");
  const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
  const options = { weekday: "long", day: "numeric", month: "long" };
  dateSpan.innerText = dateObj.toLocaleDateString("es-AR", options);

  // Deducir cuánto salvaría (Racha potencial)
  // Esto es complejo calcular sin simular. Pondremos "tu racha" genérico o el valor actual + lo perdido.
  // Simplificación: Mostramos "tu racha".
  streakSpan.innerText = "tu racha";

  remainingSpan.innerText = gamification[user].freezes;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => {
    content.classList.remove("scale-95", "opacity-0");
    content.classList.add("scale-100", "opacity-100");
  }, 10);

  // Event listener para confirmar
  const btn = document.getElementById("btn-confirm-rescue");
  btn.onclick = confirmRescue;
}

function closeRescueModal() {
  const modal = document.getElementById("rescue-modal");
  const content = document.getElementById("rescue-modal-content");

  content.classList.remove("scale-100", "opacity-100");
  content.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    rescueTargetUser = null;
    rescueTargetDate = null;
  }, 300);
}

function confirmRescue() {
  if (!rescueTargetUser || !rescueTargetDate) return;

  // 1. Descontar Freeze
  if (gamification[rescueTargetUser].freezes > 0) {
    gamification[rescueTargetUser].freezes--;

    // 2. Agregar a FrozenDays
    gamification[rescueTargetUser].frozenDays.push(rescueTargetDate);

    // 3. Guardar, Cerrar y Actualizar
    saveToCloud();

    showToast("shield-check", "text-cyan-400", "¡Racha salvada con éxito!");
    closeRescueModal();
    updateGamificationUI(); // Esto recalculará la racha considerando el nuevo frozen day
  }
}

// --- SHOP / TIENDA DE GEMAS ---
function openShopModal(user = "naty") {
  closeSidebarIfOpen();
  const modal = document.getElementById("shop-modal");
  if (!modal) return;

  const userData = gamification.naty || { points: 0, freezes: 0 };
  const gems = userData.points || 0;
  const freezes = userData.freezes || 0;

  const gemsEl = document.getElementById("shop-user-gems");
  if (gemsEl) gemsEl.textContent = gems;

  const freezesEl = document.getElementById("shop-current-freezes");
  if (freezesEl) freezesEl.textContent = freezes;

  // Update button affordability states
  const tiers = [
    { id: "shop-buy-btn-1", count: 1, cost: 300 },
    { id: "shop-buy-btn-2", count: 2, cost: 500 },
    { id: "shop-buy-btn-3", count: 3, cost: 700 },
  ];

  tiers.forEach((t) => {
    const btn = document.getElementById(t.id);
    if (!btn) return;
    if (gems < t.cost) {
      btn.classList.add("opacity-60");
      btn.title = `Te faltan ${t.cost - gems} gemas`;
    } else {
      btn.classList.remove("opacity-60");
      btn.title = "¡Comprar ahora!";
    }
  });

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  safeCreateIcons();
}

function buyFreezePack(count, cost) {
  if (!gamification.naty) gamification.naty = { points: 0, freezes: 0, streak: 0 };

  if ((gamification.naty.points || 0) >= cost) {
    gamification.naty.points -= cost;
    gamification.naty.freezes = (gamification.naty.freezes || 0) + count;

    saveToCloud();
    updateGamificationUI();
    openShopModal("naty"); // Live update in modal

    triggerConfetti();
    triggerHaptic();
    showToast("shield-check", "text-cyan-400", `¡Compraste ${count}x Protector${count > 1 ? "es" : ""} de Racha! 🛡️`);
  } else {
    triggerHaptic();
    const needed = cost - (gamification.naty.points || 0);
    showToast("ban", "text-red-400", `Gemas insuficientes. Te faltan ${needed} 💎 (tienes ${gamification.naty.points || 0})`);
  }
}

function closeShopModal() {
  const modal = document.getElementById("shop-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function buyFreeze(user) {
  buyFreezePack(1, 300);
}

window.updateGamificationUI = updateGamificationUI;
window.buyFreeze = buyFreeze;
window.buyFreezePack = buyFreezePack;
window.openShopModal = openShopModal;
window.closeShopModal = closeShopModal;
window.updateStreak = updateGamificationUI;

// ==========================================================================
// DAILY MOTIVATIONAL PLEDGE SYSTEM (680+ MANTRAS NIVEL DIOS PARA NATY)
// ==========================================================================

function getDailyMotivationQuote(dateKey) {
  const quotes = window.MOTIVATIONAL_QUOTES || [];
  if (!quotes || quotes.length === 0) {
    return "Si realmente quieres hacer algo, encontrarás una forma; si no, encontrarás una excusa.";
  }
  
  const key = dateKey || getDateKey(new Date());
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % quotes.length;
  return quotes[index];
}

function updateDailyMotivationBanner() {
  const bannerTextEl = document.getElementById("daily-motivation-banner-text");
  if (bannerTextEl) {
    const today = getDateKey(new Date());
    const quote = getDailyMotivationQuote(today);
    bannerTextEl.textContent = `"${quote}"`;
  }
}

function checkAndShowDailyMotivation() {
  updateDailyMotivationBanner();
  const today = getDateKey(new Date());
  const accepted = localStorage.getItem("natyDailyPledgeAccepted_" + today);
  
  if (!accepted) {
    openDailyMotivationModal(false);
  }
}

function openDailyMotivationModal(isManual = false) {
  closeSidebarIfOpen();
  const modal = document.getElementById("daily-motivation-modal");
  const quoteEl = document.getElementById("daily-motivation-quote-text");
  const btn = document.getElementById("accept-motivation-btn");
  
  if (!modal || !quoteEl) return;
  
  const today = getDateKey(new Date());
  const quote = getDailyMotivationQuote(today);
  
  quoteEl.textContent = quote;
  updateDailyMotivationBanner();
  
  const alreadyAccepted = localStorage.getItem("natyDailyPledgeAccepted_" + today) === "true";
  
  if (btn) {
    if (isManual && alreadyAccepted) {
      btn.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> Pacto Firmado Hoy`;
      btn.className = "w-full py-3.5 bg-[var(--bg-panel-alt)] border border-[var(--border-strong)] hover:bg-[var(--bg-card)] text-[var(--text-main)] font-bold text-sm rounded-2xl transition-all text-center cursor-pointer flex items-center justify-center gap-2";
    } else {
      btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i> Prometo darlo todo hoy`;
      btn.className = "w-full py-3.5 sm:py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-violet-500/25 active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-2";
    }
  }
  
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  safeCreateIcons();
}

function acceptDailyMotivation() {
  const modal = document.getElementById("daily-motivation-modal");
  const today = getDateKey(new Date());
  const alreadyAccepted = localStorage.getItem("natyDailyPledgeAccepted_" + today) === "true";
  
  if (!alreadyAccepted) {
    localStorage.setItem("natyDailyPledgeAccepted_" + today, "true");
    
    // Reward Naty with +10 gems for daily pledge commitment
    let currentGems = parseInt(localStorage.getItem("naty_gems_balance") || "0", 10);
    currentGems += 10;
    localStorage.setItem("naty_gems_balance", currentGems.toString());
    
    if (typeof updateGamificationUI === "function") {
      updateGamificationUI();
    }
    
    if (typeof triggerConfetti === "function") triggerConfetti();
    if (typeof triggerHaptic === "function") triggerHaptic();
    if (typeof showToast === "function") {
      showToast("check-circle", "text-emerald-400", "Pacto firmado. +10 gemas registradas.");
    }
  }
  
  if (modal) {
    modal.classList.add("opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex", "opacity-0");
    }, 300);
  }
}

window.openDailyMotivationModal = openDailyMotivationModal;
window.updateDailyMotivationBanner = updateDailyMotivationBanner;
window.acceptDailyMotivation = acceptDailyMotivation;
window.checkAndShowDailyMotivation = checkAndShowDailyMotivation;
window.getDailyMotivationQuote = getDailyMotivationQuote;

function closeHistoryDetailsModal() {
  const modal = document.getElementById("history-details-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function showExerciseHistory(exerciseName) {
  const modal = document.getElementById("history-details-modal");
  const title = document.getElementById("hist-modal-title");
  const content = document.getElementById("hist-modal-content");

  title.textContent = exerciseName;
  content.innerHTML =
    '<div class="flex justify-center p-4"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div></div>';

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Logic to find history
  setTimeout(() => {
    let historyItems = [];

    // 1. Find the Indices for this exercise to generate keys
    let targetTab = -1;
    let targetExIdx = -1;
    let setsCount = 0;
    let exerciseObj = null;

    routineData.forEach((day, tIdx) => {
      day.exercises.forEach((ex, eIdx) => {
        if (ex.name === exerciseName) {
          targetTab = tIdx;
          targetExIdx = eIdx;
          setsCount = parseInt(ex.sets) || 3;
          exerciseObj = ex;
        }
      });
    });

    if (targetTab === -1) {
      content.innerHTML =
        '<div class="text-center text-slate-500">No se encontró el ejercicio.</div>';
      return;
    }

    const repsVal = parseReps(exerciseObj ? exerciseObj.reps : "10");
    
    // First pass: Find All-Time Personal Records (PR) for this exercise using Epley 1RM
    let natyAllTimePR = 0;
    let almaAllTimePR = 0;

    // Scan today's/current session values
    for (let s = 0; s < setsCount; s++) {
      const key = `${targetTab}-${targetExIdx}-${s}`;
      const w = setWeights[key];
      if (w) {
        if (w.naty) {
          const oneRM = Math.round(parseFloat(w.naty) * (1 + repsVal / 30));
          if (oneRM > natyAllTimePR) natyAllTimePR = oneRM;
        }
        if (w.alma) {
          const oneRM = Math.round(parseFloat(w.alma) * (1 + repsVal / 30));
          if (oneRM > almaAllTimePR) almaAllTimePR = oneRM;
        }
      }
    }

    // Scan history database
    Object.keys(trainingHistory).forEach((date) => {
      const dayRecord = trainingHistory[date];
      if (!dayRecord || !dayRecord.weights) return;
      for (let s = 0; s < setsCount; s++) {
        const key = `${targetTab}-${targetExIdx}-${s}`;
        const w = dayRecord.weights[key];
        if (w) {
          if (w.naty) {
            const oneRM = Math.round(parseFloat(w.naty) * (1 + repsVal / 30));
            if (oneRM > natyAllTimePR) natyAllTimePR = oneRM;
          }
          if (w.alma) {
            const oneRM = Math.round(parseFloat(w.alma) * (1 + repsVal / 30));
            if (oneRM > almaAllTimePR) almaAllTimePR = oneRM;
          }
        }
      }
    });

    // 1.5 CHECK CURRENT SESSION (TODAY/NOW)
    let todayHasData = false;
    let todayNatyWeights = [];
    let todayAlmaWeights = [];
    let todayNatyMax1RM = 0;
    let todayAlmaMax1RM = 0;
    
    for (let s = 0; s < setsCount; s++) {
      const key = `${targetTab}-${targetExIdx}-${s}`;
      const w = setWeights[key];
      if (w) {
        if (w.naty) {
          todayNatyWeights.push(w.naty);
          todayHasData = true;
          const oneRM = Math.round(parseFloat(w.naty) * (1 + repsVal / 30));
          if (oneRM > todayNatyMax1RM) todayNatyMax1RM = oneRM;
        }
        if (w.alma) {
          todayAlmaWeights.push(w.alma);
          todayHasData = true;
          const oneRM = Math.round(parseFloat(w.alma) * (1 + repsVal / 30));
          if (oneRM > todayAlmaMax1RM) todayAlmaMax1RM = oneRM;
        }
      }
    }

    if (todayHasData) {
      historyItems.push({
        date: "Hoy (Progreso)",
        naty: todayNatyWeights.join(" - "),
        alma: todayAlmaWeights.join(" - "),
        naty1RM: todayNatyMax1RM,
        alma1RM: todayAlmaMax1RM,
        isToday: true, // Optional flag for styling
      });
    }

    // 2. Scan History
    // Sort dates descending
    const dates = Object.keys(trainingHistory).sort(
      (a, b) => new Date(b) - new Date(a),
    );

    dates.forEach((date) => {
      const dayRecord = trainingHistory[date];
      if (!dayRecord || !dayRecord.weights) return;

      // Check if we have data for this exercise
      let hasData = false;
      let natyWeights = [];
      let almaWeights = [];
      let natyMax1RM = 0;
      let almaMax1RM = 0;

      for (let s = 0; s < setsCount; s++) {
        const key = `${targetTab}-${targetExIdx}-${s}`;
        const w = dayRecord.weights[key];
        if (w) {
          if (w.naty) {
            natyWeights.push(w.naty);
            hasData = true;
            const oneRM = Math.round(parseFloat(w.naty) * (1 + repsVal / 30));
            if (oneRM > natyMax1RM) natyMax1RM = oneRM;
          }
          if (w.alma) {
            almaWeights.push(w.alma);
            hasData = true;
            const oneRM = Math.round(parseFloat(w.alma) * (1 + repsVal / 30));
            if (oneRM > almaMax1RM) almaMax1RM = oneRM;
          }
        }
      }

      if (hasData) {
        // Format Date
        // Fix: Parse manually to avoid timezone shift
        const [y, m, d] = date.split("-").map(Number);
        const dateObj = new Date(y, m - 1, d);

        const dateStr = dateObj.toLocaleDateString("es-AR", {
          day: "numeric",
          month: "short",
        });

        historyItems.push({
          date: dateStr,
          naty: natyWeights.join(" - "),
          alma: almaWeights.join(" - "),
          naty1RM: natyMax1RM,
          alma1RM: almaMax1RM,
        });
      }
    });

    // 3. Render
    if (historyItems.length === 0) {
      content.innerHTML =
        '<div class="text-center text-slate-500 py-8">No hay registros de peso anteriores para este ejercicio.</div>';
    } else {
      let html = `<div class="space-y-3">`; // Add container with spacing
      historyItems.forEach((item) => {
        // Highlight "Today" item
        const borderClass = item.isToday
          ? "border-emerald-500/50 bg-emerald-900/10"
          : "border-slate-800 bg-slate-950/50";
        const dateColor = item.isToday ? "text-emerald-400" : "text-slate-400";

        // Determine if this set is the all-time PR
        const isNatyPR = item.naty1RM > 0 && item.naty1RM === natyAllTimePR;
        const natyPRBadge = isNatyPR ? '<span class="pr-badge alltime ml-1.5"><i data-lucide="trophy" class="w-2.5 h-2.5"></i> PR</span>' : '';
        const natyPRPercent = natyAllTimePR > 0 ? Math.min(100, Math.round((item.naty1RM / natyAllTimePR) * 100)) : 0;

        const isAlmaPR = item.alma1RM > 0 && item.alma1RM === almaAllTimePR;
        const almaPRBadge = isAlmaPR ? '<span class="pr-badge alltime ml-1.5"><i data-lucide="trophy" class="w-2.5 h-2.5"></i> PR</span>' : '';
        const almaPRPercent = almaAllTimePR > 0 ? Math.min(100, Math.round((item.alma1RM / almaAllTimePR) * 100)) : 0;

        html += `
                <div class="${borderClass} p-4 rounded-xl border flex items-center justify-between transition-all shadow-[2px_2px_0_#000]">
                    <div class="${dateColor} font-bold text-sm w-20 flex flex-col gap-0.5">
                      <span>${item.date}</span>
                      <span class="text-[9px] text-slate-500 font-mono">reps: ~${repsVal}</span>
                    </div>
                    <div class="flex-1 px-2 border-l border-slate-700 ml-2 grid grid-cols-2 gap-4">
                        <div class="flex flex-col">
                            <span class="text-[10px] text-blue-500 font-bold uppercase flex items-center gap-1">Naty ${natyPRBadge}</span>
                            <span class="text-slate-200 font-mono text-sm">${item.naty || "-"}</span>
                            ${item.naty1RM ? `
                              <span class="text-[10px] text-slate-400 font-mono mt-0.5">Est. 1RM: <b>${item.naty1RM} kg</b></span>
                              <div class="pr-progress-track" title="${natyPRPercent}% de tu PR (${natyAllTimePR} kg)">
                                <div class="pr-progress-bar naty" style="width: ${natyPRPercent}%"></div>
                              </div>
                            ` : ''}
                        </div>
                        <div class="flex flex-col">
                            <span class="text-[10px] text-pink-500 font-bold uppercase flex items-center gap-1">Alma ${almaPRBadge}</span>
                            <span class="text-slate-200 font-mono text-sm">${item.alma || "-"}</span>
                            ${item.alma1RM ? `
                              <span class="text-[10px] text-slate-400 font-mono mt-0.5">Est. 1RM: <b>${item.alma1RM} kg</b></span>
                              <div class="pr-progress-track" title="${almaPRPercent}% de tu PR (${almaAllTimePR} kg)">
                                <div class="pr-progress-bar alma" style="width: ${almaPRPercent}%"></div>
                              </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
      });
      html += `</div>`;
      content.innerHTML = html;
      safeCreateIcons();
    }
  }, 100); // Small delay for rendering
}

// Global
window.closeHistoryDetailsModal = closeHistoryDetailsModal;
window.showExerciseHistory = showExerciseHistory;

// --- MUSCLE MAP MODAL ---
function openMuscleMapModal(primary, secondary) {
  const modal = document.getElementById("muscle-map-modal");
  const container = document.getElementById("muscle-map-large-container");

  if (!modal || !container) return;

  // Fix Mobile Scrolling Clipping:
  // Remove vertical centering on mobile so tall content starts at top and flows down.
  // Keep centering on desktop where it fits side-by-side.
  container.classList.remove("items-center");
  container.classList.add("items-start", "md:items-center");

  // Reuse the SVG generation Logic
  const svgHTML = getMuscleMapSVG(primary, secondary);

  // Inject
  container.innerHTML = svgHTML;

  // Tweak styles for full size inside modal
  // We need to target the container div returned by getMuscleMapSVG
  const wrapper = container.firstElementChild;
  if (wrapper) {
    // Remove the restrictive height classes from the small view
    wrapper.classList.remove("h-56", "gap-2", "py-2");

    // Add classes for the large view: Responsive Layout
    // Mobile: Flex-col (stacked), nice and wide
    // Desktop: Flex-row (side-by-side), constrained by height
    wrapper.classList.add(
      "flex-col",
      "md:flex-row",
      "gap-6",
      "items-center",
      "justify-center",
      "p-0",
      "w-full",
      "h-auto",
      "md:h-full",
    );

    // Target the SVGs inside to ensure they scale
    const svgs = wrapper.querySelectorAll("svg");
    svgs.forEach((svg) => {
      svg.classList.remove("drop-shadow-md");

      // Responsive constraints
      svg.classList.remove("h-full", "w-auto"); // clean old style
      svg.classList.add(
        "drop-shadow-2xl",
        "w-[85%]", // Mobile: 85% width
        "md:w-auto", // Desktop: Width auto
        "h-auto", // Mobile: Height auto
        "md:h-[95%]", // Desktop: almost full height
      );

      svg.removeAttribute("viewBox");
      svg.setAttribute("viewBox", "0 0 400 780"); // Match the Atlas coordinate system
    });
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeMuscleMapModal() {
  const modal = document.getElementById("muscle-map-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Ensure global scope access
window.openMuscleMapModal = openMuscleMapModal;
window.closeMuscleMapModal = closeMuscleMapModal;

// --- MANUAL HISTORICAL DATA ENTRY ---
// Use this function from the browser console to add past training days
// It uses the weights you currently have in the routine inputs!
// Example: addHistoricalTraining("2026-01-14", "both")
// Parameters:
//   date: "YYYY-MM-DD" format
//   who: "naty", "alma", or "both"
function addHistoricalTraining(date, who) {
  if (!date || !who) {
    console.error(
      "Usage: addHistoricalTraining('2026-01-14', 'naty'|'alma'|'both')",
    );
    return;
  }

  // Get current weights from localStorage (the ones you've filled in today)
  const currentWeights =
    JSON.parse(localStorage.getItem("gymRoutineWeights")) || {};

  if (Object.keys(currentWeights).length === 0) {
    console.warn(
      "⚠️ No hay pesos guardados. Primero cargá tus pesos en la rutina de hoy y volvé a ejecutar.",
    );
    return;
  }

  if (!trainingHistory[date]) {
    trainingHistory[date] = { alma: false, naty: false, weights: {} };
  }

  if (who === "naty" || who === "both") {
    trainingHistory[date].naty = true;
  }
  if (who === "alma" || who === "both") {
    trainingHistory[date].alma = true;
  }

  // Copy current weights to this historical date
  Object.keys(currentWeights).forEach((key) => {
    if (!trainingHistory[date].weights[key]) {
      trainingHistory[date].weights[key] = {};
    }

    if ((who === "naty" || who === "both") && currentWeights[key].naty) {
      trainingHistory[date].weights[key].naty = currentWeights[key].naty;
    }
    if ((who === "alma" || who === "both") && currentWeights[key].alma) {
      trainingHistory[date].weights[key].alma = currentWeights[key].alma;
    }
  });

  localStorage.setItem("gymTrainingHistory", JSON.stringify(trainingHistory));

  // Calculate volume for confirmation
  let volNaty = 0,
    volAlma = 0;
  Object.values(trainingHistory[date].weights).forEach((w) => {
    volNaty += (parseInt(w.naty) || 0) * 10;
    volAlma += (parseInt(w.alma) || 0) * 10;
  });

  const volMsg =
    who === "both"
      ? `Naty: ${volNaty}kg, Alma: ${volAlma}kg`
      : who === "naty"
        ? `${volNaty}kg`
        : `${volAlma}kg`;
  console.log(
    `✅ Entrenamiento añadido: ${date} (${who}) - Volumen: ${volMsg}`,
  );

  // Refresh UI if on relevant views
  if (currentView === "history") renderCalendar();
  if (currentView === "stats") renderCharts();
}

// Bulk add helper - adds multiple days at once using current weights
// Example: addBulkHistory(["2026-01-08", "2026-01-09", "2026-01-12"], "both")
function addBulkHistory(dates, who) {
  if (!Array.isArray(dates)) {
    console.error(
      "Usage: addBulkHistory(['2026-01-08', '2026-01-09'], 'both')",
    );
    return;
  }
  dates.forEach((date) => addHistoricalTraining(date, who));
  console.log(`\n✅ ${dates.length} entrenamientos añadidos para ${who}`);
}

window.addHistoricalTraining = addHistoricalTraining;
window.addBulkHistory = addBulkHistory;

// Init App

// --- ACHIEVEMENTS RENDER & LOGIC ---

let currentAchievementFilter = "Todos";

function filterAchievements(tier) {
  currentAchievementFilter = tier;

  // Update Buttons UI
  const buttons = document.querySelectorAll("#achievements-filter-tabs button");
  buttons.forEach((btn) => {
    if (btn.textContent.trim() === tier) {
      btn.className =
        "px-4 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 font-bold text-sm whitespace-nowrap active-filter shadow-md shadow-slate-900/50";
      // Tint based on tier
      if (tier === "Común") btn.classList.add("text-slate-200");
      if (tier === "Raro")
        btn.classList.add("text-blue-400", "border-blue-500/30");
      if (tier === "Épico")
        btn.classList.add("text-purple-400", "border-purple-500/30");
      if (tier === "Legendario")
        btn.classList.add("text-fuchsia-400", "border-fuchsia-500/30");
    } else {
      btn.className =
        "px-4 py-2 rounded-xl bg-slate-900 text-slate-500 border border-slate-800 font-medium text-sm whitespace-nowrap hover:bg-slate-800 transition-colors";
    }
  });

  renderAchievements();
}

function renderAchievements() {
  const container = document.getElementById("achievements-grid");
  if (!container) return;
  container.innerHTML = "";

  const countBadge = document.getElementById("total-achievements-count");
  const unlockedNaty = (gamification?.naty?.achievements) || [];

  if (countBadge) {
    countBadge.textContent = `${unlockedNaty.length} / ${achievementsConfig.length}`;
  }

  // Filter
  let filtered = achievementsConfig;
  if (currentAchievementFilter !== "Todos") {
    filtered = achievementsConfig.filter(
      (a) => a.tier === currentAchievementFilter,
    );
  }

  filtered.forEach((ach) => {
    const isUnlocked = unlockedNaty.includes(ach.id);

    let borderClass = "border-slate-800";
    let bgClass = "bg-slate-900";
    let iconColor = "text-slate-600";
    let opacity = "opacity-50 grayscale";

    if (isUnlocked) {
      opacity = "opacity-100";
      switch (ach.tier) {
        case "Común":
          borderClass = "border-slate-600";
          iconColor = "text-slate-400";
          break;
        case "Raro":
          borderClass = "border-blue-500/50";
          bgClass = "bg-blue-900/10";
          iconColor = "text-blue-400";
          break;
        case "Épico":
          borderClass = "border-purple-500/50";
          bgClass = "bg-purple-900/10";
          iconColor = "text-purple-400";
          break;
        case "Legendario":
          borderClass = "border-fuchsia-500/50";
          bgClass = "bg-fuchsia-900/10";
          iconColor = "text-fuchsia-400";
          break;
      }
    }

    const html = `
      <div class="relative p-4 rounded-2xl border ${borderClass} ${bgClass} flex flex-col items-center text-center transition-all duration-300 ${opacity} hover:scale-[1.02]">
          ${isUnlocked ? `<div class="absolute top-2 right-2 text-[10px] uppercase font-bold tracking-wider ${iconColor}">${ach.tier}</div>` : ""}
          
          <div class="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center mb-3 border border-slate-800">
             <i data-lucide="${ach.icon}" class="w-6 h-6 ${isUnlocked ? iconColor : "text-slate-700"}"></i>
          </div>
          
          <h3 class="font-bold text-white text-sm mb-1 line-clamp-1" title="${ach.title}">${ach.title}</h3>
          <p class="text-xs text-slate-500 line-clamp-2 leading-tight mb-3">${ach.desc}</p>
          
          <div class="mt-auto w-full flex items-center justify-center pt-2 border-t border-slate-800/60">
             ${isUnlocked 
               ? `<span class="text-[11px] font-bold text-emerald-400 flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Desbloqueado</span>`
               : `<span class="text-[11px] font-bold text-slate-600 flex items-center gap-1"><i data-lucide="lock" class="w-3.5 h-3.5"></i> Bloqueado</span>`
             }
          </div>
      </div>
    `;
    container.innerHTML += html;
  });

  safeCreateIcons();
}

window.filterAchievements = filterAchievements;
window.renderAchievements = renderAchievements;

// Init App
onReady(() => {
  const achievementsBtn = Array.from(document.querySelectorAll("button")).find(
    (b) => b.textContent.includes("Logros"),
  );
  if (achievementsBtn) {
    achievementsBtn.addEventListener("click", () => {
      setTimeout(renderAchievements, 100); // Small delay to ensure view visible
    });
  }
  init();
});

// --- FIX V6: CORRECT STREAK (SAFE MODE) ---
setTimeout(() => {
  try {
    console.log("🛡️ Running Fix V6...");
    const interval = setInterval(() => {
      attemptFix();
    }, 2000); // Check every 2 seconds

    // Stop checking after 8 seconds
    setTimeout(() => clearInterval(interval), 8000);
  } catch (e) {
    console.error("Fix v6 error:", e);
  }
}, 1500);

// --- REAL WEATHER IMPLEMENTATION ---

function initWeather() {
  const weatherElements = {
    headerTemp: document.getElementById("weather-temp-header"),
    sidebarTemp: document.getElementById("sidebar-temp"),
    headerContainer: document.getElementById("header-weather"),
    sidebarContainer: document.getElementById("sidebar-weather"),
  };

  if (!navigator.geolocation) {
    console.log("Geolocalización no soportada por el navegador.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude, weatherElements);
    },
    (error) => {
      console.warn("Permiso de ubicación denegado o error:", error);
      // Fallback opcional o dejar oculto
    },
    { timeout: 10000 },
  );
}

async function fetchWeather(lat, lon, elements) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    );

    if (!response.ok) throw new Error("Error en API de clima");

    const data = await response.json();
    const temp = Math.round(data.current_weather.temperature);

    updateWeatherUI(`${temp}°C`, elements);
    console.log(`🌤️ Clima actualizado: ${temp}°C (${lat}, ${lon})`);
  } catch (error) {
    console.error("Error obteniendo datos del clima:", error);
  }
}

function updateWeatherUI(tempText, elements) {
  // Actualizar Header
  if (elements.headerTemp) elements.headerTemp.textContent = tempText;
  if (elements.headerContainer) {
    elements.headerContainer.classList.remove("hidden");
    elements.headerContainer.classList.add("flex");
  }

  // Actualizar Sidebar
  if (elements.sidebarTemp) elements.sidebarTemp.textContent = tempText;
  if (elements.sidebarContainer) {
    elements.sidebarContainer.classList.remove("hidden");
    elements.sidebarContainer.classList.add("flex");
  }
}

// Legacy splash screen logic removed in favor of unified init()

// --- MULTIPLE ROUTINES MANAGER FUNCTIONS ---

function openRoutinesManagerModal() {
  closeSidebarIfOpen();
  const modal = document.getElementById("routines-manager-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    try {
      renderRoutinesList();
    } catch (error) {
      console.error("Error rendering routines list:", error);
      const container = document.getElementById("routines-list-container");
      if (container) {
        container.innerHTML = `
          <div class="p-4 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200 text-sm">
            No se pudo cargar la lista de rutinas. Recargá la app o revisá los datos guardados.
          </div>
        `;
      }
    }
  }
}

function closeRoutinesManagerModal() {
  const modal = document.getElementById("routines-manager-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function renderRoutinesList() {
  const container = document.getElementById("routines-list-container");
  if (!container) return;
  
  container.innerHTML = "";
  const normalizedRoutines = Array.isArray(routinesList)
    ? routinesList.filter(r => r && r.id && r.data)
    : [];

  if (!normalizedRoutines.length) {
    container.innerHTML = `
      <div class="p-4 rounded-xl border border-slate-700 bg-slate-900 text-slate-400 text-sm">
        No hay rutinas guardadas.
      </div>
    `;
    return;
  }

  const sortedRoutines = [...normalizedRoutines].sort((a, b) => {
    if (a.isBase && !b.isBase) return -1;
    if (!a.isBase && b.isBase) return 1;
    return 0;
  });
  
  sortedRoutines.forEach((routine) => {
    const isActive = routine.id === activeRoutineId;
    const isBase = !!routine.isBase;
    
    const card = document.createElement("div");
    card.className = `p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
      isActive 
        ? "bg-[var(--bg-input)] border-cyan-500 shadow-md ring-1 ring-cyan-500/20" 
        : "bg-[var(--bg-panel-alt)] border-[var(--border-strong)] hover:bg-[var(--bg-card)]"
    }`;
    
    // Left: Active state radio & Name
    const leftSec = document.createElement("div");
    leftSec.className = "flex items-center gap-3 cursor-pointer flex-1 min-w-0";
    leftSec.onclick = () => selectActiveRoutine(routine.id);
    
    const radio = document.createElement("div");
    radio.className = `w-5 h-5 rounded-full flex items-center justify-center border flex-shrink-0 transition-all ${
      isActive 
        ? "border-cyan-500 bg-cyan-950 text-cyan-400" 
        : "border-slate-500 bg-slate-950"
    }`;
    if (isActive) {
      radio.innerHTML = '<div class="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>';
    }
    
    const nameSpan = document.createElement("span");
    nameSpan.className = `font-semibold truncate text-sm ${isActive ? "text-white" : "text-slate-300"}`;
    nameSpan.textContent = routine.name;

    if (isBase) {
      const baseBadge = document.createElement("span");
      baseBadge.className = "ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      baseBadge.textContent = "Base";
      const nameWrap = document.createElement("div");
      nameWrap.className = "flex items-center min-w-0";
      nameWrap.appendChild(nameSpan);
      nameWrap.appendChild(baseBadge);
      leftSec.appendChild(radio);
      leftSec.appendChild(nameWrap);
    } else {
      leftSec.appendChild(radio);
      leftSec.appendChild(nameSpan);
    }
    
    // Right: Action buttons (Rename, Delete)
    const rightSec = document.createElement("div");
    rightSec.className = "flex items-center gap-2 flex-shrink-0";
    
    // Rename button
    const renameBtn = document.createElement("button");
    renameBtn.className = "p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-all active:scale-90";
    renameBtn.title = "Renombrar";
    renameBtn.innerHTML = '<i data-lucide="edit-2" class="w-4 h-4"></i>';
    renameBtn.onclick = (e) => {
      e.stopPropagation();
      renameRoutine(routine.id);
    };
    if (isBase) {
      renameBtn.disabled = true;
      renameBtn.classList.add("opacity-30", "cursor-not-allowed");
    }
    
    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = `p-2 rounded-lg transition-all active:scale-90 ${
      isActive || routinesList.length <= 1 || isBase
        ? "bg-slate-850 text-slate-650 cursor-not-allowed opacity-30"
        : "bg-slate-800 hover:bg-red-950/40 hover:text-red-400 text-slate-400"
    }`;

    if (isBase) {
      const baseAction = document.createElement("button");
      baseAction.className = "mb-3 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95";
      baseAction.textContent = "Volver a Rutina Base";
      baseAction.onclick = (e) => {
        e.stopPropagation();
        selectBaseRoutine();
        closeRoutinesManagerModal();
      };
      card.style.flexDirection = "column";
      card.style.alignItems = "stretch";
      card.style.gap = "0.75rem";
      card.appendChild(baseAction);
    }
    deleteBtn.title = "Eliminar";
    deleteBtn.innerHTML = '<i data-lucide="trash-2" class="w-4 h-4"></i>';
    if (!isActive && routinesList.length > 1 && !isBase) {
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteRoutine(routine.id);
      };
    } else {
      deleteBtn.disabled = true;
    }
    
    rightSec.appendChild(renameBtn);
    rightSec.appendChild(deleteBtn);
    
    card.appendChild(leftSec);
    card.appendChild(rightSec);
    
    container.appendChild(card);
  });
  
  safeCreateIcons();
}

function selectActiveRoutine(id) {
  const targetRoutine = routinesList.find(r => r.id === id);
  if (!targetRoutine) {
    console.warn("Routine not found:", id);
    return;
  }

  activeRoutineId = id;
  localStorage.setItem("vitalActiveRoutineId", id);
  
  // Set routineData global variable
  const activeRoutine = targetRoutine || routinesList[0];
  routineData = activeRoutine.data;
  
  // Reload weights and completed sets
  loadActiveRoutineState();
  
  // Re-render routines list
  renderRoutinesList();
  
  // Re-render tabs and training content
  renderTabs();
  renderContent();
  
  // Show toast/log
  logToScreen(`Rutina activa: "${activeRoutine.name}"`, "success");
  scheduleCloudSync();
}

function selectBaseRoutine() {
  selectActiveRoutine("routine-1");
}

function renameRoutine(id) {
  const routine = routinesList.find(r => r.id === id);
  if (!routine) return;
  
  const newName = prompt("Ingresa el nuevo nombre para la rutina:", routine.name);
  if (newName === null) return; // cancelled
  const trimmed = newName.trim();
  if (trimmed === "") {
    alert("El nombre de la rutina no puede estar vacío.");
    return;
  }
  
  routine.name = trimmed;
  localStorage.setItem("vitalRoutinesList", JSON.stringify(routinesList));
  renderRoutinesList();
  logToScreen(`Rutina renombrada a "${trimmed}"`, "success");
}

function deleteRoutine(id) {
  if (id === activeRoutineId) {
    alert("No puedes borrar la rutina que está activa.");
    return;
  }
  const routine = routinesList.find(r => r.id === id);
  if (routine?.isBase) {
    alert("No puedes borrar la rutina base.");
    return;
  }
  if (routinesList.length <= 1) {
    alert("Debes tener al menos una rutina guardada.");
    return;
  }
  if (!routine) return;
  
  showConfirmModal(
    "¿Eliminar Rutina?",
    `¿Estás seguro de que quieres eliminar la rutina "${routine.name}"? Esta acción no se puede deshacer y borrará sus pesos registrados.`,
    () => {
      routinesList = routinesList.filter(r => r.id !== id);
      localStorage.setItem("vitalRoutinesList", JSON.stringify(routinesList));
      
      // Clean up localstorage sets & weights for that routine
      localStorage.removeItem("gymRoutineSets_" + id);
      localStorage.removeItem("gymRoutineWeights_" + id);

      scheduleCloudSync();
      
      renderRoutinesList();
      logToScreen(`Rutina "${routine.name}" eliminada.`, "success");
    }
  );
}

// --- AI ROUTINE GENERATOR CHAT FUNCTIONS ---

let chatMessages = [];

function initAIChat() {
  const container = document.getElementById("ai-chat-messages");
  if (!container) return;
  
  // Clear chat
  container.innerHTML = "";
  chatMessages = [];
  
  const welcomeText = `¡Hola, Ing. Rodriguez! Soy **Coach Vital**, tu entrenador personal con IA.

Estoy listo para armar tu rutina especializada y llevar tus entrenamientos al siguiente nivel. Para diseñarla a tu medida, por favor cuéntame:

1. **¿Para quién es la rutina?** (¿Solo Naty, solo Alma, o entrenan juntos?)
2. **¿Cuántos días por semana** pueden entrenar?
3. **¿Cuál es su objetivo físico** principal? (Fuerza, hipertrofia, tonificación, pérdida de grasa)
4. **¿Tienen alguna limitación, lesión o preferencia** de ejercicios?
5. Si quieren aportar peso, altura u otros detalles, ¡adelante!

¿Comenzamos?`;

  addChatMessage("assistant", welcomeText);
}

function resetAIChat() {
  chatMessages = [];
  const container = document.getElementById("ai-chat-messages");
  if (container) container.innerHTML = "";
  initAIChat();
}

function addChatMessage(sender, text) {
  const container = document.getElementById("ai-chat-messages");
  if (!container) return;
  
  const bubble = document.createElement("div");
  bubble.className = `flex gap-3 max-w-[85%] mb-4 ${sender === "user" ? "self-end flex-row-reverse" : "self-start"}`;
  
  const iconBg = sender === "user" ? "bg-slate-700" : "bg-emerald-500/10 border border-emerald-500/20";
  const iconColor = sender === "user" ? "text-slate-300" : "text-emerald-400";
  const iconName = sender === "user" ? "user" : "sparkles";
  
  const bubbleContent = document.createElement("div");
  bubbleContent.className = `p-4 rounded-2xl text-sm leading-relaxed ${
    sender === "user" 
      ? "bg-blue-600 text-white rounded-tr-none shadow-md" 
      : "bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none shadow-sm"
  }`;
  
  // Format text: Convert markdown-like syntax to HTML safely
  let formattedText = escapeHTML(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\`([^`\n]+)\`/g, '<code class="bg-slate-950 px-1 py-0.5 rounded text-cyan-400 font-mono text-xs">$1</code>')
    .replace(/\n/g, '<br>');
    
  // Check if assistant sent a JSON routine block
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  let parsedRoutine = null;
  
  if (jsonMatch) {
    try {
      parsedRoutine = JSON.parse(jsonMatch[1]);
      // Exclude JSON code block from rendering in standard message text
      const startIdx = text.indexOf("```json");
      const endIdx = text.indexOf("```", startIdx + 7);
      if (startIdx !== -1 && endIdx !== -1) {
        const rawTextBefore = text.substring(0, startIdx);
        const rawTextAfter = text.substring(endIdx + 3);
        formattedText = (escapeHTML(rawTextBefore) + escapeHTML(rawTextAfter))
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\`([^`\n]+)\`/g, '<code class="bg-slate-950 px-1 py-0.5 rounded text-cyan-400 font-mono text-xs">$1</code>')
          .replace(/\n/g, '<br>');
      }
    } catch (e) {
      console.error("Error parsing routine JSON:", e);
    }
  }
  
  bubbleContent.innerHTML = formattedText;
  
  // Apply button container
  if (parsedRoutine) {
    const applyContainer = document.createElement("div");
    applyContainer.className = "mt-4 p-3 bg-slate-950/60 border border-slate-700/60 rounded-xl flex flex-col gap-2 items-start";
    
    const infoText = document.createElement("span");
    infoText.className = "text-xs text-slate-400";
    infoText.textContent = "Coach Vital ha generado una rutina personalizada. ¿Quieres guardarla y aplicarla?";
    
    const applyBtn = document.createElement("button");
    applyBtn.className = "px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all active:scale-95";
    applyBtn.innerHTML = '<i data-lucide="check-circle" class="w-3.5 h-3.5"></i> APLICAR RUTINA';
    applyBtn.onclick = () => applyGeneratedRoutine(parsedRoutine);
    
    applyContainer.appendChild(infoText);
    applyContainer.appendChild(applyBtn);
    bubbleContent.appendChild(applyContainer);
  }
  
  bubble.innerHTML = `
    <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}">
      <i data-lucide="${iconName}" class="w-4 h-4"></i>
    </div>
  `;
  bubble.appendChild(bubbleContent);
  container.appendChild(bubble);
  
  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
  safeCreateIcons();
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestGeminiText(apiKey, contents) {
  const models = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
  ];

  let lastError = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
              },
            }),
          },
        );

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const message = errData?.error?.message || `Error del servidor (${response.status})`;
          const isBusy =
            response.status === 429 ||
            response.status === 503 ||
            /high demand|quota|temporarily unavailable|busy/i.test(message);

          if (isBusy && attempt === 0) {
            lastError = new Error(message);
            await sleep(1500);
            continue;
          }

          if (isBusy && model !== models[models.length - 1]) {
            lastError = new Error(message);
            await sleep(1000);
            break;
          }

          throw new Error(message);
        }

        const resData = await response.json();
        const aiText = resData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
          throw new Error("No se recibió respuesta válida de Coach Vital.");
        }

        return aiText;
      } catch (error) {
        lastError = error;
        if (attempt === 0 && model !== models[models.length - 1]) {
          await sleep(1000);
          continue;
        }
        break;
      }
    }
  }

  throw lastError || new Error("No se pudo consultar a Gemini.");
}

async function sendAIChatMessage() {
  const inputEl = document.getElementById("ai-chat-input");
  if (!inputEl) return;
  
  const text = inputEl.value.trim();
  if (!text) return;
  
  // Clear input
  inputEl.value = "";
  
  // Add user message
  addChatMessage("user", text);
  chatMessages.push({ role: "user", content: text });
  
  // Get API Key
  const apiKey = localStorage.getItem("gymGeminiApiKey");
  if (!apiKey) {
    addChatMessage("assistant", "**Clave API de Gemini no configurada.** Por favor, ve al menú lateral, abre tu Perfil (icono de engranaje arriba) e introduce una API Key válida de Gemini para poder hablar conmigo y armar la rutina.");
    return;
  }
  
  // Add loader
  const container = document.getElementById("ai-chat-messages");
  const loader = document.createElement("div");
  loader.id = "ai-chat-loader";
  loader.className = "flex gap-2 items-center p-3 bg-slate-900 border border-slate-800 text-slate-400 text-xs rounded-xl self-start max-w-[80%] mb-4";
  loader.innerHTML = `
    <div class="flex space-x-1">
      <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
      <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      <div class="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.3s"></div>
    </div>
    <span>Coach Vital está analizando...</span>
  `;
  container.appendChild(loader);
  container.scrollTop = container.scrollHeight;
  
  try {
    const systemPrompt = `Eres Coach Vital, un entrenador personal legendario con miles de certificaciones en cambio físico, ganancia de masa muscular y pérdida de grasa.
Llamas siempre "Ing. Rodriguez" al usuario Naty (él y su novia Alma entrenarán). Sé muy motivador, profesional y directo.

Tu objetivo es hacerle preguntas al usuario (de manera concisa) para recopilar los siguientes datos necesarios:
1. Para quién es la rutina (Naty, Alma o ambos juntos).
2. Días disponibles para entrenar (de 1 a 5 días).
3. Objetivo físico (hipertrofia, definición, fuerza, etc.).
4. Si tienen alguna lesión o limitación.

Una vez que tengas TODOS los datos necesarios, diseña la rutina de entrenamiento completa.
IMPORTANTE: Debes presentar la rutina respondiendo con tu explicación y al final incluir un bloque de código JSON con formato \`\`\`json [JSON_DATA] \`\`\` que represente la rutina completa estructurada.
El JSON DEBE seguir este esquema exacto para poder integrarse en la aplicación:
[
  {
    "day": "Lunes",
    "title": "Enfoque del Día (ej: Pierna y Glúteo)",
    "exercises": [
      {
        "name": "Nombre del Ejercicio",
        "sets": "Número de series (ej: 3)",
        "reps": "Número de repeticiones (ej: 10-12)",
        "rir": "RIR (ej: RIR 2)",
        "notes": "Detalles del ejercicio, consejos de técnica y tiempo de descanso (ej: Descanso: 2 min)",
        "muscles": {
          "primary": ["quads", "glutes", "hamstrings", "calves", "chest", "back", "shoulders", "biceps", "triceps", "abs", "adductors", "lower_back"],
          "secondary": ["quads", "glutes", "hamstrings", "calves", "chest", "back", "shoulders", "biceps", "triceps", "abs", "adductors", "lower_back"]
        }
      }
    ]
  }
]
Asegúrate de que los músculos primarios y secundarios estén elegidos de la lista válida anterior (todo en minúsculas y sin acentos).
No inventes propiedades adicionales en el JSON. No uses bloques adicionales de formato aparte de \`\`\`json.`;

    const contents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      }
    ];
    
    // Add chat history
    chatMessages.forEach(msg => {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      });
    });

    loader.remove();

    const aiText = await requestGeminiText(apiKey, contents);
    
    addChatMessage("assistant", aiText);
    chatMessages.push({ role: "assistant", content: aiText });
    
  } catch (error) {
    loader.remove();
    console.error("Gemini API Error:", error);
    const isBusy = /high demand|quota|temporarily unavailable|busy|429|503/i.test(error.message || "");
    addChatMessage(
      "assistant",
      isBusy
        ? "**Coach Vital está saturado ahora mismo.** Probá de nuevo en unos segundos; ya intenté con modelos alternativos automáticamente."
        : `**Error al consultar a Coach Vital:** ${error.message}. No parece ser tu clave API; probá de nuevo en unos segundos.`,
    );
  }
}

function selectAIChatChip(text) {
  const inputEl = document.getElementById("ai-chat-input");
  if (inputEl) {
    inputEl.value = text;
    sendAIChatMessage();
  }
}

function applyGeneratedRoutine(routineDataArray) {
  showConfirmModal(
    "¿Guardar y Aplicar Rutina?",
    "Esto guardará la rutina diseñada por Coach Vital como una nueva rutina disponible. Podrás cambiar entre tus rutinas en cualquier momento.",
    () => {
      const newIndex = routinesList.filter(r => !r.isBase).length + 2;
      const lastUserMessage = [...chatMessages].reverse().find(m => m.role === "user")?.content || "";
      const routineFocus = getRoutineFocusName(lastUserMessage);
      const newRoutine = {
        id: `routine-${Date.now()}`,
        name: `Rutina ${newIndex} - ${routineFocus}`,
        data: routineDataArray,
        isBase: false,
      };
      
      routinesList.push(newRoutine);
      localStorage.setItem("vitalRoutinesList", JSON.stringify(routinesList));

      scheduleCloudSync();
      
      // Select it immediately
      selectActiveRoutine(newRoutine.id);
      
      // Navigate to main routine view
      navigateTo("routine");
      
      logToScreen(`¡Rutina "${newRoutine.name}" guardada y aplicada con éxito!`, "success");
    }
  );
}

function getRoutineFocusName(text) {
  const normalized = (text || "").toLowerCase();

  if (/fuerza|powerlifting|potencia/.test(normalized)) return "Fuerza";
  if (/hipertrofia|masa muscular|volumen|ganar musculo|ganar masa/.test(normalized)) return "Hipertrofia";
  if (/definici[oó]n|perdida de grasa|p[eé]rdida de grasa|bajar de peso|quema grasa/.test(normalized)) return "Definicion";
  if (/gl[uú]te|pierna|legs/.test(normalized)) return "Pierna";
  if (/full body|cuerpo completo/.test(normalized)) return "Full Body";
  if (/torso/.test(normalized)) return "Torso";

  return "Personalizada";
}

// Wire up global variables so that elements inline events can call them
window.openRoutinesManagerModal = openRoutinesManagerModal;
window.closeRoutinesManagerModal = closeRoutinesManagerModal;
window.selectActiveRoutine = selectActiveRoutine;
window.selectBaseRoutine = selectBaseRoutine;
window.renameRoutine = renameRoutine;
window.deleteRoutine = deleteRoutine;
window.sendAIChatMessage = sendAIChatMessage;
window.selectAIChatChip = selectAIChatChip;
window.applyGeneratedRoutine = applyGeneratedRoutine;
window.resetAIChat = resetAIChat;

// Enter key submit on AI chat input (textarea)
onReady(() => {
  const inputEl = document.getElementById("ai-chat-input");
  if (inputEl) {
    // Auto-resize textarea as user types
    inputEl.addEventListener("input", () => {
      inputEl.style.height = "auto";
      inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + "px";
    });

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendAIChatMessage();
        // Reset height after sending
        inputEl.style.height = "auto";
      }
      // Shift+Enter: default behavior (inserts newline in textarea)
    });
  }
});

// ==========================================================================
// ACTIVE SESSION STOPWATCH & VOLUME TRACKER LOGIC
// ==========================================================================
let sessionStartTime = null;
let sessionElapsedSeconds = 0;
let sessionTimerInterval = null;
let isSessionTimerRunning = false;

function formatStopwatchTime(totalSeconds) {
  const safeSecs = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safeSecs / 3600);
  const mins = Math.floor((safeSecs % 3600) / 60);
  const secs = safeSecs % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function updateStopwatchUI() {
  const displayEl = document.getElementById("session-stopwatch-display") || document.getElementById("session-stopwatch");
  if (!displayEl) return;
  
  let currentElapsed = sessionElapsedSeconds;
  if (isSessionTimerRunning && sessionStartTime) {
    const diffSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    currentElapsed = sessionElapsedSeconds + Math.max(0, diffSeconds);
  }
  
  displayEl.textContent = formatStopwatchTime(currentElapsed);
}

function initSessionStopwatch() {
  const savedStartTime = localStorage.getItem("vigor_sessionStartTime");
  const savedElapsed = localStorage.getItem("vigor_sessionElapsedSeconds");
  const savedRunning = localStorage.getItem("vigor_sessionTimerRunning");

  sessionElapsedSeconds = parseInt(savedElapsed || "0");

  if (savedRunning === "true" && savedStartTime) {
    sessionStartTime = parseInt(savedStartTime);
    isSessionTimerRunning = true;
    
    if (sessionTimerInterval) clearInterval(sessionTimerInterval);
    sessionTimerInterval = setInterval(() => {
      updateStopwatchUI();
    }, 1000);
  } else {
    isSessionTimerRunning = false;
  }

  updateStopwatchUI();
  updateStopwatchControls();
}

function startWorkoutSession() {
  if (isSessionTimerRunning) return;
  
  sessionStartTime = Date.now();
  isSessionTimerRunning = true;
  localStorage.setItem("vigor_sessionTimerRunning", "true");
  localStorage.setItem("vigor_sessionStartTime", sessionStartTime.toString());
  
  if (sessionTimerInterval) clearInterval(sessionTimerInterval);
  sessionTimerInterval = setInterval(() => {
    updateStopwatchUI();
  }, 1000);
  
  updateStopwatchUI();
  updateStopwatchControls();
  
  const panel = document.getElementById("session-control-panel");
  if (panel) panel.classList.remove("hidden");
}

function pauseWorkoutSession() {
  if (!isSessionTimerRunning) return;
  
  if (sessionStartTime) {
    const diffSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    sessionElapsedSeconds += Math.max(0, diffSeconds);
  }
  
  isSessionTimerRunning = false;
  sessionStartTime = null;
  localStorage.setItem("vigor_sessionTimerRunning", "false");
  localStorage.setItem("vigor_sessionElapsedSeconds", sessionElapsedSeconds.toString());
  localStorage.removeItem("vigor_sessionStartTime");
  
  if (sessionTimerInterval) {
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
  }
  
  updateStopwatchUI();
  updateStopwatchControls();
}

function confirmResetWorkoutSession() {
  if (confirm("¿Estás seguro de que quieres reiniciar el cronómetro de la sesión activa?")) {
    resetWorkoutSession();
  }
}

function resetWorkoutSession() {
  if (sessionTimerInterval) {
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
  }
  
  isSessionTimerRunning = false;
  sessionStartTime = null;
  sessionElapsedSeconds = 0;
  
  localStorage.removeItem("vigor_sessionStartTime");
  localStorage.removeItem("vigor_sessionElapsedSeconds");
  localStorage.setItem("vigor_sessionTimerRunning", "false");
  
  updateStopwatchUI();
  updateStopwatchControls();
  updateLiveVolumeUI();
}

function updateStopwatchControls() {
  const btnPlay = document.getElementById("btn-session-play");
  const btnPause = document.getElementById("btn-session-pause");
  
  if (isSessionTimerRunning) {
    if (btnPlay) btnPlay.classList.add("hidden");
    if (btnPause) {
      btnPause.classList.remove("hidden");
      btnPause.classList.add("flex");
    }
  } else {
    if (btnPlay) btnPlay.classList.remove("hidden");
    if (btnPause) {
      btnPause.classList.add("hidden");
      btnPause.classList.remove("flex");
    }
  }
}

function updateLiveVolumeUI() {
  const volNaty = calculateSessionVolume("naty");
  
  const elNaty = document.getElementById("session-vol-naty");
  
  if (elNaty) elNaty.textContent = volNaty.toLocaleString();
}

function calculateSessionVolume(user) {
  let totalVolume = 0;
  const dayData = routineData[activeTab];
  if (!dayData) return 0;
  
  dayData.exercises.forEach((exercise, idx) => {
    const numSets = parseInt(exercise.sets) || 3;
    const repsVal = parseReps(exercise.reps);
    for (let s = 0; s < numSets; s++) {
      const setKey = `${activeTab}-${idx}-${s}`;
      const isCompleted = completedSets[setKey] && completedSets[setKey][user];
      if (isCompleted) {
        let weight = setWeights[setKey] && setWeights[setKey][user];
        if (!weight) {
          weight = getLastWeight(exercise.name, user, activeTab) || "0";
        }
        const weightVal = parseFloat(weight) || 0;
        totalVolume += weightVal * repsVal;
      }
    }
  });
  
  return totalVolume;
}

// ==========================================================================
// WORKOUT SUMMARY MODAL & OVERLOAD ANALYSIS
// ==========================================================================
function openWorkoutSummaryModal() {
  const modal = document.getElementById("workout-summary-modal");
  if (!modal) return;

  const durationText = document.getElementById("session-stopwatch")?.textContent || "00:00:00";
  const durationEl = document.getElementById("summary-duration");
  if (durationEl) durationEl.textContent = durationText;

  const volNaty = calculateSessionVolume("naty");
  const natyCard = document.getElementById("summary-naty-card");
  if (natyCard) natyCard.style.display = "block";

  const natyVolEl = document.getElementById("summary-naty-vol");
  if (natyVolEl) {
    natyVolEl.innerHTML = `${volNaty.toLocaleString()} <span class="text-xs font-normal text-[var(--text-dim)]">kg</span>`;
  }

  const prevNatyVol = getLastSessionVolume("naty");
  updateOverloadStats("naty", volNaty, prevNatyVol);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  
  safeCreateIcons();
}

function updateOverloadStats(user, currentVol, prevVol) {
  const diffEl = document.getElementById(`summary-${user}-vs-prev`);
  const badgeEl = document.getElementById(`summary-${user}-overload-badge`);

  if (!diffEl || !badgeEl) return;

  if (prevVol > 0) {
    const percentDiff = ((currentVol - prevVol) / prevVol) * 100;
    const formatted = percentDiff >= 0 
      ? `+${percentDiff.toFixed(1)}%` 
      : `${percentDiff.toFixed(1)}%`;
      
    diffEl.textContent = `${formatted} vs anterior`;
    
    if (percentDiff > 0) {
      diffEl.className = "font-mono font-black text-emerald-400 text-sm";
      badgeEl.innerHTML = `<i data-lucide="trending-up" class="w-3 h-3 inline-block"></i> Sobrecarga`;
      badgeEl.className = `text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-black uppercase font-mono`;
    } else if (percentDiff < 0) {
      diffEl.className = "font-mono font-black text-rose-500 text-sm";
      badgeEl.textContent = "Descarga";
      badgeEl.className = `text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded font-black uppercase font-mono`;
    } else {
      diffEl.className = "font-mono font-black text-slate-400 text-sm";
      badgeEl.textContent = "Igual";
      badgeEl.className = `text-[9px] bg-slate-500/10 text-slate-400 border border-slate-500/30 px-2 py-0.5 rounded font-black uppercase font-mono`;
    }
  } else {
    diffEl.textContent = "Primer registro";
    diffEl.className = "font-mono font-black text-slate-400 text-sm";
    badgeEl.textContent = "Nuevo";
    badgeEl.className = `text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-black uppercase font-mono`;
  }
}

function getLastSessionVolume(user) {
  const dates = Object.keys(trainingHistory).sort((a, b) => new Date(b) - new Date(a));
  const dayData = routineData[activeTab];
  if (!dayData) return 0;
  
  for (let d = 0; d < dates.length; d++) {
    const dateKey = dates[d];
    
    // Skip today's date so we don't compare today with today
    const todayStr = getDateKey(new Date());
    if (dateKey === todayStr) continue;

    const dayRecord = trainingHistory[dateKey];
    if (!dayRecord || !dayRecord.weights) continue;
    
    let userCompletedSets = 0;
    let computedVolume = 0;
    
    dayData.exercises.forEach((exercise, idx) => {
      const numSets = parseInt(exercise.sets) || 3;
      const repsVal = parseReps(exercise.reps);
      for (let s = 0; s < numSets; s++) {
        const setKey = `${activeTab}-${idx}-${s}`;
        const w = dayRecord.weights[setKey];
        if (w && w[user]) {
          const weightVal = parseFloat(w[user]) || 0;
          computedVolume += weightVal * repsVal;
          userCompletedSets++;
        }
      }
    });
    
    if (userCompletedSets > 0) {
      return computedVolume;
    }
  }
  
  return 0;
}

function closeWorkoutSummaryModal() {
  const modal = document.getElementById("workout-summary-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function saveSessionAndCloseSummary() {
  let who = "both";
  if (whoTrainsToday === "naty") {
    who = "naty";
  } else if (whoTrainsToday === "alma") {
    who = "alma";
  } else {
    let natyTrained = false;
    let almaTrained = false;
    
    const dayData = routineData[activeTab];
    if (dayData) {
      dayData.exercises.forEach((exercise, idx) => {
        const numSets = parseInt(exercise.sets) || 3;
        for (let s = 0; s < numSets; s++) {
          const setKey = `${activeTab}-${idx}-${s}`;
          if (completedSets[setKey]) {
            if (completedSets[setKey].naty) natyTrained = true;
            if (completedSets[setKey].alma) almaTrained = true;
          }
        }
      });
    }
    
    if (natyTrained && almaTrained) who = "both";
    else if (natyTrained) who = "naty";
    else if (almaTrained) who = "alma";
    else who = "both";
  }
  
  markDayCompleted(who);
  resetWorkoutSession();
  closeWorkoutSummaryModal();
}

// Expose functions globally for HTML onclick event handlers
window.startWorkoutSession = startWorkoutSession;
window.pauseWorkoutSession = pauseWorkoutSession;
window.confirmResetWorkoutSession = confirmResetWorkoutSession;
window.openWorkoutSummaryModal = openWorkoutSummaryModal;
window.closeWorkoutSummaryModal = closeWorkoutSummaryModal;
window.saveSessionAndCloseSummary = saveSessionAndCloseSummary;
window.updateLiveVolumeUI = updateLiveVolumeUI;
window.initSessionStopwatch = initSessionStopwatch;



function getLastReps(exerciseName, user, dayIndex) {
  const dates = Object.keys(trainingHistory).sort(
    (a, b) => new Date(b) - new Date(a),
  );

  const dayRoutine = routineData[dayIndex];
  if (!dayRoutine) return "";

  const exIndex = dayRoutine.exercises.findIndex(
    (e) => e.name === exerciseName,
  );
  if (exIndex === -1) return "";

  for (const date of dates) {
    const dayData = trainingHistory[date];
    if (dayData && dayData.reps) {
      for (let s = 0; s < 6; s++) {
        const key = `${dayIndex}-${exIndex}-${s}`;
        if (dayData.reps[key] && dayData.reps[key][user]) {
          return dayData.reps[key][user];
        }
      }
    }
  }
  return "";
}
// Global Helpers
window.addExerciseSet = function(tabId, exerciseIndex) {
  const dayRoutine = routineData[tabId];
  if (!dayRoutine) return;
  const ex = dayRoutine.exercises[exerciseIndex];
  if (ex) {
    let sets = parseInt(ex.sets) || 3;
    sets += 1;
    ex.sets = String(sets);
    
    // Save to localStorage
    if (typeof routinesList !== "undefined") {
      localStorage.setItem("vitalRoutinesList", JSON.stringify(routinesList));
    }
    
    // Re-render without full animation
    renderContent(true);
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }
};

window.removeExerciseSet = function(tabId, exerciseIndex) {
  const dayRoutine = routineData[tabId];
  if (!dayRoutine) return;
  const ex = dayRoutine.exercises[exerciseIndex];
  if (ex) {
    let sets = parseInt(ex.sets) || 3;
    if (sets > 1) {
      sets -= 1;
      ex.sets = String(sets);
      
      // Save to localStorage
      if (typeof routinesList !== "undefined") {
        localStorage.setItem("vitalRoutinesList", JSON.stringify(routinesList));
      }
      
      // Re-render without full animation
      renderContent(true);
      if (typeof lucide !== "undefined" && lucide.createIcons) {
        lucide.createIcons();
      }
    }
  }
};


// Legacy initializeUI removed
