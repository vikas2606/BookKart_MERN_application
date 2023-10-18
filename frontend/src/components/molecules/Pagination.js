import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pagesPerPage = window.innerWidth < 640 ? 5 : 10;
  const totalGroups = Math.ceil(totalPages / pagesPerPage);
  const currentGroup = Math.ceil(currentPage / pagesPerPage);

  const startPage = (currentGroup - 1) * pagesPerPage + 1;
  const endPage = Math.min(currentGroup * pagesPerPage, totalPages);

  return (
    <nav className="mx-4 my-4 flex items-center justify-center">
      <ul className="flex flex-wrap -mx-1">
        {currentPage > 1 && (
          <li className="px-1">
            <a
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-2 text-gray-400 bg-gray-700 border border-gray-300 hover:bg-orng hover:text-black rounded-lg"
            >
              Previous
            </a>
          </li>
        )}

        {[...Array(endPage - startPage + 1).keys()].map((i) => {
          const page = startPage + i;
          return (
            <li key={page} className="px-1">
              <a
                href="#"
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 ${
                  page === currentPage
                    ? "text-black bg-orng"
                    : "text-gray-400 bg-gray-700 border border-gray-300"
                } hover:bg-orng hover:text-black rounded-lg`}
              >
                {page}
              </a>
            </li>
          );
        })}

        {currentPage < totalPages && (
          <li className="px-1">
            <a
              href="#"
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-2 text-gray-400 bg-gray-700 border border-gray-300 hover:bg-orng hover:text-black rounded-lg"
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
