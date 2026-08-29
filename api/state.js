const { hasSupabaseConfig, supabaseFetch } = require("./_supabase");

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, apikey");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.end(JSON.stringify(body));
}

function jsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  if (!hasSupabaseConfig()) {
    return sendJson(res, 500, { error: "Supabase server config missing" });
  }

  const method = (req.method || "GET").toUpperCase();
  if (method === "GET") {
    try {
      const [profiles, routines, days, exercises, history, gamification, water] = await Promise.all([
        supabaseFetch("profiles?select=*"),
        supabaseFetch("routines?select=*&order=is_base.desc,created_at.asc"),
        supabaseFetch("routine_days?select=*&order=day_index.asc"),
        supabaseFetch("routine_exercises?select=*&order=position.asc"),
        supabaseFetch("training_history?select=*&order=date_key.asc"),
        supabaseFetch("gamification?select=*"),
        supabaseFetch("water_state?select=*"),
      ]);

      return sendJson(res, 200, {
        profiles: profiles || [],
        routines: routines || [],
        routine_days: days || [],
        routine_exercises: exercises || [],
        training_history: history || [],
        gamification: gamification || [],
        water_state: water || [],
      });
    } catch (error) {
      return sendJson(res, 500, { error: error.message });
    }
  }

  if (method === "POST") {
    try {
      const body = await jsonBody(req);
      const action = body.action || "save";
      const payload = body.payload || body;

      if (action !== "save" && action !== "migrate") {
        return sendJson(res, 400, { error: "Invalid action" });
      }

      const results = [];
      if (payload.profile) {
        results.push(
          supabaseFetch("profiles?on_conflict=id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(payload.profile),
          }),
        );
      }

      if (Array.isArray(payload.routines) && payload.routines.length > 0) {
        results.push(
          supabaseFetch("routines?on_conflict=id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(payload.routines),
          }),
        );
      }

      if (Array.isArray(payload.routine_days) && payload.routine_days.length > 0) {
        results.push(
          supabaseFetch("routine_days?on_conflict=id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(payload.routine_days),
          }),
        );
      }

      if (Array.isArray(payload.routine_exercises) && payload.routine_exercises.length > 0) {
        results.push(
          supabaseFetch("routine_exercises?on_conflict=id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(payload.routine_exercises),
          }),
        );
      }

      if (Array.isArray(payload.training_history) && payload.training_history.length > 0) {
        results.push(
          supabaseFetch("training_history?on_conflict=user_id,date_key", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(payload.training_history),
          }),
        );
      }

      if (payload.gamification) {
        results.push(
          supabaseFetch("gamification?on_conflict=user_id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(payload.gamification),
          }),
        );
      }

      if (payload.water_state) {
        results.push(
          supabaseFetch("water_state?on_conflict=user_id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify(payload.water_state),
          }),
        );
      }

      const settled = await Promise.allSettled(results);
      const rejected = settled.filter((item) => item.status === "rejected");
      if (rejected.length) {
        return sendJson(res, 500, {
          ok: false,
          error: rejected[0].reason?.message || "Cloud save failed",
        });
      }

      return sendJson(res, 200, { ok: true, saved: settled.length });
    } catch (error) {
      return sendJson(res, 500, { error: error.message });
    }
  }

  if (method === "PUT") {
    try {
      const body = await jsonBody(req);
      const payload = body.payload || body;
      console.log("[PUT] payload keys:", Object.keys(payload));
      console.log("[PUT] routines count:", payload.routines?.length);
      console.log("[PUT] routine_days count:", payload.routine_days?.length);
      console.log("[PUT] routine_exercises count:", payload.routine_exercises?.length);
      const results = [];

      if (payload.profile) {
        results.push(supabaseFetch("profiles?on_conflict=id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(payload.profile) }));
      }
      if (Array.isArray(payload.routines) && payload.routines.length > 0) {
        results.push(supabaseFetch("routines?on_conflict=id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(payload.routines) }));
      }
      if (Array.isArray(payload.routine_days) && payload.routine_days.length > 0) {
        results.push(supabaseFetch("routine_days?on_conflict=id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(payload.routine_days) }));
      }
      if (Array.isArray(payload.routine_exercises) && payload.routine_exercises.length > 0) {
        results.push(supabaseFetch("routine_exercises?on_conflict=id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(payload.routine_exercises) }));
      }
      if (Array.isArray(payload.training_history) && payload.training_history.length > 0) {
        results.push(supabaseFetch("training_history?on_conflict=user_id,date_key", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(payload.training_history) }));
      }
      if (payload.gamification) {
        results.push(supabaseFetch("gamification?on_conflict=user_id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(payload.gamification) }));
      }
      if (payload.water_state) {
        results.push(supabaseFetch("water_state?on_conflict=user_id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(payload.water_state) }));
      }

      const settled = await Promise.allSettled(results);
      const rejected = settled.filter((item) => item.status === "rejected");
      if (rejected.length) {
        rejected.forEach((r) => console.error("[PUT] Rejected:", r.reason?.message));
        return sendJson(res, 500, { ok: false, error: rejected[0].reason?.message || "Cloud seed failed" });
      }
      return sendJson(res, 200, { ok: true, seeded: settled.length });
    } catch (error) {
      return sendJson(res, 500, { error: error.message });
    }
  }

  return sendJson(res, 405, { error: "Method not allowed" });
};
