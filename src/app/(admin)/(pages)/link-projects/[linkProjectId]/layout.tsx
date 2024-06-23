"use client";
import { Button } from '@/components/ui/button';
import LinkDesignerContextProvider from '@/providers/link-designer-provider';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = { children: React.ReactNode }

const LinkProjectLayoutPage = ({ children }: Props) => {

    const router = useRouter();
  
    return (
        <LinkDesignerContextProvider>
         {children}
        </LinkDesignerContextProvider>
    )
}

export default LinkProjectLayoutPage
