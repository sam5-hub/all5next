"use client";
import React from 'react';
import Image from "next/image";
import { LinkProjectSchema, LinkProjectType } from "@/schema/linkProject.schema";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

  type LinkProjectTypeProp = LinkProjectType & {
    index: number;
    onClickHandler: (linkId: string) => void;
  };

  const LinkProjectCard: React.FC<LinkProjectTypeProp> = ({ linkProjectId, title, type, imageUrl, createdAt, updatedAt, index, onClickHandler }) => {
    return (

        <Card className={"cursor-pointer"} onClick={() => onClickHandler(linkProjectId)}>
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
                <p>{type}</p>
            </CardFooter>
        </Card>
    );
};

export default LinkProjectCard;