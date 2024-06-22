"use client";

import React, { useEffect, useState } from "react";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";
import useLinkDesigner from "@/hooks/use-link-designer";
import LinkDesignerDragOverlayWrapper from "./link-designer-builder-overlay";
import LinkDesignerBuilder from "./link-designer-builder";
import LinkPreviewButton from "./link-preview-button";
import LinkSaveButton from "./link-save-button";
import LinkPublishButton from "./link-publish-button";
import { LinkProjectType } from "@/schema/linkProject.schema";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { LinkDesginerMobilePreview } from '@/components/link-designer/link-desginer-mobile-preview';
import LinkDesignerSidebar from "./link-designer-sidebar";
// link-designer-builder-workspace
function LinkDesignerBuilderWorkspace({ linkProjectData }: { linkProjectData: LinkProjectType }) {
  const { setElements, setSelectedElement } = useLinkDesigner();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  //   useEffect(() => {
  //     if (isReady) return;
  //     const elements = JSON.parse("{}") //linkProjectData.content
  //     setElements(elements);
  //     setSelectedElement(null);
  //     const readyTimeout = setTimeout(() => setIsReady(true), 500);
  //     return () => clearTimeout(readyTimeout);
  //   }, [linkProjectData, setElements, isReady, setSelectedElement]);

  //   if (!isReady) {
  //     return (
  //       <div className="flex flex-col items-center justify-center w-full h-full">
  //         <ImSpinner2 className="animate-spin h-12 w-12" />
  //       </div>
  //     );
  //   }

  //   const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;


  return (
    <DndContext sensors={sensors}>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded-lg  border-b"
      >

        <ResizablePanel defaultSize={15}>
        <LinkDesignerSidebar />

        </ResizablePanel>
        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={65}>
          <main className="flex flex-col w-full min-h-screen">
            <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
              <h2 className="truncate font-medium">
                <span className="text-muted-foreground mr-2">Link Projec :</span>
                {linkProjectData.title}
              </h2>
              <div className="flex items-center gap-2">
                <LinkPreviewButton />
                <LinkSaveButton id={linkProjectData.linkProjectId} />
                <LinkPublishButton id={linkProjectData.linkProjectId} />
              </div>
            </nav>
            <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/builder/paper.svg)] dark:bg-[url(/builder/paper-dark.svg)]">
              <LinkDesignerBuilder linkProjectId="A01" />
            </div>
          </main>
          <LinkDesignerDragOverlayWrapper />
        </ResizablePanel>
        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={20}>
          <LinkDesginerMobilePreview />
        </ResizablePanel>

      </ResizablePanelGroup>


    </DndContext>
  );
}

export default LinkDesignerBuilderWorkspace;
