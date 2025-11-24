import React from "react";

export default function DateRangePicker({ from, to, setFrom, setTo }) {
  return (
    <div className="flex items-center gap-3">
      <label className="flex items-center gap-2 bg-white/80 border rounded-lg px-3 py-2 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1h1.5A1.5 1.5 0 0118 5.5v10A1.5 1.5 0 0116.5 17H3.5A1.5 1.5 0 012 15.5v-10A1.5 1.5 0 013.5 4H5V3a1 1 0 011-1zM3.5 6a.5.5 0 00-.5.5V8h14V6.5a.5.5 0 00-.5-.5H15v1a1 1 0 11-2 0V6H7v1a1 1 0 11-2 0V6H3.5z"/></svg>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="outline-none text-sm" />
      </label>

      <span className="text-gray-400">-</span>

      <label className="flex items-center gap-2 bg-white/80 border rounded-lg px-3 py-2 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1h1.5A1.5 1.5 0 0118 5.5v10A1.5 1.5 0 0116.5 17H3.5A1.5 1.5 0 012 15.5v-10A1.5 1.5 0 013.5 4H5V3a1 1 0 011-1zM3.5 6a.5.5 0 00-.5.5V8h14V6.5a.5.5 0 00-.5-.5H15v1a1 1 0 11-2 0V6H7v1a1 1 0 11-2 0V6H3.5z"/></svg>
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="outline-none text-sm" />
      </label>
    </div>
  );
}
