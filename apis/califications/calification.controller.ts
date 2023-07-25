import { Request, Response } from "express"
import { createCalification, deleteCalification, getAllCalifications, getCalificationById, updateCalification } from "./calification.service"

export const getAllCalificationsHandler = async (_req: Request, res: Response) => {
    try {
        const califications = await getAllCalifications()
        res.status(200).json(califications)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const createCalificationHandler = async (req: Request, res: Response) => {
    try {
        const calification = await createCalification(req.body)
        res.status(201).json(calification)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const getCalificationByIdHandler = async (req: Request, res: Response) => {
    try {
        const calification = await getCalificationById(parseInt(req.params.id))
        res.status(200).json(calification)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const updateCalificationHandler = async (req: Request, res: Response) => {
    try {
        const calification = await updateCalification(parseInt(req.params.id), req.body)
        res.status(200).json(calification)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const deleteCalificationHandler = async (req: Request, res: Response) => {
    try {
        const id = await deleteCalification(parseInt(req.params.id))
        res.status(200).json(`Calification ${id} deleted`)
    } catch (error) {
        res.status(500).send({error})
    }
}
