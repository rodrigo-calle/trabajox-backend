import { Router } from "express";
import { validateRequestBody } from 'zod-express-middleware';
import { PostSchema } from "./post.model";
import { createPostHandler, deletePostHandler, getAllPostsHandler, updatePostHandler } from "./post.controller";

const router = Router();

router.get('/', getAllPostsHandler)
router.post('/',validateRequestBody(PostSchema), createPostHandler)
router.patch('/:id', updatePostHandler)
router.delete('/:id', deletePostHandler)


export default router;
