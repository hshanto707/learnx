import { Types } from 'mongoose';
import { z } from 'zod';

export type TCourse = {
  title: string;
  subtitle: string;
  description: string;
  coverImg: string;
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const createCourseValidationSchema = z.object({
  title: z.string().min(5),
  subtitle: z.string().min(5).optional(),
  description: z.string().min(120).optional(),
  coverImg: z.string().url().optional(),
  createdBy: z.string().refine((val) => Types.ObjectId.isValid(val)),
});

export const updateCourseValidationSchema = z.object({
  title: z.string().min(5).optional(),
  subtitle: z.string().min(5).optional(),
  description: z.string().min(120).optional(),
  coverImg: z.string().url().optional(),
  createdBy: z.string().refine((val) => Types.ObjectId.isValid(val)).optional(),
});