"use client"
import React, { useCallback, useEffect, useState } from "react";
import BlogCard from "@/components/admin/blog-card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LinkProjectSchema, LinkProjectType } from "@/schema/linkProject.schema";
import { SkeletonLoader } from "@/components/loader/skeleton-loader";
import { onGetLinkProjectPage } from "@/actions/linkProjecs";
import LinkProjectCard from "@/components/builder/link-project-card";


const LinkProjectListPage = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LinkProjectType[] | null>([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Get ProjectLink
  const fetchData = async (curPage: number) => {
    setLoading(true);
    console.log("curPage: " + curPage);
    setCurrentPage(curPage);
    const response = await onGetLinkProjectPage(curPage, perPage)
    if (!response) return;
    setData(response?.data as LinkProjectType[]);
    setTotal(response.total || 0);
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
              <LinkProjectCard
                key={item.linkProjectId}
                index={index}
                {...item}
                onClickHandler={(linkProjectId) => {
                  router.push(`/link-projects/${linkProjectId}`)
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
