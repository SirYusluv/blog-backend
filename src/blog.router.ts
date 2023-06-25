import { NextFunction, Response, Request } from "express";
import { Blog } from "./blog.schema";

export async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const imageURL = req.file;
    const { title, detail } = req.body;

    if (!imageURL || !title || !detail)
      return res
        .status(400)
        .json({ message: "Every property must be provided", status: 400 });

    const blog = await new Blog({ imageURL, title, detail }).save();

    res
      .status(201)
      .json({ message: "Blog created", status: 201, blog: blog.toObject() });
  } catch (err: any) {
    console.error(err);
    next(err);
  }
}

export async function updateBlog(
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
