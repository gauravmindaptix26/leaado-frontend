export default function Pagination({ currentPage, totalPages, setPage }) {
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 3; // Pages to show on each side of current page
    const alwaysShow = 2; // Always show first and last pages

    if (totalPages <= 7) {
      // Show all pages if total is small
      return [...Array(totalPages).keys()].map((num) => num + 1);
    }

    // Always add first page
    pages.push(1);

    // Add ellipsis and pages before current page
    if (currentPage > showPages + alwaysShow) {
      pages.push("...");
    }

    // Add pages around current page
    for (
      let i = Math.max(2, currentPage - showPages);
      i <= Math.min(totalPages - 1, currentPage + showPages);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add ellipsis and last page
    if (currentPage < totalPages - showPages - alwaysShow) {
      pages.push("...");
    }

    // Always add last page
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 select-none flex-wrap">
      {/* Previous Btn */}
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className={`px-2 sm:px-4 py-2 rounded-md font-medium transition text-xs sm:text-sm ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100 hover:text-black"
        }`}
      >
        ← <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 flex-wrap">
        {pageNumbers.map((num, index) => (
          <button
            key={index}
            onClick={() => typeof num === "number" && setPage(num)}
            disabled={typeof num === "string"}
            className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition ${
              num === currentPage
                ? "bg-blue-600 text-white"
                : typeof num === "number"
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                : "text-gray-400 cursor-default"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Btn */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
        className={`px-2 sm:px-4 py-2 rounded-md font-medium transition text-xs sm:text-sm ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100 hover:text-black"
        }`}
      >
        <span className="hidden sm:inline">Next</span> →
      </button>
    </div>
  );
}
