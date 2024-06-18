import { z } from 'zod'

// LinkProjectType
export type LinkProjectType = {
  linkProjecId: string;
  title: string;
  imageUrl: string;
  type?: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
}
export type LinkProjectPaginationType = {
  total: number;
  perPage: number;
  currentPage: number;
  data: LinkProjectType[];
}

export const LinkProjectSchema = z.object({
  linkProjecId: z.string().uuid(),
  title: z.string(),
  imageUrl: z.string().optional(),
  type: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().uuid().optional(),
});

// LinkType
export type LinkType = {
  linkId: string;
  title: string;
  url: string;
  type?: string;
  imageUrl: string;
  content?: string;
  sort?: number;
  createdAt: Date;
  updatedAt: Date;
  linkProjecId?: string;
}
export const LinkSchema = z.object({
  linkId: z.string().uuid(),
  title: z.string(),
  url: z.string(),
  imageUrl: z.string().optional(),
  type: z.string().optional(),
  content: z.string().optional(),
  sort: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  linkProjecId: z.string().uuid().optional(),
});

// Link Tgas
export type LinkTagType = {
  linkTagId: string;
  tag: string;
  type: string;
  url: string;
  xPosition?: string;
  yPosition: string;
  sort?: number;
  createdAt: Date;
  updatedAt: Date;
  linkId?: string;
}
export const LinkTagSchema = z.object({
  linkTagId: z.string().uuid(),
  tag: z.string(),
  type: z.string().optional(),
  url: z.string(),
  xPosition: z.string().optional(),
  yPosition: z.string().optional(),
  sort: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().uuid().optional(),
});