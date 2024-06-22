"use client";

import useLinkDesigner from "@/hooks/use-link-designer";
import React, { useEffect, useState } from "react";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { idGenerator } from "@/lib/idGenerator";
import LinkDesignerBuilderElement from "./link-designer-builder-element";
import { ElementsType, FormElements } from "./form-elements";
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function LinkDesignerBuilder({ linkProjectId }: { linkProjectId: string }) {
  const { elements, setElements, addElement, selectedElement, setSelectedElement, removeElement } = useLinkDesigner();
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
      const isOverLinkDesignerBuilderElement = over.data?.current?.isLinkDesignerBuilderElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isOverLinkDesignerBuilderElement && isLinkDesignerBuilderElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        console.log("Third scenario: swap item on builder area - draggingDesignerElementOverAnotherDesignerElement", active, over);

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
        return;

      } else if (active.id !== over.id) {


        setElements((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    },
  });

  useEffect(() => {
    console.log("link designer builder linkProjectId", linkProjectId)
  }, []);


  return (


    <div
      className="p-4 w-full h-[70vh] overflow-auto-y"
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
            <SortableContext items={elements} strategy={verticalListSortingStrategy}>
              {elements.map((element) => (
                <LinkDesignerBuilderElement key={element.id} element={element} />
              ))}
            </SortableContext>

          </div>
        )}
      </div>
    </div>
  );
}
export default LinkDesignerBuilder;
