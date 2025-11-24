import React, { useState, useMemo } from "react";
import RevenueChart from "./RevenueChart";
import DateRangePicker from "./DateRangePicker";

const SAMPLE_DATA = [
  { day: "Sun", basic: 150, premium: 700, pro: 500 },
  { day: "Mon", basic: 350, premium: 600, pro: 320 },
  { day: "Tue", basic: 240, premium: 420, pro: 800 },
  { day: "Wed", basic: 300, premium: 880, pro: 1100 },
  { day: "Thu", basic: 420, premium: 680, pro: 540 },
  { day: "Fri", basic: 600, premium: 760, pro: 780 },
  { day: "Sat", basic: 900, premium: 1200, pro: 1000 },
];

export default function RevenueCard() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const data = useMemo(() => SAMPLE_DATA, []); // replace with filtered data by date-range if needed

  return (
    <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-8 sm:mt-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold">Revenue Generated Overview</h3>

        <div className="flex items-center gap-3">
          <DateRangePicker from={from} to={to} setFrom={setFrom} setTo={setTo} />
        </div>
      </div>

      <div className="rounded-lg p-3 sm:p-4 bg-gradient-to-b from-white to-blue-50 overflow-x-auto">
        <RevenueChart data={data} />
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-200 inline-block flex-shrink-0" />
          <div className="text-xs sm:text-sm">Basic Plan</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400 inline-block flex-shrink-0" />
          <div className="text-xs sm:text-sm">Premium Plan</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-800 inline-block flex-shrink-0" />
          <div className="text-xs sm:text-sm">Pro Plan</div>
        </div>
      </div>
    </section>
  );
}
