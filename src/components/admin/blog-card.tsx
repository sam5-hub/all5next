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

type BlogCardProps = {
    blogId: string;
    title: string;
    imageUrl: string | 'https://placehold.co/400';
    description?: string;
    onClickHandler: (blogId: string) => void;
};

const BlogCard: React.FC<BlogCardProps> = ({ blogId, title, imageUrl, description, onClickHandler }) => {
    return (

        <Card className={"cursor-pointer"} onClick={() => onClickHandler(blogId)}>
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

export default BlogCard;