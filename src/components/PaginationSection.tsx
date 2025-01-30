import { FC } from "react";
import { PaginationMeta } from "@/types/pagination";

interface PaginationSectionProps extends PaginationMeta {
  onChangePage: (page: number) => void;
}

const PaginationSection: FC<PaginationSectionProps> = ({
  page,
  take,
  total,
  onChangePage,
}) => {
  const totalPages = Math.ceil(total / take);

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (page <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => page > 1 && onChangePage(page - 1)}
        disabled={page <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div className="flex items-center gap-2">
        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            onClick={() => typeof pageNum === "number" && onChangePage(pageNum)}
            disabled={pageNum === "..."}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              pageNum === page
                ? "bg-blue-600 text-white"
                : pageNum === "..."
                  ? "cursor-default text-gray-400"
                  : "text-gray-700 hover:bg-gray-100"
            } `}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <button
        onClick={() => page < totalPages && onChangePage(page + 1)}
        disabled={page >= totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default PaginationSection;
