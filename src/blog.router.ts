import { Router } from "express";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "./blog.service";

export const BlogRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Blog:
 *      type: object
 *      required:
 *        - title
 *        - detail
 *        - imageUrl
 *      properties:
 *        id:
 *          type: string
 *          description: An auto-generated Mongoose id
 *        title:
 *          type: string
 *          description: The title of the blog post
 *        detail:
 *          type: string
 *          description: The blog content
 *        dateCreated:
 *          type: string
 *          format: date
 *          description: The date the blog post was created
 *        imageURL:
 *          type: string
 *          description: The url for the blog post image (sent  as "file" in reqest body)
 *      example:
 *        id: 243479654344567873244565
 *        title: My interesting Blog post
 *        detail: This is typically a long blog (about) section that contain details for my interesting Blog post
 *        dateCreated: 2023-06-26T09:07:00.157Z
 *        imageUrl: https://localhost:3000/my-random-image568787376246884.jpg
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      MustHaveInResponse:
 *          type: object
 *          required:
 *              - message
 *              - status
 *          properties:
 *              message:
 *                  type: string
 *                  description: The information about the performed operation
 *              status:
 *                  type: number
 *                  description: An HTTP status for the requested operation
 *          example:
 *              message: "Some operations have been performed successfully or failed."
 *              status: 100
 */

/**
 * @swagger
 * tags:
 *  name: /blog
 *  description: Blog operations
 */

/**
 * @swagger
 * /blog:
 *  post:
 *      summary: Create new blog post
 *      tags:
 *          - /blog
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Blog'
 *      responses:
 *          201:
 *              description: The blog was created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: A readable message on operation status
 *                              status:
 *                                  type: number
 *                                  description: An HTTP status on operation
 *                              blog:
 *                                  $ref: '#/components/schemas/Blog'
 *          400:
 *              description: An error occurred
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/MustHaveInResponse'
 *
 */
// create blog
BlogRouter.post("/blog", createBlog);
// update blog
BlogRouter.patch("/blog/:blogId", updateBlog);
// delete blog
BlogRouter.delete("/blog/:blogId", deleteBlog);
// get single or all blogs
BlogRouter.get("/blog", getBlogs);
