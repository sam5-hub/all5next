"use client";
import { Button } from '@/components/ui/button';
import LinkDesignerContextProvider from '@/providers/link-designer-provider';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = { children: React.ReactNode }

const LinkProjectLayoutPage = ({ children }: Props) => {

    const router = useRouter();
  
    return (
        <div className="flex flex-col gap-4 relative h-screen">
            <div className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex flex-row gap-2 items-center justify-between border-b">
                <h1>Link Projects</h1>
                <Button variant={"outline"} onClick={()=>{ router.back(); }}> Back </Button>
            </div>
            <LinkDesignerContextProvider>
                {children}
            </LinkDesignerContextProvider>
            
        </div>
    )
}

export default LinkProjectLayoutPage
