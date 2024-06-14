'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from '../global/mode-toggle'
import { Book, Headphones, Search } from 'lucide-react'
import Templates from '@/components/icons/cloud_download'
import { Input } from '@/components/ui/input'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

type Props = {}

const InfoBar = (props: Props) => {

    return (
        <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
            <span className="flex items-center gap-2 font-bold">
                <p className="text-sm font-light text-gray-300">Credits</p>
                {/* {tier == 'Unlimited' ? (
              <span>Unlimited</span>
            ) : (
              <span>
                {credits}/{tier == 'Free' ? '10' : tier == 'Pro' && '100'}
              </span>
            )} */}
            </span>
            <span className="flex gap-2 items-center rounded-full bg-muted px-4">
                <Search />
                <Input
                    placeholder="Quick Search"
                    className="border-none bg-transparent"
                />
            </span>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Headphones />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact Support</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <Book />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Guide</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div className="flex items-center justify-center flex-col gap-8">
                <ModeToggle />
            </div>
            {/* <UserButton /> */}
        </div>
    )
}

export default InfoBar

