import React from "react";
import logo from "../assets/logo.png";   // <-- FIXED PATH

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white/60 py-4 sm:py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-6 sm:w-8" />
        <span className="text-gray-600 font-semibold text-sm sm:text-base">Leaado</span>
      </div>

      <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
        © 2025 Leaado. All Rights Reserved.
      </p>
    </footer>
  );
}
