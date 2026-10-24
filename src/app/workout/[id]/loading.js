export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center">
      <div className="inline-block w-8 h-8 border-3 border-[#ccff00] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[#9ca3af] text-sm font-medium">
        Loading workout details...
      </p>
    </div>
  );
}
