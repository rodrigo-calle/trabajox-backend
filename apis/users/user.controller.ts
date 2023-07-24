import { Request, Response } from "express"
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "./user.service"

export const getAllUsersHandler = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const user = await getUserById(parseInt(req.params.id))
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await updateUser(parseInt(req.params.id), req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const id = await deleteUser(parseInt(req.params.id))
        res.status(200).json(`User ${id} deleted`)
    } catch (error) {
        res.status(500).send({error})
    }
}
