"use client";

import React from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';
import useLinkDesigner from '@/hooks/use-link-designer';
import { FormElements } from './form-elements';
type Props = {
    id?: string
}
export function LinkDesginerMobilePreview(props: Props) {
    const { elements } = useLinkDesigner();

    return (

        <div className="flex h-full items-center justify-center p-6 relative">
            <Image src="/iPhone-Mockup.png" width={372} height={750} alt={''} />
            <div className={cn("absolute z-10 top-1/2 left-1/2 w-80 h-[600px] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2"
                , "flex flex-col justify-center items-center")}>
                 <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
                    {elements.map((element) => {
                    const FormComponent = FormElements[element.type].formComponent;
                    return <FormComponent key={element.id} elementInstance={element} />;
                    })}
                </div>
            </div>

        </div>
    )
}