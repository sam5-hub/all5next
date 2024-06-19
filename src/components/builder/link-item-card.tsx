"use client";
import React from 'react';
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Draggable } from 'react-beautiful-dnd';
import { LinkType } from '@/schema/linkProject.schema';
import { Grip } from 'lucide-react';

type LinkItemCardProps = LinkType & {
    index: number;
    onClickHandler: (linkId: string) => void;
  };
  const LinkItemCard: React.FC<LinkItemCardProps> = ({ linkId, title, url, type, imageUrl, content, sort, createdAt, updatedAt, linkProjectId, index, onClickHandler }) => {
    return (

        <Draggable draggableId={linkId} index={index}>
            {(provided) => (
                <div
                    className={"cursor-pointer bg-black text-gray-100 border rounded-lg p-4 flex flex-row justify-between w-full"}
                    onClick={() => onClickHandler(linkId)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    
                    <div className='flex flex-row gap-2' {...provided.dragHandleProps}>
                        <Grip/>
                        <div>{title}</div>
                        {/* <Image
                                className="mb-5 object-cover"
                                src={imageUrl}
                                alt={imageUrl}
                                width={30}
                                height={30}
                        /> */}
                    </div>
                    <div>{content}</div>
                </div>
            )}
        </Draggable>
    );
};

export default LinkItemCard;