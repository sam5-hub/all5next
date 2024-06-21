"use client";
import React, { useCallback, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Image from 'next/image';
import { cn } from '@/lib/utils';
// import LinkProjectBuilder from '@/components/builder/link-project-builder';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { onGetLinkProjectData } from '@/actions/linkProjecs';
import { LinkProjectType, LinkType } from '@/schema/linkProject.schema';
import { onGetLinkList } from '@/actions/links';
import { LinkProject } from '@prisma/client';
import LinkDesignerBuilderWorkspace from '@/components/link-designer/link-designer-builder-workspace';
import { title } from 'process';
import { LinkDesignerContext } from '@/providers/link-designer-provider';

type Props = { params: { linkProjectId: string } }

const LinkProjectDetailPage = (prop : Props) => {

  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const pathname = usePathname();
  // const linkProjectId = pathname.split('/').pop();
  const linkProjectId = prop.params.linkProjectId;
  const linkProjectData: LinkProjectType = {
    linkProjectId: "001",
    title: "test1",
    imageUrl: "test1",
    content: "test1"

  };
  return (
    <div>
       {/* <LinkDesignerBuilderWorkspace linkProjectData={linkProjectData}/> */}
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded-lg  border-b"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6 relative">
            <Image src="/iPhone-Mockup.png" width={372} height={750} alt={''} />
            <div className={cn("absolute z-10 top-1/2 left-1/2 w-80 h-[600px] transform -translate-x-1/2 -translate-y-1/2"
              , "bg-white text-gray-900 flex flex-col justify-center items-center")}>
              <p>Mobile</p>
            </div>

          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <LinkDesignerBuilderWorkspace linkProjectData={linkProjectData}/>
        </ResizablePanel>
      </ResizablePanelGroup>  
    </div>
  )
}

export default LinkProjectDetailPage
