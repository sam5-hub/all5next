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

const BlogsPage = () => {
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

  const goToPrevPage = () => {
    const curPage = currentPage - 1;
    console.log("curPage: " + curPage);
    fetchData(curPage);

  };

  const goToNextPage = () => {
    const curPage = currentPage + 1;
    console.log("curPage: " + curPage);
    fetchData(curPage);

  };




  return (
    <div className="flex flex-col gap-4 relative">
      <div className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg 
      flex items-center justify-between border-b">
        <p>Blogs</p>
        <div className="flex flex-row gap-4">
          <Button variant={"outline"} onClick={() => router.push("/blogs/create")} className="ml-auto">Add New</Button>
          <Button variant={"outline"} onClick={() => fetchData(1)} className="ml-auto">Refresh</Button>
        </div>
      </div>
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


      <div className="text-4xl sticky botton-0 z-[20] p-6 bg-background/50 backdrop-blur-lg 
      flex items-center justify-between border-b">
        <div className="flex flex-row gap-4">




          <Button variant={"outline"} onClick={() => {
            if (currentPage > 1) {
              goToPrevPage();
            }
          }} className="ml-auto">Prev</Button>

          <Button variant={"outline"} onClick={() => {
            if (currentPage < Math.ceil(total / perPage)) {
              goToNextPage();
            }
          }} className="ml-auto">Next</Button>

        </div>
      </div>
    </div>
  )
}

export default BlogsPage
