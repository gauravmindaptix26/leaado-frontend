import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const stickerVariants = {
  male: {
    gradient: "from-blue-200 via-blue-100 to-blue-300",
    accent: "text-blue-600",
    emoji: "👦"
  },
  female: {
    gradient: "from-pink-200 via-pink-100 to-fuchsia-200",
    accent: "text-pink-600",
    emoji: "👧"
  }
};

export default function SidebarUserCard() {
  const { auth } = useContext(AuthContext);
  const userName = auth?.user?.fullName || "User";
  const email = auth?.user?.email || "user@example.com";
  const genderKey = auth?.user?.gender?.toLowerCase() === "female" ? "female" : "male";
  const sticker = stickerVariants[genderKey];
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    setIsSettled(false);
    const timer = setTimeout(() => setIsSettled(true), 1300);
    return () => clearTimeout(timer);
  }, [genderKey]);

  return (
    <div className="flex flex-col items-center text-center mt-6 sm:mt-8">
      <div className="relative w-28 sm:w-40 h-28 sm:h-40 mb-3 sm:mb-4">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${sticker.gradient} opacity-80 blur-sm animate-pulse`}
        />
        <div className="absolute inset-3 rounded-full bg-white shadow-xl flex items-center justify-center text-4xl sm:text-6xl">
          <span className={isSettled ? "" : "animate-bounce"}>{sticker.emoji}</span>
        </div>
        <div
          className={`absolute inset-1 rounded-full border-2 border-white/40 ${
            isSettled ? "" : "animate-spin"
          }`}
        />
      </div>

      <h2 className="text-base sm:text-lg font-semibold text-gray-800">Hi, {userName.split(" ")[0]}</h2>
      <p className="text-xs sm:text-sm text-gray-500 truncate max-w-xs">{email}</p>
    </div>
  );
}
