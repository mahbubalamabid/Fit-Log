"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const STORAGE_KEY = "fitlog_workout_state_v1";

const WorkoutContext = createContext(null);

// Helper to filter valid workout items and remove duplicates
function sanitizeList(list) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list.filter((item) => {
    if (!item || item.id === undefined || item.id === null) return false;
    const id = String(item.id);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Synchronous refs track latest state immediately across rapid calls
  const planRef = useRef([]);
  const savedRef = useRef([]);

  // Keep refs synchronized when state updates
  useEffect(() => {
    planRef.current = plan;
  }, [plan]);

  useEffect(() => {
    savedRef.current = saved;
  }, [saved]);

  // 1. Load persisted data from localStorage on client mount (SSR hydration safe)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        // Restore Plan (supports new 'plan' array or legacy 'todayPlan' schema)
        let rawPlan = [];
        if (Array.isArray(parsed.plan)) {
          rawPlan = parsed.plan;
        } else if (Array.isArray(parsed.todayPlan)) {
          const doneSet = new Set(
            Array.isArray(parsed.doneIds)
              ? parsed.doneIds
                  .filter((id) => id !== null && id !== undefined)
                  .map(String)
              : []
          );
          rawPlan = parsed.todayPlan.map((w) => {
            const hasId = w && w.id !== null && w.id !== undefined;
            return {
              ...w,
              done: hasId ? doneSet.has(String(w.id)) : Boolean(w?.done),
            };
          });
        }
        const cleanPlan = sanitizeList(rawPlan).slice(0, 5);
        planRef.current = cleanPlan;
        setPlan(cleanPlan);

        // Restore Saved workouts
        if (Array.isArray(parsed.saved)) {
          const cleanSaved = sanitizeList(parsed.saved);
          savedRef.current = cleanSaved;
          setSaved(cleanSaved);
        }
      }
    } catch (error) {
      console.warn("Unable to load workout state from localStorage:", error);
    }
    setLoaded(true);
  }, []);

  // 2. Persist state changes to localStorage after initial hydration
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
    } catch (error) {
      console.warn("Unable to save workout state to localStorage:", error);
    }
  }, [plan, saved, loaded]);

  // Actions
  const addToPlan = (workout) => {
    if (!workout || workout.id === undefined || workout.id === null) {
      return { success: false, reason: "invalid" };
    }

    const idStr = String(workout.id);
    const currentPlan = planRef.current;

    if (currentPlan.some((w) => String(w.id) === idStr)) {
      return { success: false, reason: "duplicate" };
    }
    if (currentPlan.length >= 5) {
      return { success: false, reason: "limit" };
    }

    const updatedPlan = [...currentPlan, { ...workout, done: false }];
    planRef.current = updatedPlan; // Updated synchronously before next call
    setPlan(updatedPlan);

    return { success: true, reason: "added" };
  };

  const removeFromPlan = (id) => {
    if (id === undefined || id === null) return;
    const idStr = String(id);
    const updatedPlan = planRef.current.filter((w) => String(w.id) !== idStr);
    planRef.current = updatedPlan;
    setPlan(updatedPlan);
  };

  const addToSaved = (workout) => {
    if (!workout || workout.id === undefined || workout.id === null) {
      return { success: false, reason: "invalid" };
    }

    const idStr = String(workout.id);
    const currentSaved = savedRef.current;

    if (currentSaved.some((w) => String(w.id) === idStr)) {
      return { success: false, reason: "duplicate" };
    }

    const updatedSaved = [...currentSaved, workout];
    savedRef.current = updatedSaved; // Updated synchronously before next call
    setSaved(updatedSaved);

    return { success: true, reason: "added" };
  };

  const removeFromSaved = (id) => {
    if (id === undefined || id === null) return;
    const idStr = String(id);
    const updatedSaved = savedRef.current.filter((w) => String(w.id) !== idStr);
    savedRef.current = updatedSaved;
    setSaved(updatedSaved);
  };

  // Toggle workout done state directly on the planned workout object
  const markAsDone = (id) => {
    if (id === undefined || id === null) return;
    const idStr = String(id);
    const updatedPlan = planRef.current.map((w) =>
      String(w.id) === idStr ? { ...w, done: !w.done } : w
    );
    planRef.current = updatedPlan;
    setPlan(updatedPlan);
  };

  const value = {
    plan,
    saved,
    loaded,
    planCount: plan.length,
    savedCount: saved.length,
    addToPlan,
    removeFromPlan,
    addToSaved,
    removeFromSaved,
    markAsDone,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
