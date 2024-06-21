"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { FormElementInstance } from "@/components/link-designer/form-elements";

type LinkDesignerContextType = {
    elements: FormElementInstance[];
    setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;

    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

    updateElement: (id: string, element: FormElementInstance) => void;
};
export const LinkDesignerContext = createContext<LinkDesignerContextType | null>(null);

export default function LinkDesignerContextProvider({ children }: { children: ReactNode }) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);

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
            }}
        >
            {children}
        </LinkDesignerContext.Provider>
    );
}
