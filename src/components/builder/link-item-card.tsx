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
import { LinkType } from '@/schema/linkProjects.schema';

type LinkItemCardProps = LinkType & {
    index: number;
    onClickHandler: (linkId: string) => void;
  };
  const LinkItemCard: React.FC<LinkItemCardProps> = ({ linkId, title, url, type, imageUrl, content, sort, createdAt, updatedAt, linkProjecId, index, onClickHandler }) => {
    return (

        <Draggable draggableId={linkId} index={index}>
            {(provided) => (
                <Card
                    className={"cursor-pointer"}
                    onClick={() => onClickHandler(linkId)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <CardHeader>
                        <div className="w-full mx-auto">
                            <Image
                                className="h-[200px] w-full rounded-xl mb-5 object-cover"
                                src={imageUrl}
                                alt={title}
                                width={300}
                                height={200}
                            />
                        </div>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                        <p>{content}</p>
                    </CardFooter>
                </Card>
            )}
        </Draggable>
    );
};

export default LinkItemCard;