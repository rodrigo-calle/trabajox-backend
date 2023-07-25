import { Address } from "@prisma/client";
import { prismaClient } from "../../config/prismaClient";

export const createAddress = async (data: Address):  Promise<Address> => {
    const { city, country, profileId, province, region } = data;
    const address = await prismaClient.address.create({
        data: {
            city,
            country,
            profileId,
            province,
            region
        }
    })

    return address;
}

export const getAddressById = async (id: number): Promise<Address | null> => {
    const address = await prismaClient.address.findUnique({
        where: {
            id
        }
    })

    return address;
}

export const updateAddress = async (id: number, data: Address): Promise<Address> => {
    const { city, country, profileId, province, region } = data;

    const address = await prismaClient.address.update({
        where: {
            id
        },
        data: {
            city,
            country,
            profileId,
            province,
            region
        }
    });

    return address;
}