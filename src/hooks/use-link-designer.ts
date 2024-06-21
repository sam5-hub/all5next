"use client";

import { useContext } from "react";
import { LinkDesignerContext } from "@/providers/link-designer-provider";

const useLinkDesigner = () => {
    const context = useContext(LinkDesignerContext);
    if (!context) {
        throw new Error("useLinkDesigner must be used within a LinkDesignerContext");
    }
    return context;
}
export default useLinkDesigner;