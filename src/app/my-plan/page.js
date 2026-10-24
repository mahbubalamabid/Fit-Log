"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useWorkout } from "@/context/WorkoutContext";
import PlanSummary from "@/components/PlanSummary";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

export default function MyPlanPage() {
  const {
    plan = [],
    saved = [],
    loaded = false,
    markAsDone,
    removeFromPlan,
    addToPlan,
    removeFromSaved,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const totalPlanned = plan.length;
  const completedCount = plan.filter((w) => Boolean(w?.done)).length;
  const totalMinutes = plan.reduce(
    (sum, w) => sum + (Number(w?.duration) || 0),
    0
  );
  const totalCalories = plan.reduce(
    (sum, w) => sum + (Number(w?.caloriesBurned) || 0),
    0
  );

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "calories") {
      return (Number(b?.caloriesBurned) || 0) - (Number(a?.caloriesBurned) || 0);
    }
    if (sortBy === "rating") {
      return (Number(b?.rating) || 0) - (Number(a?.rating) || 0);
    }

    return (Number(b?.duration) || 0) - (Number(a?.duration) || 0);
  });

  const handleToggleDone = (workout) => {
    if (!workout || workout.id === undefined) return;
    markAsDone(workout.id);
    if (!workout.done) {
      toast.success(`Completed ${workout.name}!`);
    } else {
      toast(`Marked ${workout.name} as pending`);
    }
  };

  const handleRemoveFromPlan = (workout) => {
    if (!workout || workout.id === undefined) return;
    removeFromPlan(workout.id);
    toast.success(`Removed ${workout.name} from plan`);
  };

  const handleRemoveFromSaved = (workout) => {
    if (!workout || workout.id === undefined) return;
    removeFromSaved(workout.id);
    toast.success(`Removed ${workout.name} from saved`);
  };

  const handleAddToPlanFromSaved = (workout) => {
    if (!workout) return;
    const res = addToPlan(workout);
    if (res.success) {
      toast.success(`Added ${workout.name} to today's plan!`);
    } else if (res.reason === "limit") {
      toast.error("Daily limit reached (maximum 5 workouts)");
    } else if (res.reason === "duplicate") {
      toast("Already in today's plan");
    }
  };

  return (
    <div className="w-full max-w-[1184px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 flex flex-col">
      <div className="mb-5 sm:mb-6">
        <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white tracking-wide mb-1.5">
          MY PLAN
        </h1>
        <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <PlanSummary
        totalPlanned={totalPlanned}
        completedCount={completedCount}
        totalMinutes={totalMinutes}
        totalCalories={totalCalories}
        loaded={loaded}
      />

      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 bg-[#151921] border border-[#232732] p-1 rounded-xl w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "plan"
                ? "bg-[#1f242d] border border-[#2b303d] text-white shadow-sm"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            <span>Today’s Plan</span>
            <span
              className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center ${
                activeTab === "plan"
                  ? "bg-[#ccff00] text-[#0c0d10]"
                  : "bg-[#222630] text-[#9ca3af]"
              }`}
            >
              {loaded ? plan.length : 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === "saved"
                ? "bg-[#1f242d] border border-[#2b303d] text-white shadow-sm"
                : "text-[#9ca3af] hover:text-white"
            }`}
          >
            <span>Saved</span>
            <span
              className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-[#0c0d10]"
                  : "bg-[#222630] text-[#9ca3af]"
              }`}
            >
              {loaded ? saved.length : 0}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#9ca3af] font-medium text-xs whitespace-nowrap">
            Sort By
          </span>
          <div className="relative inline-flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort workouts by"
              className="appearance-none bg-[#13161d] border border-[#232732] hover:border-[#374151] text-white text-xs font-medium rounded-lg h-9 pl-3 pr-8 focus:outline-none focus:border-[#ccff00] transition cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center text-[#9ca3af]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {!loaded ? (
        <div className="py-16 text-center flex flex-col items-center justify-center">
          <span className="loading loading-spinner text-[#ccff00] mb-3"></span>
          <p className="text-sm text-[#9ca3af]">Loading workouts…</p>
        </div>
      ) : sortedList.length === 0 ? (
        <div className="border border-dashed border-white/10 bg-[#111317]/50 rounded-xl py-12 sm:py-16 px-6 text-center">
          <h2 className="font-oswald text-xl sm:text-2xl font-bold uppercase text-white tracking-wide mb-2">
            {activeTab === "plan" ? "NOTHING HERE YET" : "NO SAVED WORKOUTS"}
          </h2>
          <p className="text-[#9ca3af] text-xs sm:text-sm max-w-md mx-auto mb-5 leading-relaxed">
            {activeTab === "plan"
              ? "Browse the library and add a lift to get today moving."
              : "Save workouts from the library or details page to find them easily here."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#ccff00] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition active:scale-95 shadow-sm"
          >
            {activeTab === "plan" ? "Go to workouts" : "Browse Workouts"}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedList.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              activeTab={activeTab}
              isInPlan={plan.some((p) => String(p.id) === String(workout.id))}
              onToggleDone={handleToggleDone}
              onRemove={
                activeTab === "plan"
                  ? handleRemoveFromPlan
                  : handleRemoveFromSaved
              }
              onAddToPlan={handleAddToPlanFromSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}
