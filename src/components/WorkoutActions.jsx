"use client";

import { useWorkout } from "@/context/WorkoutContext";
import toast from "react-hot-toast";

export default function WorkoutActions({ workout }) {
  const { addToPlan, addToSaved } = useWorkout();

  const handleAddToPlan = () => {
    if (!workout) return;
    const res = addToPlan(workout);
    if (res?.success) {
      toast.success("Added to today's plan");
    } else if (res?.reason === "duplicate") {
      toast.error("Already in today's plan");
    } else if (res?.reason === "limit") {
      toast.error("Plan is full — max 5 lifts for today.");
    } else {
      toast.error("Unable to add workout to plan");
    }
  };

  const handleSave = () => {
    if (!workout) return;
    const res = addToSaved(workout);
    if (res?.success) {
      toast.success("Saved for later");
    } else if (res?.reason === "duplicate") {
      toast.error("Already in your saved list");
    } else {
      toast.error("Unable to save workout");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleAddToPlan}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase bg-[#ccff00] text-[#0c0d10] hover:bg-[#b8e600] transition active:scale-95 shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={handleSave}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs border border-[#2b303d] bg-[#15171d] hover:bg-[#1c1f26] hover:border-[#374151] text-[#e5e7eb] transition active:scale-95 shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Save for later
      </button>
    </div>
  );
}
