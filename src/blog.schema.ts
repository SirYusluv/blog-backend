import { Document, model, Schema, Types } from "mongoose";

export type BlogType = Document<unknown, any, IBlog> &
  Omit<IBlog & { _id: Types.ObjectId }, never>;

interface IBlog {
  title: string;
  detail: string;
  imageURL: string;
  dateCreated?: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  detail: { type: String, required: true },
  imageURL: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

export const User = model<IBlog>("User", BlogSchema);
