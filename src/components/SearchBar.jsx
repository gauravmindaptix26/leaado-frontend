export default function SearchBar({ search, setSearch }) {
  return (
    <div className="flex items-center gap-2 w-full border rounded-lg p-2 sm:p-3 shadow-sm bg-white mb-4 sm:mb-6">
      <span className="text-gray-500 text-lg sm:text-xl flex-shrink-0">🔍</span>

      <input
        type="text"
        placeholder="Search by website, status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full outline-none text-xs sm:text-sm placeholder-gray-400"
      />
    </div>
  );
}
