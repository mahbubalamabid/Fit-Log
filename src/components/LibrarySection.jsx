"use client";

import { useState, useEffect } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { getAllWorkouts } from "@/lib/api";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const loadWorkouts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllWorkouts();
      setWorkouts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    loadWorkouts();
  }, []);

  const trimmedQuery = query.trim().toLowerCase();
  const filtered = trimmedQuery
    ? workouts.filter((w) => {
        const nameMatch = w.name?.toLowerCase().includes(trimmedQuery);
        const tagMatch = Array.isArray(w.muscleGroups)
          ? w.muscleGroups.some((tag) => tag.toLowerCase().includes(trimmedQuery))
          : false;
        return nameMatch || tagMatch;
      })
    : workouts;

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration ?? 0) - Number(b.duration ?? 0);
    }
    if (sortBy === "caloriesBurned") {
      return Number(a.caloriesBurned ?? 0) - Number(b.caloriesBurned ?? 0);
    }
    if (sortBy === "rating") {
      return Number(b.rating ?? 0) - Number(a.rating ?? 0);
    }
    return 0; 
  });

  return (
    <section
      id="library"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 scroll-mt-20"
    >
  
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-oswald text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
            The Library
          </h2>
          <p className="text-[#9ca3af] text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>


        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <label
            htmlFor="sort-select"
            className="text-[#9ca3af] text-xs uppercase font-medium tracking-wider"
          >
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#15171d] border border-[#2b303d] text-white text-xs sm:text-sm rounded-full pl-4 pr-9 py-2 outline-none focus:border-[#ccff00] cursor-pointer transition"
            >
              <option value="featured">Featured</option>
              <option value="duration">Duration (Shortest)</option>
              <option value="caloriesBurned">Calories (Lowest)</option>
              <option value="rating">Rating (Highest)</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or muscle group (e.g. chest, legs)..."
          className="w-full bg-[#15171d] border border-[#222630] text-white text-sm rounded-full px-5 py-3.5 pr-10 outline-none focus:border-[#ccff00] transition placeholder:text-[#6b7280]"
          aria-label="Search workouts"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-white text-xs"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {loading && (
        <div className="text-center py-20 bg-[#15171d] border border-[#222630] rounded-2xl">
          <div className="inline-block w-8 h-8 border-3 border-[#ccff00] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[#9ca3af] text-sm font-medium">
            Loading workout library...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-16 bg-[#15171d] border border-red-500/30 rounded-2xl px-6">
          <p className="text-red-400 text-sm mb-4">
            Unable to load workouts: {error}
          </p>
          <button
            type="button"
            onClick={loadWorkouts}
            className="px-6 py-2.5 rounded-full bg-[#ccff00] text-[#0c0d10] font-bold text-xs uppercase hover:bg-[#b8e600] transition active:scale-95 shadow-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && sorted.length === 0 && (
        <div className="text-center py-16 bg-[#15171d] border border-[#222630] rounded-2xl px-6">
          <p className="text-[#9ca3af] text-sm mb-3">
            No workouts match &quot;{query}&quot;.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-[#ccff00] hover:underline text-xs font-semibold"
          >
            Clear search filter
          </button>
        </div>
      )}

      {!loading && !error && sorted.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
