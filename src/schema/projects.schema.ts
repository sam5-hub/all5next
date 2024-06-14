import { z } from 'zod'

export type ProjectType = {
    project_id: string;
    title: string;
    imageUrl: string;
    content?: any; // Json is typically any type in TS
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
}
export type ProjectPaginationType ={
  total: number;
  perPage: number;
  currentPage: number;
  data: ProjectType[];
}

  // Zod schema for Project
export const ProjectSchema = z.object({
    project_id: z.string().uuid(),
    title: z.string(),
    imageUrl: z.string().optional(),
    content: z.any().optional(), // JSON can be any type
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string().uuid().optional(),
  });