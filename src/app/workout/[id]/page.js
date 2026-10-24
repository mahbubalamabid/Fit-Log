import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export const instant = false;

export default async function WorkoutDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  let workout = null;
  let error = null;

  try {
    workout = await getWorkoutById(id);
    if (!workout || (typeof workout === "object" && !workout.id && !workout.name)) {
      notFound();
    }
  } catch (err) {
    const msg = err?.message || "";
    if (msg.includes("404") || msg.toLowerCase().includes("not found")) {
      notFound();
    }
    error = msg || "Failed to load workout details";
  }

  if (error || !workout) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-lg mx-auto text-center py-12 px-6 bg-[#15171d] border border-red-500/30 rounded-2xl">
          <p className="text-red-400 text-sm mb-4">
            Unable to load workout: {error}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/workout/${id}`}
              className="px-6 py-2.5 rounded-full bg-[#ccff00] text-[#0c0d10] font-bold text-xs uppercase hover:bg-[#b8e600] transition active:scale-95 shadow-sm"
            >
              Retry
            </Link>
            <Link
              href="/#library"
              className="px-5 py-2.5 rounded-full border border-[#2b303d] text-[#e5e7eb] text-xs font-semibold hover:bg-[#1c1f26] transition"
            >
              Back to Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    name = "Untitled Workout",
    image,
    muscleGroups = [],
    difficulty = "All Levels",
    equipment = "None",
    duration = 0,
    caloriesBurned = 0,
    rating = 0,
    sets = "—",
    reps = "—",
    description = "",
    instructions = [],
  } = workout;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="relative w-full aspect-square lg:aspect-[3/4] bg-[#15171d] rounded-2xl sm:rounded-3xl border border-[#222630] overflow-hidden flex items-center justify-center shadow-sm">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          ) : (
            <div className="text-[#6b7280] text-sm font-medium">
              No image available
            </div>
          )}
        </div>

        <div>
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white tracking-wide leading-tight mb-3">
            {name}
          </h1>
          {description && (
            <p className="text-[#9ca3af] text-sm sm:text-base leading-relaxed mb-4">
              {description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {muscleGroups.map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold uppercase bg-[#ccff00] text-[#0c0d10] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="bg-[#15171d] border border-[#222630] rounded-2xl overflow-hidden divide-y divide-[#222630]">
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">
                Equipment
              </span>
              <span className="text-white font-medium">{equipment}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">
                Difficulty
              </span>
              <span className="text-white font-medium">{difficulty}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">
                Sets
              </span>
              <span className="text-white font-medium">{sets}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">
                Reps
              </span>
              <span className="text-white font-medium">{reps}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">
                Duration
              </span>
              <span className="text-white font-medium">{duration} min</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">
                Calories
              </span>
              <span className="text-white font-medium">
                {caloriesBurned} kcal
              </span>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[#9ca3af] text-xs font-semibold uppercase tracking-wider">
                Rating
              </span>
              <span className="text-white font-medium flex items-center gap-1">
                ⭐ {rating}
              </span>
            </div>
          </div>

          {Array.isArray(instructions) && instructions.length > 0 && (
            <div className="mt-6 bg-[#15171d] border border-[#222630] rounded-2xl p-5 sm:p-6">
              <h2 className="font-oswald text-xl font-bold uppercase text-white tracking-wide mb-4">
                Instructions
              </h2>
              <ol className="space-y-3.5">
                {instructions.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3.5 text-sm text-[#e5e7eb] leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1c1f26] border border-[#2b303d] text-[#ccff00] font-bold text-xs flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-6 sm:mt-8">
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
