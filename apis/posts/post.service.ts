import { Post } from "@prisma/client"
import { prismaClient } from "../../config/prismaClient"

export const getAllPosts = async () => {
    const posts = await prismaClient.post.findMany({
        include: {
            Media: true
        }
    })
    return posts
}

export const createPost = async (data: Post) => {
    const { name, likes, profileId, description } = data
    const post = await prismaClient.post.create({
        data: {
            name,
            likes,
            profileId,
            description
        }
    })

    return post;   
}

export const getPostById = async (id: number) => {
    const post = await prismaClient.post.findUnique({
        where: {
            id
        },
        include: {
            Media: true
        }
    })

    return post;
}

export const updatePost = async (id: number, data: Post) => {
    const { name, likes, profileId, description } = data
    const post = await prismaClient.post.update({
        where: {
            id
        },
        data: {
            name,
            likes,
            profileId,
            description
        },
        include: {
            Media: true
        }
    })

    return post;
}

export const deletePost = async (id: number) => {
    const post = await prismaClient.post.delete({
        where: {
            id
        }
    })

    return post.id;
}
