import { Calification } from "@prisma/client"
import { prismaClient } from "../../config/prismaClient"

export const getAllCalifications = async () => {
    const califications = await prismaClient.calification.findMany({
        include: {
            profile: true
        }
    })
    return califications
}

export const createCalification = async (data: Calification) => {
    const { stars, comment, profileId } = data
    const calification = await prismaClient.calification.create({
        data: {
            stars, 
            comment, 
            profileId
        }
    })

    return calification;   
}

export const getCalificationById = async (id: number) => {
    const calification = await prismaClient.calification.findUnique({
        where: {
            id
        },
        include: {
            profile: true
        }
    })

    return calification;
}

export const updateCalification = async (id: number, data: Calification) => {
    const { stars, comment, profileId } = data
    const calification = await prismaClient.calification.update({
        where: {
            id
        },
        data: {
            stars, 
            comment, 
            profileId
        },
        include: {
            profile: true
        }
    })

    return calification;
}

export const deleteCalification = async (id: number) => {
    const calification = await prismaClient.calification.delete({
        where: {
            id
        }
    })

    return calification.id;
}
