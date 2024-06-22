"use client";

import React from "react";
import useLinkDesigner from "@/hooks/use-link-designer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FormElements } from "./form-elements";
import LinkDesignerSidebarItem from "./link-designer-sidebar-item";
import { AiOutlineClose } from "react-icons/ai";

function LinkDesignerSidebar() {
  const { selectedElement } = useLinkDesigner();
  return (
    <aside className="w-full flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default LinkDesignerSidebar;


function FormElementsSidebar() {
    return (
      <div>
        <p className="text-sm text-foreground/70">Drag and drop elements</p>
        <Separator className="my-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
          <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Social elements</p>
          <LinkDesignerSidebarItem formElement={FormElements.FacebookField} />
          <LinkDesignerSidebarItem formElement={FormElements.InstagramField} />
          <LinkDesignerSidebarItem formElement={FormElements.TwitterField} />
          <LinkDesignerSidebarItem formElement={FormElements.TiktokField} />
          <LinkDesignerSidebarItem formElement={FormElements.YoutubeField} />
          <LinkDesignerSidebarItem formElement={FormElements.GithubField} />
  
          <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Form elements</p>
          <LinkDesignerSidebarItem formElement={FormElements.TextField} />
          {/* <SidebarBtnElement formElement={FormElements.NumberField} />
          <SidebarBtnElement formElement={FormElements.TextAreaField} />
          <SidebarBtnElement formElement={FormElements.DateField} />
          <SidebarBtnElement formElement={FormElements.SelectField} />
          <SidebarBtnElement formElement={FormElements.CheckboxField} /> */}

          <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Layout elements</p>
          <LinkDesignerSidebarItem formElement={FormElements.TitleField} />
          <LinkDesignerSidebarItem formElement={FormElements.SubTitleField} />

        </div>
      </div>
    );
}

function PropertiesFormSidebar() {
    const { selectedElement, setSelectedElement } = useLinkDesigner();
    if (!selectedElement) return null;
  
    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;
  
    return (
      <div className="flex flex-col p-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-foreground/70">Element properties</p>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              setSelectedElement(null);
            }}
          >
            <AiOutlineClose />
          </Button>
        </div>
        <Separator className="mb-4" />
        <PropertiesForm elementInstance={selectedElement} />
      </div>
    );
  }


