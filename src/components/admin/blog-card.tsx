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
    blog_id: string;
    title: string;
    imageUrl: string | 'https://placehold.co/400';
    description?: string;
    onClickHandler: (blog_id: string) => void;
  };

  const BlogCard: React.FC<BlogCardProps> = ({ blog_id, title, imageUrl, description, onClickHandler }) => {
    return (

        <Card className={"cursor-pointer"} onClick={() => onClickHandler(blog_id)}>
            <CardHeader>
                <Image className={"aspect-square h-fit w-full rounded-xl mb-5 object-cover"}
                    src={imageUrl} alt={title} width={300} height={150}/>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardFooter>
                <p>{description}</p>
            </CardFooter>
        </Card>
    );
};

export default BlogCard;