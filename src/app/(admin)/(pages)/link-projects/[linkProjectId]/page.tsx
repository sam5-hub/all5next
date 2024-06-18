"use client";
import React, { useCallback, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import LinkProjectBuilder from '@/components/builder/link-project-builder';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { onGetLinkProjectData } from '@/actions/linkProjecs';
import { LinkType } from '@/schema/linkProjects.schema';

const LinkProjectDetailPage = ({ linkProjectId } : {
  linkProjectId?: string | null 
}) => {

  const pathname = usePathname()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [linkList, setLinkList] = useState<LinkType[]>([])

  const getLinkProjectDetail = useCallback(async () => {
    setLoading(true);
    const responseData = await onGetLinkProjectData(linkProjectId);
      if (responseData && responseData.data) {
        formMethod.reset(responseData.data as BlogType); // Set form values to fetched data
      }
    setLoading(false);
  }, [blogId]);

  useEffect(() => {
    getBlogDetail();
  }, [blogId]);

  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-[90%] rounded-lg  border-b"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6 relative">
            <Image src="/iPhone-Mockup.png" width={372} height={750} alt={''} />
            <div className={cn("absolute z-10 top-1/2 left-1/2 w-80 h-[600px] transform -translate-x-1/2 -translate-y-1/2"
              , "bg-white text-gray-900 flex flex-col justify-center items-center")}>
              <p>Mobile</p>
              <p>Mobile</p>
            </div>

          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex items-center justify-center p-6 h-[1000px]">
            <p className="font-semibold">Operation</p>
            <LinkProjectBuilder />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default LinkProjectDetailPage
