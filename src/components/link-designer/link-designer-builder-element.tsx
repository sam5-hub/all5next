"use client";

import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { FormElementInstance, FormElements } from "./form-elements";
import useLinkDesigner from "@/hooks/use-link-designer";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip } from 'lucide-react';
import { Trash2 } from 'lucide-react';

// link-designer-builder-element
const LinkDesignerBuilderElement = ({ element }: { element: FormElementInstance }) => {
  const { removeElement, selectedElement, setSelectedElement } = useLinkDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false); 

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfLinkDesignerBuilderElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomLinkDesignerBuilderElement: true,
    },
  });


  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isLinkDesignerBuilderElement: true,
    },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // 设置拖动时的透明度
  };
  // const draggable = useDraggable({
  //   id: element.id + "-drag-handler",
  //   data: {
  //     type: element.type,
  //     elementId: element.id,
  //     isLinkDesignerBuilderElement: true,
  //   },
  // });

  // if (draggable.isDragging) return null; // temporary remove the element from designer

  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div
      // ref={draggable.setNodeRef}
      // {...draggable.listeners}
      // {...draggable.attributes}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={cn("relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset",
        selectedElement === element && "ring-1 ring-primary ring-inset"
      )}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottomHalf.setNodeRef} className="absolute  w-full bottom-0 h-1/2 rounded-b-md" />
      {mouseIsOver && (
          <>
            <div className="absolute right-0 h-full">
              <Button
                className="flex justify-center h-full border rounded-md rounded-l-none"
                variant={"outline"}
                onClick={(e) => {
                  e.stopPropagation(); // avoid selection of element while deleting
                  removeElement(element.id);
                }}
              >
                <Trash2 className="h-6 w-6" />
              </Button>
            </div>
          </>
        )}
      {topHalf.isOver && <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />}
      <div
        className={cn(
          "flex flex-row gap-4 w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30",
        )}
      >
        <Grip />
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />}
    </div>
  );
}

export default LinkDesignerBuilderElement;
