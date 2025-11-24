export default function SidebarMenuItem({ label, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base ${
        active
          ? "bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)] font-semibold"
          : "text-gray-600 bg-white/70 hover:bg-blue-50 font-medium"
      }`}
    >
      <span className={`text-lg sm:text-xl flex-shrink-0 flex items-center justify-center ${
        active ? "text-white" : "text-blue-500"
      }`}>
        <Icon />
      </span>
      <span className="text-left truncate">{label}</span>
    </button>
  );
}
