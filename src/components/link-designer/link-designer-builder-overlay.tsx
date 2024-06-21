import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { ElementsType, FormElements } from "./form-elements";
import useLinkDesigner from "@/hooks/use-link-designer";
import { LinkDesignerSidebarItemDragOverlay } from "./link-designer-sidebar-item";

function LinkDesignerDragOverlayWrapper() {
  const { elements } = useLinkDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isLinkDesignerSidebarItem = draggedItem.data?.current?.isLinkDesignerSidebarItem;

  // sidebar-item
  if (isLinkDesignerSidebarItem) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <LinkDesignerSidebarItemDragOverlay formElement={FormElements[type]} />;
    return <DragOverlay>{node}</DragOverlay>;
  }

  // builder-item
  const isLinkDesignerBuilderElement = draggedItem.data?.current?.isLinkDesignerBuilderElement;
  if (isLinkDesignerBuilderElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent = FormElements[element.type].designerComponent;

      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
      return <DragOverlay>{node}</DragOverlay>;
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default LinkDesignerDragOverlayWrapper;
