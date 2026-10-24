export default function PlanSummary({
  totalPlanned = 0,
  completedCount = 0,
  totalMinutes = 0,
  totalCalories = 0,
  loaded = false,
}) {
  return (
    <div className="mb-6 bg-[#13161d] border border-[#222630] rounded-2xl overflow-hidden shadow-sm grid grid-cols-2 lg:grid-cols-4">
      <div className="py-4 sm:py-5 px-5 sm:px-6 flex flex-col justify-center border-b lg:border-b-0 border-r border-[#222630]">
        <span className="text-[#9ca3af] text-[11px] font-semibold uppercase tracking-wider mb-1.5">
          Planned Workouts
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-oswald text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-none">
            {loaded ? totalPlanned : 0}
          </span>
          <span className="text-xs text-[#6b7280]">/ 5 max</span>
        </div>
      </div>

      <div className="py-4 sm:py-5 px-5 sm:px-6 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#222630]">
        <span className="text-[#9ca3af] text-[11px] font-semibold uppercase tracking-wider mb-1.5">
          Completed
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-oswald text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ccff00] leading-none">
            {loaded ? completedCount : 0}
          </span>
          <span className="text-xs text-[#6b7280]">
            of {loaded ? totalPlanned : 0} done
          </span>
        </div>
      </div>

      <div className="py-4 sm:py-5 px-5 sm:px-6 flex flex-col justify-center border-r border-[#222630]">
        <span className="text-[#9ca3af] text-[11px] font-semibold uppercase tracking-wider mb-1.5">
          Estimated Duration
        </span>
        <div className="flex items-baseline gap-1">
          <span className="font-oswald text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-none">
            {loaded ? totalMinutes : 0}
          </span>
          <span className="text-xs text-[#9ca3af]">min</span>
        </div>
      </div>

      <div className="py-4 sm:py-5 px-5 sm:px-6 flex flex-col justify-center">
        <span className="text-[#9ca3af] text-[11px] font-semibold uppercase tracking-wider mb-1.5">
          Calories Burned
        </span>
        <div className="flex items-baseline gap-1">
          <span className="font-oswald text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-none">
            {loaded ? totalCalories : 0}
          </span>
          <span className="text-xs text-[#9ca3af]">kcal</span>
        </div>
      </div>
    </div>
  );
}
