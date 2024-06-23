"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { FormElementInstance } from "@/components/link-designer/form-elements";
import { LinkProjectType, LinkType } from "@/schema/linkProject.schema";

type LinkDesignerContextType = {
    elements: FormElementInstance[];
    setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;

    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

    updateElement: (id: string, element: FormElementInstance) => void;

    linkProjectInfo: LinkProjectType | undefined;
    setLinkProjectInfo: Dispatch<SetStateAction<LinkProjectType  | undefined>>;
    themeColor: string | null;
    setThemeColor: Dispatch<SetStateAction<string | null>>;
};
export const LinkDesignerContext = createContext<LinkDesignerContextType | null>(null);

export default function LinkDesignerContextProvider({ children }: { children: ReactNode }) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);
    const [themeColor, setThemeColor] = useState<string | null>(null);
    const [linkProjectInfo, setLinkProjectInfo] = useState<LinkProjectType | undefined>();

    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        });
    };

    const removeElement = (id: string) => {
        setElements((prev) => prev.filter((element) => element.id !== id));
    };

    const updateElement = (id: string, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            const index = newElements.findIndex((el) => el.id === id);
            newElements[index] = element;
            return newElements;
        });
    };


    return (
        <LinkDesignerContext.Provider
            value={{
                elements,
                setElements,
                addElement,
                removeElement,

                selectedElement,
                setSelectedElement,

                updateElement,
                themeColor,
                setThemeColor,

                linkProjectInfo,
                setLinkProjectInfo,
            }}
        >
            {children}
        </LinkDesignerContext.Provider>
    );
}
