import SearchBar from "./SearchBar";
import LeadsTable from "./LeadsTable";
import Pagination from "./Pagination";

export default function LeadsSection({
  search,
  setSearch,
  leads,
  page,
  totalPages,
  itemsPerPage,
  onPageChange,
  onAddLeads,
  onAddBulk,
  onViewMessage,
}) {
  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Leads Progress</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onAddLeads}
            className="px-3 sm:px-4 py-2 rounded-lg bg-[#0c80ff] text-white text-sm font-semibold hover:bg-[#0a74e6] transition"
          >
            Add Leads
          </button>
          <button
            type="button"
            onClick={onAddBulk}
            className="px-3 sm:px-4 py-2 rounded-lg border border-blue-200 text-[#0c2348] text-sm font-semibold hover:bg-blue-50 transition"
          >
            Bulk Upload
          </button>
        </div>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <LeadsTable
        search={search}
        page={page}
        itemsPerPage={itemsPerPage}
        leads={leads}
        onViewMessage={onViewMessage}
      />

      <Pagination currentPage={page} totalPages={totalPages} setPage={onPageChange} />
    </div>
  );
}
