"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from "next/dynamic";
import { BlogSchema, BlogType } from "@/schema/blogs.schema";
import { zodResolver } from '@hookform/resolvers/zod'
import FormGenerator from "../form/form-generator";
import { submitBlogData, onGetBlogData } from "@/actions/blogs";
import { useBlogsForm } from "@/hooks/use-blogs-form";
import { SkeletonLoader } from "../loader/skeleton-loader";

export default function BlogForm({
  blogId
}: { blogId?: string | null }) {

  const router = useRouter();
  const { formMethod, getBlogDetail, onSubmitBlog, loading } = useBlogsForm({blogId});


  return (
    <div>
      <Button onClick={()=> getBlogDetail() } className="p-2 mb-10">Refresh</Button>

      {
        loading ? <SkeletonLoader/> : 
          <form
          className="flex flex-col gap-4"
        >
  
          <FormGenerator
            name="title"
            label="Title"
            formReturn={formMethod}
            type="text"
            placeholder="title..."
            inputType="input"
          />
          
          <FormGenerator
            name="imageUrl"
            label="Cover"
            formReturn={formMethod}
            type="image"
            placeholder="image..."
            inputType="image"
          />
  
          <FormGenerator
            name="content"
            label="Content"
            formReturn={formMethod}
            inputType="mdx-editor"
            placeholder="typing content"
            type="mdx-editor"
          />
  
          <div className="mt-4 text-right flex flex-row gap-4">
            <Button
              variant={"secondary"}
              onClick={() => {
                router.push("/blogs")
              }}
            >
              Cancel
            </Button>
            <Button
              variant={"default"}
              onClick={() => {
                onSubmitBlog(formMethod.getValues());
              }}>
              {loading ? (
                <>
                  Please wait...
                </>
              ) : (
                <>
                  Save
                </>
              )}
            </Button>
          </div>
        </form>
      }

     
    </div>

  );
}
