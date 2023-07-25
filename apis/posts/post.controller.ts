import { Request, Response } from "express"
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "./post.service"

export const getAllPostsHandler = async (_req: Request, res: Response) => {
    try {
        const posts = await getAllPosts()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const createPostHandler = async (req: Request, res: Response) => {
    try {
        const post = await createPost(req.body)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const getPostByIdHandler = async (req: Request, res: Response) => {
    try {
        const post = await getPostById(parseInt(req.params.id))
        res.status(200).json(post)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const updatePostHandler = async (req: Request, res: Response) => {
    try {
        const post = await updatePost(parseInt(req.params.id), req.body)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const deletePostHandler = async (req: Request, res: Response) => {
    try {
        const id = await deletePost(parseInt(req.params.id))
        res.status(200).json(`Post ${id} deleted`)
    } catch (error) {
        res.status(500).send({error})
    }
}
