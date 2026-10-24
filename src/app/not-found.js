import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-16 sm:py-24">
      <span className="font-oswald text-7xl sm:text-8xl md:text-9xl font-extrabold text-[#ccff00] tracking-wider leading-none select-none mb-3">
        404
      </span>

      <h1 className="font-oswald text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white tracking-wide mb-3">
        Oops! Workout Not Found
      </h1>

      <p className="text-[#9ca3af] text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase bg-[#ccff00] text-[#0c0d10] hover:bg-[#b8e600] transition active:scale-95 shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Workouts
      </Link>
    </div>
  );
}
