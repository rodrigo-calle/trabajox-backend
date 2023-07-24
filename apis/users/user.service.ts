import { User } from "@prisma/client"
import { prismaClient } from "../../config/prismaClient"

export const getAllUsers = async () => {
    const users = await prismaClient.user.findMany()
    return users
}

export const createUser = async (data: User) => {
    const { email, firstName, lastName, isWorker } = data
    const user = await prismaClient.user.create({
        data: {
            email,
            firstName,
            lastName,
            isWorker
        }
    })

    return user;   
}

export const getUserById = async (id: number) => {
    const user = await prismaClient.user.findUnique({
        where: {
            id
        }
    })

    return user;
}

export const updateUser = async (id: number, data: User) => {
    const { email, firstName, lastName, isWorker } = data
    const user = await prismaClient.user.update({
        where: {
            id
        },
        data: {
            email,
            firstName,
            lastName,
            isWorker
        }
    })

    return user;
}

export const deleteUser = async (id: number) => {
    const user = await prismaClient.user.delete({
        where: {
            id
        }
    })

    return user.id;
}
