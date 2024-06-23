import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import useLinkDesigner from "@/hooks/use-link-designer";
import { UpdateLinkDesignContent } from "@/actions/linkDesigner";
import { toast } from "@/components/ui/use-toast";
import { HiSaveAs } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";

function LinkSaveButton({ linkProjectId }: { linkProjectId?: string }) {
  const { elements } = useLinkDesigner();
  const [loading, startTransition] = useTransition();


  const updateFormContent = async () => {
    try {
      if (!linkProjectId) {
        return;
      }
      const jsonElements = JSON.stringify(elements);
      await UpdateLinkDesignContent(linkProjectId, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
}


export default LinkSaveButton;
