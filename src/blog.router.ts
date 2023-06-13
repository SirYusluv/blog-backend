import { NextFunction, Response, Request } from "express";

export async function getAllBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (err: any) {
    console.error(err);
    next(err);
  }
}
