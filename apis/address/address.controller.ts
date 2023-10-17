import { Request, Response } from "express";
import { createAddress, getAddressById, updateAddress } from "./address.service";

export const getAddressByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const address = await getAddressById(id);

        res.status(200).json(address)

    } catch (error) {
        res.status(500).json({ error })
    }
}

export const createAddressHandler = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const address = await createAddress(body);
        res.status(200).json(address)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const updateAddressHandler = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const address = await updateAddress(id, body);
        res.status(200).json(address)
    } catch (error) {
        res.status(500).json({ error })
    }
}