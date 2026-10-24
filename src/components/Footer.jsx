import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c0d10] border-t border-[#1f232b] py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-lg p-1"
          aria-label="FitLog Home"
        >
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={22}
            height={22}
            className="w-5 h-5 sm:w-5 sm:h-5 object-contain"
          />
          <span className="font-oswald font-bold text-lg sm:text-xl tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        <p className="text-xs sm:text-sm text-[#9ca3af] font-inter text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
