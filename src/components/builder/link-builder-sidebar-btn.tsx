"use client";
import React, { useState } from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormElement } from "../link-designer/form-elements";

type SidebarBtnElementProps = {
  formElement: FormElement;
  index: number;
};

function SidebarBtnElement({ formElement, index }: SidebarBtnElementProps) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Draggable draggableId={`designer-btn-${formElement.type}`} index={index}>
      {(provided, snapshot: DraggableStateSnapshot) => (

        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={cn(
              "z-10 flex flex-col gap-2 h-[120px] w-[120px] border p-4")}
          >
            <Icon className="h-8 w-8 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
          </div>
        </div>

      )}
    </Draggable>
  );
}

export default SidebarBtnElement;

type SidebarBtnElementDragOverlayProps = {
  formElement: FormElement;
  snapshot: DraggableStateSnapshot;
};

export function SidebarBtnElementDragOverlay({
  formElement,
  snapshot
}: SidebarBtnElementDragOverlayProps) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] border p-4"  )}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </div>

  );
}
