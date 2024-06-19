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
import { LinkProjectType, LinkType } from '@/schema/linkProject.schema';
import { onGetLinkList } from '@/actions/links';
import { LinkProject } from '@prisma/client';

type Props = { params: { linkProjectId: string } }

const LinkProjectDetailPage = (prop : Props) => {

  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const pathname = usePathname();
  // const linkProjectId = pathname.split('/').pop();
  const linkProjectId = prop.params.linkProjectId;
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
          <div className="flex flex-col gap-4 items-center justify-center p-6 h-screen auto">
            <LinkProjectBuilder linkProjectId={linkProjectId}/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default LinkProjectDetailPage
