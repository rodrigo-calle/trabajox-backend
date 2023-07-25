import { prismaClient } from "../../config/prismaClient";
import { Contact } from "@prisma/client";

export const getAllContacts = async () => {
    const contacts = await prismaClient.contact.findMany({
        include: {profile: {include: {user: true}}}
    })

    return contacts;
}

export const getContactById = async (id: number) => {
    const contact = await prismaClient.contact.findUnique({
        where: {
            id
        },
        include: {profile: {include: {user: true}}}
    })

    return contact;
}

export const createContact = async (data: Contact) => {
    const { phone, instagram, pinterest, facebook, profileId, whatsapp } = data;
    const contact = await prismaClient.contact.create({
        data: {
            phone: phone, 
            instagram, 
            pinterest, 
            facebook, 
            profileId, 
            whatsapp
        }
    })

    return contact;
}

export const updateContact = async (id: number, data: Contact) => {
    const { phone, instagram, pinterest, facebook, profileId, whatsapp } = data;
    const contact = await prismaClient.contact.update({
        where: {
            id
        },
        data: {
            phone: phone, 
            instagram, 
            pinterest, 
            facebook, 
            profileId, 
            whatsapp
        }
    })
    
    return contact;
}