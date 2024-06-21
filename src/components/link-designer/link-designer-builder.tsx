"use client";

import useLinkDesigner from "@/hooks/use-link-designer";
import React, { useEffect, useState } from "react";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "@/components/ui/button";
import { BiSolidTrash } from "react-icons/bi";
import LinkDesignerBuilderElement from "./link-designer-builder-element";
import LinkDesignerSidebar from "./link-designer-sidebar";
import { ElementsType, FormElements } from "./form-elements";


function LinkDesignerBuilder({ linkProjectId }: { linkProjectId: string }) {
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useLinkDesigner();
  const droppable = useDroppable({
    id: "link-designer-builder-drop-area",
    data: {
      isLinkDesignerBuilderDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      // First scenario : sidebar item to builder area

      const isLinkDesignerSidebarItem = active.data?.current?.isLinkDesignerSidebarItem;
      const isLinkDesignerBuilderDropArea = over.data?.current?.isLinkDesignerBuilderDropArea;

      const droppingSidebarBtnOverDesignerDropArea = isLinkDesignerSidebarItem && isLinkDesignerBuilderDropArea;

      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }

      // Second scenario : sidebar item to builder area & insert between items

      const isTopHalfLinkDesignerBuilderElementDrop = over.data?.current?.isTopHalfLinkDesignerBuilderElement;
      const isBottomLinkDesignerBuilderElementDrop = over.data?.current?.isBottomLinkDesignerBuilderElement;
      const isDroppingOverDesignerElement =
      isTopHalfLinkDesignerBuilderElementDrop || isBottomLinkDesignerBuilderElementDrop;

      const droppingSidebarBtnOverDesignerElement = isLinkDesignerSidebarItem && isDroppingOverDesignerElement;

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isBottomLinkDesignerBuilderElementDrop) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      // Third scenario: swap item on builder area
      const isLinkDesignerBuilderElement = active.data?.current?.isLinkDesignerBuilderElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isLinkDesignerBuilderElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex((el) => el.id === activeId);

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex; // i assume i'm on top-half
        if (isBottomLinkDesignerBuilderElementDrop) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  useEffect(() => {
    console.log("link designer builder linkProjectId", linkProjectId)
  }, []);


  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset",
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">Drop here</p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col  w-full gap-2 p-4">
              {elements.map((element) => (
                <LinkDesignerBuilderElement key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <LinkDesignerSidebar />
    </div>
  );
}
export default LinkDesignerBuilder;
