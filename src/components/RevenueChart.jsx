import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function RevenueChart({ data }) {
  const [chartDimensions, setChartDimensions] = useState({ width: 1220, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) {
          setChartDimensions({ width: "100%", height: 300 });
        } else if (width < 1024) {
          setChartDimensions({ width: "100%", height: 350 });
        } else {
          setChartDimensions({ width: "100%", height: 400 });
        }
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="w-full rounded-xl p-3 sm:p-5 bg-gradient-to-b from-blue-50 to-white shadow overflow-x-auto">
      <ResponsiveContainer width="100%" height={chartDimensions.height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="basic" fill="#60A5FA" />
          <Bar dataKey="premium" fill="#2563EB" />
          <Bar dataKey="pro" fill="#1E3A8A" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
