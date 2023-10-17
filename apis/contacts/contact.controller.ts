import { Request, Response } from "express";
import { createContact, getAllContacts, getContactById, updateContact } from "./contact.service";

export const getAllContactsHandler = async (req: Request, res: Response) => {
    try {
       const contacts = await getAllContacts();
        res.status(200).json(contacts); 
    } catch (error) {
        res.status(500).json(error);
    }

}

export const getContactByIdHandler = async (req: Request, res: Response) => {
    try {
        const contact = await getContactById(req.params.id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json(error);        
    }
}

export const createContactHandler = async (req: Request, res: Response) => {
    try {
        const contact = await createContact(req.body);
        res.status(201).json(contact);
    } catch(error) {
        res.status(500).json(error);
    }
}

export const updateContactHandler = async (req: Request, res: Response) => {
    try {
        const contact = await updateContact(req.params.id, req.body);
        res.status(200).json(contact);
    } catch (error) {   
        res.status(500).json(error);        
    }
}