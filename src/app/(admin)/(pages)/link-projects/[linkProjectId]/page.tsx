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
import { LinkDesginerMobilePreview } from '@/components/link-designer/link-desginer-mobile-preview';

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
          <LinkDesginerMobilePreview />
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
