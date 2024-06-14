import { z } from 'zod'

export type BlogType = {
    blog_id: string;
    title: string;
    imageUrl: string;
    content?: any; // Json is typically any type in TS
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
}
export type BlogPaginationType ={
  total: number;
  perPage: number;
  currentPage: number;
  data: BlogType[];
}

  // Zod schema for Blog
export const BlogSchema = z.object({
    blog_id: z.string().uuid(),
    title: z.string(),
    imageUrl: z.string().optional(),
    content: z.any().optional(), // JSON can be any type
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().uuid().optional(),
  });