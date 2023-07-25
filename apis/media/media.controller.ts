import { Request, Response } from "express";
import { createMedia, getAllMedia, getMediaById, updateMedia } from "./media.service";

export const getAllMediaHandler = async (req: Request, res: Response) => {
    try {
        const media = await getAllMedia();
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const createMediaHandler = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const media = await createMedia(body);
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const getMediaByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const media = await getMediaById(Number(id));
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export const updateMediaHandler = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const media = await updateMedia(Number(id), body);
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ error });
    }
}