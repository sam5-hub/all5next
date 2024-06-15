import React from "react";
import Image from "next/image";
import {onGetBlogData, onGetBlogList} from "@/actions/blogs";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
// import ReactMarkdown from 'react-markdown';
import { BlogType } from "@/schema/blogs.schema";

export async function generateStaticParams() {
	const blogs: BlogType[] = await onGetBlogList().then((res) => res?.data).catch(() => []);
	return blogs;
}

export async function generateMetadata({ params }: { params: { blogId: string } }) {
	const blogData =  await onGetBlogData(params.blogId);
	const blog = blogData?.data;
	return {
		title: blog?.title,
		authors: {
			name: "chensokheng",
		},
		openGraph: {
			title: blog?.title,
			url: "https://all5.pro/blogs/" + params.blogId,
			siteName: "ALL5 Blog",
			images: blog?.imageUrl,
			type: "website",
		},
		keywords: ["daily web coding", "chensokheng", "dailywebcoding"],
	};
}

export default async function BlogDetailPage({ params }: { params: { blogId: string } }) {
	console.log("params", params);
	const blogData =  await onGetBlogData(params.blogId);
	const blog = blogData?.data;
	if (!blog) {
		return <h1 className="text-white">Not found</h1>;
	}
	return (
		<div className="max-w-5xl mx-auto min-h-screen  pt-10 space-y-10">
			<div className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center justify-between border-b">
				<h1>Blogs - {blog?.title}</h1>
			</div>
			<div className="sm:px-10 space-y-5">
				<h1 className=" text-3xl font-bold dark:text-gray-200">
					{blog?.title}
				</h1>
				<p className="text-sm dark:text-gray-400">
					{new Date(blog?.createdAt!).toDateString()}
				</p>
			</div>

			<div className="w-full h-96 relative">
				<Image
					priority
					src={blog?.imageUrl!}
					alt="cover"
					fill
					className=" object-cover object-center rounded-md border-[0.5px] border-zinc-600"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			{/* <ReactMarkdown>{blog?.content || ""}</ReactMarkdown> */}
			<MarkdownPreview content={blog?.content || ""} />
		</div>
	);
}