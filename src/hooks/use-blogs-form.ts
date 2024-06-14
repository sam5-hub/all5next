"use client";
import { useToast } from '@/components/ui/use-toast'
import { BlogSchema, BlogType } from '@/schema/blogs.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { submitBlogData, onGetBlogData } from "@/actions/blogs";


type BlogFormParam ={
  blogId?: string | null 
}

export const useBlogsForm = ({ blogId } : BlogFormParam) => {
  const formMethod = useForm<BlogType>({
    resolver: zodResolver(BlogSchema),
  })
  const pathname = usePathname()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

//   useEffect(() => {
//     setIsDomain(pathname.split('/').pop())
//   }, [pathname])


 // Get Blog
 const getBlogDetail = useCallback(async () => {
  setLoading(true);
  if (blogId) {
    const responseData = await onGetBlogData(blogId);
    if (responseData && responseData.data) {
      formMethod.reset(responseData.data as BlogType); // Set form values to fetched data
    }
  }
  setLoading(false);
}, [blogId]);

useEffect(() => {
  getBlogDetail();
}, [blogId]);


const onSubmitBlog = async (data: BlogType) => {
    setLoading(true);
    if (data) {
      await submitBlogData(data);
      toast({
        title: 'Blog Created',
        description: 'Your blog has been created successfully!',
      })
      setLoading(false)
      formMethod.reset()
      router.back()
    }
  }

  return {
    formMethod,
    getBlogDetail,
    onSubmitBlog,
    loading
  }
}