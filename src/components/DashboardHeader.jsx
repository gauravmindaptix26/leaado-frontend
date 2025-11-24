import { FiUploadCloud, FiLayers, FiUserPlus } from "react-icons/fi";

export default function DashboardHeader({ onAddBulkLeads, onAddNewClient }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#002A5C]">Dashboard Overview</h1>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">

        <button
          type="button"
          onClick={onAddBulkLeads}
          className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 border border-blue-200 rounded-lg flex items-center justify-center sm:justify-start gap-2 font-semibold text-xs sm:text-sm hover:bg-blue-200 transition"
        >
          <FiLayers /> <span className="hidden sm:inline">Add Bulk Leads</span><span className="sm:hidden">Bulk</span>
        </button>

        <button
          type="button"
          onClick={onAddNewClient}
          className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center sm:justify-start gap-2 shadow hover:bg-blue-700 text-xs sm:text-sm font-semibold transition"
        >
          <FiUserPlus /> <span className="hidden sm:inline">Add New Client</span><span className="sm:hidden">Add</span>
        </button>
      </div>
    </div>
  );
}
