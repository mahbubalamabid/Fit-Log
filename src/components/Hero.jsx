import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-4">
      <div className="bg-[#15171d] rounded-2xl sm:rounded-3xl border border-[#222630] grid md:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-12">
        <div>
          <p className="text-[#ccff00] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            Workout Library
          </p>
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight text-white">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>
          <p className="mt-4 text-[#9ca3af] text-sm sm:text-base leading-relaxed max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase bg-[#ccff00] text-[#0c0d10] hover:bg-[#b8e600] transition active:scale-95 shadow-sm"
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Browse Workouts
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0c0d10] border border-[#222630]/60 p-2 sm:p-4">
            <Image
              src="/banner.png"
              alt="FitLog Workout Banner"
              fill
              priority
              className="object-contain p-1 sm:p-2"
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
