"use client"
import React, { useCallback, useEffect, useState } from "react";
import BlogCard from "@/components/admin/blog-card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { onGetBlogPage } from "@/actions/blogs";
import { BlogPaginationType, BlogType } from "@/schema/blogs.schema";
import PaginationBar from "@/components/admin/pagination-bar";
import { Loader } from "@/components/loader";
import { SkeletonLoader } from "@/components/loader/skeleton-loader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Image from 'next/image';

const LinkProjectListPage = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BlogType[] | null>([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Get Blog
  const fetchData = async (curPage: number) => {
    setLoading(true);
    console.log("curPage: " + curPage);
    setCurrentPage(curPage);
    const response = await onGetBlogPage(curPage, perPage) as BlogPaginationType
    if (!response) return;
    setData(response?.data as BlogType[]);
    setTotal(response.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div>
       <div className={cn(
        "mt-10 p-4 mb-20",
        "grid gap-5",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      )}>
        {loading ? <SkeletonLoader /> :

          data?.map((item, index) => {
            return (
              <BlogCard
                key={item.blogId}
                blogId={item.blogId}
                title={item.title}
                imageUrl={item.imageUrl}
                description={item.title}
                onClickHandler={(blogId) => {
                  router.push(`/blogs/edit/${blogId}`)
                }
                } />

            )
          })
        }

      </div>
    </div>
  )
}

export default LinkProjectListPage
