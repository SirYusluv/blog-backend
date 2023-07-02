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
 *          format: binary
 *          description: The blog image (sent  as "file" in reqest body)
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
 *      Response:
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
 *                  description: An HTTP status code for the requested operation
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
 *              multipart/form-data:
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
 *                                  description: An HTTP status code on operation
 *                              blog:
 *                                  $ref: '#/components/schemas/Blog'
 *          400:
 *              description: An error occurred
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 *
 */
// create blog
BlogRouter.post("/blog", createBlog);

/**
 * @swagger
 * /blog/{blogId}:
 *  patch:
 *      summary: Update title and detail of a blog post
 *      tags:
 *          - /blog
 *      parameters:
 *      - in: path
 *        name: blogId
 *        schema:
 *          type: string
 *          required: true
 *          description: The id (_id) of the blog to update
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: The new title for the blog
 *                          detail:
 *                              type: string
 *                              description: The new description for the blog
 *      response:
 *          200:
 *              description: Blog successfully updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: A readable message or operatioin status
 *                              status:
 *                                  type: integer
 *                                  description: An HTTP status code on operation
 *                              blog:
 *                                  $ref: '#/components/schemas/Response'
 *          400:
 *              description: An error occurred
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schema/Response'
 */
// update blog
BlogRouter.patch("/blog/:blogId", updateBlog);

/**
 * @swagger
 * /blog/{blogId}:
 *  patch:
 *      summary: Delete a blog
 *      tags:
 *          - /blog
 *      parameters:
 *          - in: path
 *            name: blogId
 *            schema:
 *              type: string
 *              required: true
 *              description: The id (_id) of the blog to update
 *      response:
 *          200:
 *              description: Blog successfully deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 *          400:
 *              desctiption: An error occurres
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Response'
 */
// delete blog
BlogRouter.delete("/blog/:blogId", deleteBlog);
// get single or all blogs
BlogRouter.get("/blog", getBlogs);
