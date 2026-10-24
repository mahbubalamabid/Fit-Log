"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount = 0, savedCount = 0 } = useWorkout();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0d10]/95 backdrop-blur-md border-b border-[#222630]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="FitLog"
            width={26}
            height={26}
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
            priority
          />
          <span className="font-oswald font-bold text-xl sm:text-2xl tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#1a2312] text-[#ccff00] border border-[#ccff00]/30 shadow-sm"
                    : "text-[#9ca3af] hover:text-white hover:bg-[#15171d]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">

          <Link
            href="/my-plan"
            className="bg-[#ccff00] hover:bg-[#b8e600] text-[#0c0d10] font-bold text-xs uppercase px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm"
          >
            <span>Plan</span>
            <span className="bg-[#0c0d10]/15 text-[#0c0d10] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center text-[11px]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="border border-[#2b303d] bg-[#15171d] hover:border-[#374151] hover:bg-[#1c1f26] text-[#e5e7eb] font-medium text-xs px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <span>Saved</span>
            <span className="bg-[#222630] text-[#9ca3af] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center text-[11px]">
              {savedCount}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#15171d]"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#222630] bg-[#0c0d10] px-4 py-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#1a2312] text-[#ccff00] border border-[#ccff00]/30"
                    : "text-[#9ca3af] hover:text-white hover:bg-[#15171d]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}