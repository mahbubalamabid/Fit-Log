import Link from "next/link";
import Image from "next/image";

export default function WorkoutCard({ workout }) {
  if (!workout) return null;

  const {
    id,
    name = "Untitled Workout",
    image,
    muscleGroups = [],
    equipment,
    duration = 0,
    caloriesBurned = 0,
    rating = 0,
  } = workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="group block bg-[#15171d] hover:bg-[#1c1f26] rounded-2xl overflow-hidden border border-[#222630] hover:border-[#374151] transition flex flex-col shadow-sm"
    >
      <div className="relative w-full aspect-[4/3] bg-[#0c0d10] overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top group-hover:scale-105 transition duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#6b7280] text-xs">
            No image available
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>

          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {muscleGroups.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase bg-[#ccff00] text-[#0c0d10] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-oswald font-bold uppercase text-white text-base sm:text-lg mb-1 group-hover:text-[#ccff00] transition-colors">
            {name}
          </h3>

          {equipment && (
            <p className="text-[#9ca3af] text-xs mb-4 line-clamp-1">
              {equipment}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-[#222630] flex items-center gap-3 text-xs text-[#9ca3af]">
          <span>⏱ {duration} min</span>
          <span>🔥 {caloriesBurned} kcal</span>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}
