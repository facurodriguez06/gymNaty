// ============================================
// SCRIPT DE RECUPERACIÓN DE DATOS HISTÓRICOS
// GymRutina - Facu y Alma
// ============================================
// Ejecutar en la consola del navegador (F12 -> Console)
// ============================================

// Pesos iniciales por ejercicio (según datos del 8 de enero 2026)
const INITIAL_WEIGHTS = {
  // LUNES - Pierna y Glúteo
  sentadilla: { facu: "50", alma: "30" },
  hip_thrust: { facu: "40", alma: "40" },
  prensa_piernas: { facu: "90", alma: "70" },
  sillon_cuadriceps: { facu: "45", alma: "10" },
  curl_femoral: { facu: "20", alma: "10" },
  gemelos_maquina: { facu: "40", alma: "20" },

  // MARTES - Solo Facu - Empuje
  press_banca_plano: { facu: "50", alma: "" },
  press_declinado: { facu: "35", alma: "" },
  press_inclinado: { facu: "40", alma: "" },
  elevaciones_laterales_manc: { facu: "15", alma: "" },
  aperturas: { facu: "25", alma: "" },
  extensiones_triceps_polea: { facu: "30", alma: "" },
  extensiones_unilateral: { facu: "15", alma: "" },

  // MIÉRCOLES - Tren Superior
  jalon_pecho_ancho: { facu: "45", alma: "5" },
  press_militar_maquina: { facu: "26", alma: "6" },
  remo_polea_baja: { facu: "45", alma: "10" },
  press_pecho_manc: { facu: "25", alma: "10" },
  elevaciones_laterales_polea: { facu: "10", alma: "2.5" },
  curl_biceps_barra: { facu: "21", alma: "7" },

  // JUEVES - Solo Facu - Tracción
  jalon_pecho_neutro: { facu: "45", alma: "" },
  remo_con_barra: { facu: "50", alma: "" },
  pullover_polea: { facu: "30", alma: "" },
  vuelos_posteriores: { facu: "10", alma: "" },
  curl_martillo: { facu: "15", alma: "" },
  curl_antebrazos: { facu: "20", alma: "" },

  // VIERNES - Full Body
  peso_muerto_rumano: { facu: "50", alma: "21" },
  patada_gluteo_maquina: { facu: "25", alma: "25" },
  face_pull: { facu: "20", alma: "10" },
  copa_triceps: { facu: "15", alma: "6" },
  bonus: { facu: "0", alma: "5" },
};

// Días de entrenamiento
const TRAINING_DAYS = [
  { date: "2026-01-08", who: "both" },
  { date: "2026-01-09", who: "both" },
  { date: "2026-01-12", who: "both" },
  { date: "2026-01-13", who: "facu" }, // Solo Facu
  { date: "2026-01-14", who: "both" },
  { date: "2026-01-16", who: "both" },
  { date: "2026-01-19", who: "both" },
  { date: "2026-01-20", who: "facu" }, // Solo Facu
  { date: "2026-01-21", who: "both" },
  { date: "2026-01-23", who: "both" }, // Hoy
];

// Función para calcular volumen
function calculateVolume(weights, user) {
  let vol = 0;
  Object.values(weights).forEach((w) => {
    const weight = parseInt(w[user]) || 0;
    vol += weight * 10 * 3; // peso × 10 reps × 3 sets
  });
  return vol;
}

// Función para generar claves de peso según estructura del sistema
function generateWeightKeys(dayIndex, numExercises = 6, setsPerExercise = 3) {
  const keys = [];
  for (let ex = 0; ex < numExercises; ex++) {
    for (let set = 0; set < setsPerExercise; set++) {
      keys.push(`${dayIndex}-${ex}-${set}`);
    }
  }
  return keys;
}

