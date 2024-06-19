"use client";
import React from 'react'

type Props = { children: React.ReactNode }

const LinkProjectLayoutPage = ({ children }: Props) => {
    return (
        <div className="flex flex-col gap-4 relative">
            <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
                Link Projects
            </h1>
            {children}
        </div>
    )
}

export default LinkProjectLayoutPage
