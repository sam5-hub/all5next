"use client";
import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ConnectionsPage = () => {
  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Connections
      </h1>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-[90%] rounded-lg  border-b"
      >
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6 relative">
            <Image src="/iPhone-Mockup.png" width={372} height={750} alt={''}/>
            <div className={cn("absolute z-10 top-1/2 left-1/2 w-80 h-[600px] transform -translate-x-1/2 -translate-y-1/2"
              ,"bg-white text-gray-900 flex flex-col justify-center items-center")}>
              <p>Mobile</p>
              <p>Mobile</p>
            </div>

          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex items-center justify-center p-6 h-[1000px]">
            <span className="font-semibold">Operation</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

    </div>
  )
}

export default ConnectionsPage
