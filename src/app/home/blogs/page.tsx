import Link from "next/link";
import React from "react";
import Image from "next/image";
import { onGetBlogList } from "@/actions/blogs";
import { BlogType } from "@/schema/blogs.schema";

export default async function HomeBlogListPage() {

	const res = await onGetBlogList().then((res) => res).catch((err) => err);
	const blogs: BlogType[] = res?.data || [];
	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0">
			{blogs.map((blog, index) => (
				<Link
				href={"/home/blogs/" + blog.blogId}
				className="w-full  border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-green-500 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3"
				key={index}
				>
				<div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative">
					<Image
					priority
					src={blog.imageUrl || "https://via.placeholder.com/150"}
					alt="cover"
					fill
					className=" rounded-md object-cover object-center"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<div className="space-y-2">
					<p className="text-sm dark:text-gray-400">
					{new Date(blog.createdAt).toDateString()}
					</p>
					<h1 className="text-xl font-bold dark:text-gray-300">
					{blog.title}
					</h1>
				</div>
				</Link>
			))}
		</div>
	)
}

// 	const res = await onGetBlogList(1, 10);
//   const blogs = res?.data || [];
//   return (
    
//   );
// }
