import Image from "next/image";
import Link from "next/link";

export default function PlanWorkoutCard({
  workout,
  activeTab = "plan",
  isInPlan = false,
  onToggleDone,
  onRemove,
  onAddToPlan,
}) {
  if (!workout) return null;

  const isDone = Boolean(workout.done);

  return (
    <div
      className={`bg-[#14171e] hover:bg-[#181c24] border border-[#232732] rounded-2xl p-3.5 sm:p-4 transition flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4 shadow-sm ${
        isDone ? "border-[#ccff00]/30 bg-[#161a20]" : ""
      }`}
    >
      <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
        <div className="relative w-28 h-20 sm:w-36 sm:h-20 rounded-xl overflow-hidden bg-[#0c0d10] flex-shrink-0 border border-[#232732]">
          {workout.image ? (
            <Image
              src={workout.image}
              alt={workout.name || "Workout"}
              fill
              className="object-cover"
              sizes="144px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#6b7280] text-xs">
              No image
            </div>
          )}

          {isDone && (
            <div className="absolute top-1.5 left-1.5 bg-[#ccff00] text-[#0c0d10] text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Done</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Link
              href={`/workout/${workout.id}`}
              className="font-oswald font-bold uppercase text-white text-base sm:text-lg tracking-wide hover:text-[#ccff00] transition line-clamp-1"
            >
              {workout.name}
            </Link>
            {isDone && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20 px-2 py-0.5 rounded-full">
                Completed
              </span>
            )}
          </div>

          <p className="text-[#9ca3af] text-xs mb-2 line-clamp-1">
            {workout.equipment || "No equipment"}
            {workout.difficulty && <span> • {workout.difficulty}</span>}
          </p>

          <div className="flex items-center flex-wrap gap-3.5 text-xs text-[#9ca3af]">
            <span className="flex items-center gap-1">
              <span className="text-[#ccff00]">⏱</span> {workout.duration || 0} min
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[#ccff00]">🔥</span>{" "}
              {workout.caloriesBurned || 0} kcal
            </span>
            {workout.rating !== undefined && (
              <span className="flex items-center gap-1">
                <span className="text-[#ccff00]">⭐</span> {workout.rating}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap justify-end pt-2 sm:pt-0 border-t border-[#222630] md:border-t-0">
        {activeTab === "plan" ? (
          <>
            <button
              type="button"
              onClick={() => onToggleDone(workout)}
              className={`text-xs font-bold uppercase px-4 py-2 rounded-full flex items-center gap-1.5 transition active:scale-95 shadow-sm whitespace-nowrap ${
                isDone
                  ? "bg-[#1a2312] border border-[#ccff00]/40 text-[#ccff00] hover:bg-[#223018]"
                  : "bg-[#ccff00] hover:bg-[#b8e600] text-[#0c0d10]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{isDone ? "Completed" : "Mark as Done"}</span>
            </button>
            <Link
              href={`/workout/${workout.id}`}
              className="border border-[#374151] hover:border-[#4b5563] bg-[#1a1e27] hover:bg-[#252a36] text-white font-medium text-xs px-4 py-2 rounded-full transition text-center whitespace-nowrap"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={() => onRemove(workout)}
              title="Remove from plan"
              aria-label="Remove from plan"
              className="w-8 h-8 rounded-full border border-[#2b303d] hover:border-red-500/40 text-[#9ca3af] hover:text-red-400 hover:bg-red-500/10 transition flex items-center justify-center flex-shrink-0"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        ) : (
          <>
            {isInPlan ? (
              <span className="bg-[#1a2312] border border-[#ccff00]/30 text-[#ccff00] text-xs font-semibold px-3.5 py-1.5 rounded-full">
                In Today’s Plan
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onAddToPlan(workout)}
                className="bg-[#ccff00] hover:bg-[#b8e600] text-[#0c0d10] font-bold text-xs uppercase px-4 py-2 rounded-full flex items-center gap-1.5 transition active:scale-95 shadow-sm whitespace-nowrap"
              >
                + Add to Plan
              </button>
            )}

            <Link
              href={`/workout/${workout.id}`}
              className="border border-[#374151] hover:border-[#4b5563] bg-[#1a1e27] hover:bg-[#252a36] text-white font-medium text-xs px-4 py-2 rounded-full transition text-center whitespace-nowrap"
            >
              View Details
            </Link>

            <button
              type="button"
              onClick={() => onRemove(workout)}
              title="Remove from saved"
              aria-label="Remove from saved"
              className="w-8 h-8 rounded-full border border-[#2b303d] hover:border-red-500/40 text-[#9ca3af] hover:text-red-400 hover:bg-red-500/10 transition flex items-center justify-center flex-shrink-0"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
