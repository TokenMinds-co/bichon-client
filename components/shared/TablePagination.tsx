import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

const getPaginationRange = (currentPage: number, totalPages: number) => {
  const maxPageNumbersToShow = 5;
  const totalPageNumbers = totalPages;

  // If total pages are less than or equal to the max number to show, return all pages
  if (totalPageNumbers <= maxPageNumbersToShow) {
    return Array.from({ length: totalPageNumbers }, (_, i) => i + 1);
  }

  const pages = [];

  if (currentPage <= 3) {
    pages.push(1, 2, 3, 4, "...", totalPageNumbers);
  } else if (currentPage >= totalPageNumbers - 2) {
    pages.push(
      1,
      "...",
      totalPageNumbers - 3,
      totalPageNumbers - 2,
      totalPageNumbers - 1,
      totalPageNumbers
    );
  } else {
    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPageNumbers
    );
  }

  return pages;
};

const TablePagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
}: TablePaginationProps) => {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem className="hidden md:block md:mr-2">
          <PaginationPrevious
          className="text-white"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
          />
        </PaginationItem>

        {paginationRange.map((page, i) =>
          page === "..." ? (
            <PaginationItem className="text-white" key={i}>
              <span>...</span>
            </PaginationItem>
          ) : (
            <PaginationItem className={`${currentPage === page ? "text-black" : "text-white"}`} key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page as number);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem className="hidden md:block md:ml-2">
          <PaginationNext
            className="text-white"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
