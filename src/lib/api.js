const PRIMARY_API_URL = "https://api.abcz.workers.dev/api/fitlog";
const FALLBACK_API_URL = "https://api.api-store.workers.dev/api/fitlog";

async function fetchWithFallback(path = "") {
  const primaryUrl = path ? `${PRIMARY_API_URL}/${path}` : PRIMARY_API_URL;
  const fallbackUrl = path ? `${FALLBACK_API_URL}/${path}` : FALLBACK_API_URL;

  try {
    const res = await fetch(primaryUrl);
    if (!res.ok) {
      throw new Error(`Primary API request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (primaryError) {
    console.warn(`Primary API request failed (${primaryError.message}). Attempting fallback endpoint...`);

    const fallbackRes = await fetch(fallbackUrl);
    if (!fallbackRes.ok) {
      throw new Error(`Fallback API request failed with status ${fallbackRes.status}`);
    }
    return await fallbackRes.json();
  }
}

export async function getAllWorkouts() {
  return await fetchWithFallback();
}


export async function getWorkoutById(id) {
  if (id === undefined || id === null || id === "") {
    throw new Error("Workout ID is required");
  }

  const cleanId = encodeURIComponent(String(id).trim());
  return await fetchWithFallback(cleanId);
}
