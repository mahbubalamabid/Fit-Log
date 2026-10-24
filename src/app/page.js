import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";

export const metadata = {
  title: "FitLog — Workout Library & Gym Companion",
  description:
    "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Hero />
      <LibrarySection />
    </div>
  );
}
