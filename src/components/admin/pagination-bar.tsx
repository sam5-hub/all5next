"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

// {
//   "data": [/* 数据数组 */],
//   "total": 100, // 总记录数
//   "perPage": 10, // 每页记录数
//   "currentPage": 1 // 当前页码
// }
interface PaginationBarProp {
  total: number;
  perPage: number;
  currentPage: number;
  onChange: (page: number) => void;
}


const PaginationBar: React.FC<PaginationBarProp> = ({ total, perPage, currentPage, onChange }) => {

  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page);
    }
  };


  return (
    <Pagination>
      <PaginationContent>
      <PaginationItem>
          <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} />
        </PaginationItem>

        <PaginationItem>
          <p>{currentPage}</p>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;

