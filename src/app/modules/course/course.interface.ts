import { Types } from "mongoose";

export type TCourse = {
  title: string,
  subtitle: string,
  description: string,
  coverImg: string,
  createdBy: Types.ObjectId,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
}
