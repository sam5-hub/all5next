"use client"

import React, { useState } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from 'next/link';


interface CopyButtonProps {
  valueToCopy: string;
  href: string;
}
const CopyLinkButton: React.FC<CopyButtonProps> = ({ valueToCopy, href }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(valueToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });

    
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>

          <Button variant="outline" className='truncate w-full max-w-xs flex flex-row justify-between'>
            <p className="truncate max-w-xs">{copied ? 'Copied!' : valueToCopy}</p>
            <Link href={href} target="_blank" rel="noopener noreferrer">
              <OpenLinkIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>


        </TooltipTrigger>
        <TooltipContent>
          <p>Go to this Link</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
const OpenLinkIcon = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="11 9 14 2 20 8" />
      <line x1="14" y1="2" x2="14" y2="9" />
    </svg>
  );
};
const ClipboardIcon = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
};

export default CopyLinkButton;
