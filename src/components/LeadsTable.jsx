import { FiMessageSquare } from "react-icons/fi";

export default function LeadsTable({ search, page, itemsPerPage = 6, leads = [], onViewMessage }) {
  const filtered = leads.filter((item) =>
    `${item.website ?? ""} ${item.status ?? ""} ${item.pitchType ?? ""} ${item.result ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const statusClass = {
    "Email Sent": "bg-green-100 text-green-600",
    "Form Filled": "bg-gray-200 text-gray-600",
    Failed: "bg-red-100 text-red-600",
    Pending: "bg-yellow-100 text-yellow-600",
    "-": "bg-gray-200 text-gray-600"
  };

  const resultClass = {
    Success: "bg-green-600 text-white",
    Pending: "bg-gray-400 text-white",
    Retry: "bg-red-500 text-white",
    "-": "bg-gray-400 text-white"
  };

  return (
    <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-max">
          <thead className="bg-gray-100 text-gray-600 text-xs sm:text-sm sticky top-0">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-5">S No.</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5">Website</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5">Status</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5">Pitch Type</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5">Pitch Result</th>
              <th className="py-2 sm:py-3 px-2 sm:px-5">View</th>
            </tr>
          </thead>

          <tbody className="text-xs sm:text-sm">
            {paginatedData.map((lead, index) => (
              <tr key={`${lead.id ?? lead.website}-${index}`} className="border-t hover:bg-gray-50">
                <td className="py-2 sm:py-4 px-2 sm:px-5 font-medium">
                  {lead.id || `L${startIndex + index + 1}`.padStart(4, "0")}
                </td>
                <td className="py-2 sm:py-4 px-2 sm:px-5 text-blue-600 underline cursor-pointer hover:text-blue-800 break-all">
                  {lead.website}
                </td>

                <td className="py-2 sm:py-4 px-2 sm:px-5">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                      statusClass[lead.status] || statusClass["-"]
                    }`}
                  >
                    {lead.status || "-"}
                  </span>
                </td>

                <td className="py-2 sm:py-4 px-2 sm:px-5">
                  <span className="bg-blue-100 text-blue-600 px-2 sm:px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
                    {lead.pitchType || "-"}
                  </span>
                </td>

                <td className="py-2 sm:py-4 px-2 sm:px-5">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
                      resultClass[lead.result] || resultClass["-"]
                    }`}
                  >
                    {lead.result || "-"}
                  </span>
                </td>

                <td className="py-2 sm:py-4 px-2 sm:px-5">
                  <button
                    type="button"
                    onClick={() => onViewMessage?.(lead)}
                    className="text-blue-600 flex items-center gap-1 hover:text-blue-800 font-medium whitespace-nowrap"
                  >
                    <FiMessageSquare size={16} /> <span className="hidden sm:inline">View</span>
                  </button>
                </td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 text-xs sm:text-sm">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
