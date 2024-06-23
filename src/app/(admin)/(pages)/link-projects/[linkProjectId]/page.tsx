"use client";
import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { onGetLinkProjectData } from '@/actions/linkProjecs';
import { LinkProjectType, LinkType } from '@/schema/linkProject.schema';
import LinkDesignerBuilderWorkspace from '@/components/link-designer/link-designer-builder-workspace';
import useLinkDesigner from '@/hooks/use-link-designer';

type Props = { params: { linkProjectId: string } }

const LinkProjectDetailPage = (prop: Props) => {

  return (
    <div className='w-full h-screen'>
      <LinkDesignerBuilderWorkspace linkProjectId={prop.params.linkProjectId}/>
    </div>
  )
}

export default LinkProjectDetailPage
