"use client";

import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppPaginationProps {
  page: number;
  totalPages: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  showItemsPerPage?: boolean;
  showPageInfo?: boolean;
}

export function AppPagination({
  page,
  totalPages,
  totalItems = 0,
  onPageChange,
  itemsPerPage = 10,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 30, 40, 50],
  showItemsPerPage = true,
  showPageInfo = true,
}: AppPaginationProps) {
  if (totalPages <= 1 && !showItemsPerPage) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pages = useMemo(() => {
    if (totalPages <= 1) return [];

    const result: (number | "ellipsis")[] = [];
    const siblingCount = 1;
    const leftSibling = Math.max(page - siblingCount, 0);
    const rightSibling = Math.min(page + siblingCount, totalPages - 1);

    const showLeftEllipsis = leftSibling > 1;
    const showRightEllipsis = rightSibling < totalPages - 2;

    result.push(0);

    if (showLeftEllipsis) {
      result.push("ellipsis");
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 0 && i !== totalPages - 1) {
        result.push(i);
      }
    }

    if (showRightEllipsis) {
      result.push("ellipsis");
    }

    if (totalPages > 1) {
      result.push(totalPages - 1);
    }

    return [...new Set(result)];
  }, [page, totalPages]);

  const handlePrevious = () => {
    if (page > 0) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      onPageChange(page + 1);
    }
  };

  const startItem = page * itemsPerPage + 1;
  const endItem = Math.min((page + 1) * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-4 order-2 sm:order-1">
        {showPageInfo && totalItems > 0 && (
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {startItem}-{endItem} de {totalItems}
          </span>
        )}

        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
              Mostrar:
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(val) => onItemsPerPageChange(parseInt(val))}
            >
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600 dark:text-gray-400 sm:hidden">
              / página
            </span>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className="order-1 sm:order-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                className={page <= 0 ? "pointer-events-none opacity-50" : ""}
                aria-disabled={page <= 0}
              />
            </PaginationItem>

            {pages.map((item, index) =>
              item === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    onClick={() => onPageChange(item)}
                    isActive={item === page}
                    className="transition-all duration-200 ease-in-out hover:scale-105"
                  >
                    {item + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                className={
                  page >= totalPages - 1 ? "pointer-events-none opacity-50" : ""
                }
                aria-disabled={page >= totalPages - 1}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
