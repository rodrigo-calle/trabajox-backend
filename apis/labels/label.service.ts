import { Label } from "@prisma/client"
import { prismaClient } from "../../config/prismaClient"

export const getAllLabels = async () => {
    const labels = await prismaClient.label.findMany({
        include: {
            Career: true
        }
    })
    return labels
}

export const createLabel = async (data: Label) => {
    const { background, name } = data
    const label = await prismaClient.label.create({
        data: {
            name,
            background
        }
    })

    return label;   
}

export const getLabelById = async (id: number) => {
    const label = await prismaClient.label.findUnique({
        where: {
            id
        },
        include: {
            Career: true
        }
    })

    return label;
}

export const updateLabel = async (id: number, data: Label) => {
    const { background, name } = data
    const label = await prismaClient.label.update({
        where: {
            id
        },
        data: {
            name,
            background

        },
        include: {
            Career: true
        }
    })

    return label;
}

export const deleteLabel = async (id: number) => {
    const label = await prismaClient.label.delete({
        where: {
            id
        }
    })

    return label.id;
}
