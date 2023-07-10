import { NextFunction, Response, Request } from "express";
import { Blog, BlogType } from "./blog.schema";

export async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const imageURL = req.file?.filename;
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

// only title and detail can be updted
export async function updateBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const _id = req.params.blogId;
    if (!_id)
      return res
        .status(400)
        .json({ message: "Blog id must be provided", status: 400 });

    const { title, detail } = req.body;

    // either title or datail must be provided
    if (!title && !detail)
      return res.status(400).json({
        message: "Either title or datail must be provided",
        status: 400,
      });

    let blog: BlogType | null = null;
    if (title && detail)
      blog = await Blog.findByIdAndUpdate(_id, { title, detail }).exec();
    if (!blog && title)
      blog = await Blog.findByIdAndUpdate(_id, { title }).exec();
    if (!blog && detail)
      blog = await Blog.findByIdAndUpdate(_id, { detail }).exec();

    if (!blog)
      return res.status(200).json({
        message: "Blog Id provided not found",
        status: 200,
      });

    res.status(200).json({
      message: "Blog successfully updated",
      status: 200,
      blog: blog.toObject(),
    });
  } catch (err: any) {
    console.error(err);
    next(err);
  }
}

export async function deleteBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const _id = req.params.blogId;
    if (!_id)
      return res
        .status(400)
        .json({ message: "Blog id must be provided", status: 400 });

    Blog.findByIdAndDelete(_id);

    res.status(200).json({
      message: "Blog successfully deleted",
      status: 200,
    });
  } catch (err: any) {
    console.error(err);
    next(err);
  }
}

export async function getBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const _id = req.query.blogId;
    const blog = _id ? [await Blog.findById(_id)] : await Blog.find();

    res.status(200).json({
      message: "",
      status: 200,
      blog,
    });
  } catch (err: any) {
    console.error(err);
    next(err);
  }
}
