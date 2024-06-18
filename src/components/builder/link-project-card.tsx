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

type LinkItemProps = {
    linkId: string;
    title: string;
    link: string;
    imageUrl: string | 'https://placehold.co/400';
    content?: string;
    onClickHandler: (linkId: string) => void;
  };

  const ProjectCard: React.FC<LinkItemProps> = ({ projectId, title, imageUrl, description, onClickHandler }) => {
    return (

        <Card className={"cursor-pointer"} onClick={() => onClickHandler(projectId)}>
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
                <p>{description}</p>
            </CardFooter>
        </Card>
    );
};

export default ProjectCard;