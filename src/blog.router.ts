import { Router } from "express";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "./blog.service";

export const BlogRouter = Router();

// create blog
BlogRouter.post("/blog", createBlog);
// update blog
BlogRouter.patch("/update/:blogId", updateBlog);
// delete blog
BlogRouter.delete("/blog/:blogId", deleteBlog);
// get single or all blogs
BlogRouter.get("/blog", getBlogs);