// Pesos por día (índice de rutina)
const WEIGHTS_BY_DAY = {
  0: [
    "sentadilla",
    "hip_thrust",
    "prensa_piernas",
    "sillon_cuadriceps",
    "curl_femoral",
    "gemelos_maquina",
  ], // Lunes
  1: [
    "press_banca_plano",
    "press_inclinado",
    "aperturas",
    "elevaciones_laterales_manc",
    "extensiones_triceps_polea",
    "extensiones_unilateral",
  ], // Martes
  2: [
    "jalon_pecho_ancho",
    "press_militar_maquina",
    "remo_polea_baja",
    "press_pecho_manc",
    "elevaciones_laterales_polea",
    "curl_biceps_barra",
  ], // Miércoles
  3: [
    "jalon_pecho_neutro",
    "remo_con_barra",
    "pullover_polea",
    "vuelos_posteriores",
    "curl_martillo",
    "curl_antebrazos",
  ], // Jueves
  4: [
    "peso_muerto_rumano",
    "patada_gluteo_maquina",
    "face_pull",
    "sentadilla",
    "copa_triceps",
    "bonus",
  ], // Viernes (usa algunos de otros días)
};

// Mapeo de fechas a días de rutina (basado en el día de la semana)
function getRoutineDayIndex(dateStr) {
  const date = new Date(dateStr + "T12:00:00");
  const dayOfWeek = date.getDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mier, 4=Jue, 5=Vie, 6=Sab
  const mapping = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 }; // Lun-Vie -> 0-4
  return mapping[dayOfWeek] !== undefined ? mapping[dayOfWeek] : 0;
}

// EJECUTAR POBLACIÓN DE DATOS
console.log("🏋️ INICIANDO CARGA DE DATOS HISTÓRICOS...\n");

TRAINING_DAYS.forEach(({ date, who }) => {
  const dayIndex = getRoutineDayIndex(date);
  const exercises = WEIGHTS_BY_DAY[dayIndex] || WEIGHTS_BY_DAY[0];

  // Crear entrada en trainingHistory
  if (!trainingHistory[date]) {
    trainingHistory[date] = { alma: false, facu: false, weights: {} };
  }

  // Marcar quién entrenó
  if (who === "facu" || who === "both") trainingHistory[date].facu = true;
  if (who === "alma" || who === "both") trainingHistory[date].alma = true;

  // Asignar pesos
  exercises.forEach((exerciseKey, exIndex) => {
    const weights = INITIAL_WEIGHTS[exerciseKey] || { facu: "0", alma: "0" };

    for (let set = 0; set < 3; set++) {
      const key = `${dayIndex}-${exIndex}-${set}`;
      trainingHistory[date].weights[key] = {};

      if ((who === "facu" || who === "both") && weights.facu) {
        trainingHistory[date].weights[key].facu = weights.facu;
      }
      if ((who === "alma" || who === "both") && weights.alma) {
        trainingHistory[date].weights[key].alma = weights.alma;
      }
    }
  });

  // Calcular volumen
  let volFacu = 0,
    volAlma = 0;
  Object.values(trainingHistory[date].weights).forEach((w) => {
    volFacu += (parseInt(w.facu) || 0) * 10;
    volAlma += (parseInt(w.alma) || 0) * 10;
  });

  const volMsg =
    who === "both"
      ? `Facu: ${volFacu}kg, Alma: ${volAlma}kg`
      : who === "facu"
        ? `Facu: ${volFacu}kg`
        : `Alma: ${volAlma}kg`;
  console.log(`✅ ${date} (${who}) - ${volMsg}`);
});

// Guardar en localStorage
localStorage.setItem("gymTrainingHistory", JSON.stringify(trainingHistory));

console.log("\n🎉 ¡DATOS HISTÓRICOS CARGADOS EXITOSAMENTE!");
console.log("📊 Ahora ve a la pestaña 'Progreso' para ver los gráficos.");
console.log(
  "📅 Ve a 'Historial' para ver el calendario con los días marcados.",
);

// Refrescar UI
if (typeof renderCalendar === "function") renderCalendar();
if (typeof renderCharts === "function") renderCharts();
