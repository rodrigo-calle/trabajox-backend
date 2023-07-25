import { Career } from "@prisma/client"
import { prismaClient } from "../../config/prismaClient"

export const getAllCareers = async () => {
    const careers = await prismaClient.career.findMany({
        include: {
            label: true
        }
    })
    return careers
}

export const createCareer = async (data: Career) => {
    const { description, labelId, name } = data
    const career = await prismaClient.career.create({
        data: {
            description, 
            labelId, 
            name
        }
    })

    return career;   
}

export const getCareerById = async (id: number) => {
    const career = await prismaClient.career.findUnique({
        where: {
            id
        },
        include: {
            label: true
        }
    })

    return career;
}

export const updateCareer = async (id: number, data: Career) => {
    const { description, labelId, name } = data
    const career = await prismaClient.career.update({
        where: {
            id
        },
        data: {
            description, 
            labelId, 
            name
        },
        include: {
            label: true
        }
    })

    return career;
}

export const deleteCareer = async (id: number) => {
    const career = await prismaClient.career.delete({
        where: {
            id
        }
    })

    return career.id;
}
