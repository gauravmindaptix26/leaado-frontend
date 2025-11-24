export function StatsCard({ title, value, change, tone = "positive" }) {
  const isPositive = tone === "positive";

  return (
    <div className="bg-[#F6F6F8] rounded-2xl px-4 sm:px-6 py-4 sm:py-5 shadow-sm border border-gray-100">
      <p className="text-gray-500 text-xs sm:text-sm font-medium">{title}</p>
      <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3 flex-wrap">
        <span className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-[#006EF0] via-[#002A5C] to-[#002A5C] text-transparent bg-clip-text">
  {value}
</span>

        <span
          className={`text-xs font-semibold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap ${
            isPositive ? "bg-[#CFF7D7] text-[#118C42]" : "bg-[#FFD6DA] text-[#D7263D]"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}
