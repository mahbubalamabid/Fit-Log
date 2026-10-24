"use client";

import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "fitlog_workout_state_v1";

const WorkoutContext = createContext(null);

function sanitizeList(list) {
  if (!Array.isArray(list)) return [];
  const seenIds = new Set();
  return list.filter((item) => {
    if (!item || item.id === undefined || item.id === null) return false;
    const id = String(item.id);
    if (seenIds.has(id)) return false;
    seenIds.add(id);
    return true;
  });
}

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        let rawPlan = [];
        if (Array.isArray(parsed.plan)) {
          rawPlan = parsed.plan;
        } else if (Array.isArray(parsed.todayPlan)) {
          const doneIds = Array.isArray(parsed.doneIds)
            ? parsed.doneIds.map(String)
            : [];
          rawPlan = parsed.todayPlan.map((workout) => ({
            ...workout,
            done:
              workout?.id !== undefined && workout?.id !== null
                ? doneIds.includes(String(workout.id))
                : Boolean(workout?.done),
          }));
        }

        const cleanPlan = sanitizeList(rawPlan).slice(0, 5);
        setPlan(cleanPlan);

        if (Array.isArray(parsed.saved)) {
          const cleanSaved = sanitizeList(parsed.saved);
          setSaved(cleanSaved);
        }
      }
    } catch (error) {
      console.warn("Unable to load workout state from localStorage:", error);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
    } catch (error) {
      console.warn("Unable to save workout state to localStorage:", error);
    }
  }, [plan, saved, loaded]);

  const addToPlan = (workout) => {
    if (!workout || workout.id === undefined || workout.id === null) {
      return { success: false, reason: "invalid" };
    }

    const idStr = String(workout.id);

    if (plan.some((w) => String(w.id) === idStr)) {
      return { success: false, reason: "duplicate" };
    }
    if (plan.length >= 5) {
      return { success: false, reason: "limit" };
    }

    setPlan((prevPlan) => [...prevPlan, { ...workout, done: false }]);

    return { success: true, reason: "added" };
  };

  const removeFromPlan = (id) => {
    if (id === undefined || id === null) return;
    const idStr = String(id);
    setPlan((prevPlan) => prevPlan.filter((w) => String(w.id) !== idStr));
  };

  const addToSaved = (workout) => {
    if (!workout || workout.id === undefined || workout.id === null) {
      return { success: false, reason: "invalid" };
    }

    const idStr = String(workout.id);

    if (saved.some((w) => String(w.id) === idStr)) {
      return { success: false, reason: "duplicate" };
    }

    setSaved((prevSaved) => [...prevSaved, workout]);

    return { success: true, reason: "added" };
  };

  const removeFromSaved = (id) => {
    if (id === undefined || id === null) return;
    const idStr = String(id);
    setSaved((prevSaved) => prevSaved.filter((w) => String(w.id) !== idStr));
  };

  const markAsDone = (id) => {
    if (id === undefined || id === null) return;
    const idStr = String(id);
    setPlan((prevPlan) =>
      prevPlan.map((w) =>
        String(w.id) === idStr ? { ...w, done: !w.done } : w
      )
    );
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
