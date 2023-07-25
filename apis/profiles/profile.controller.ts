import { Request, Response } from "express"
import { createProfile, deleteProfile, getAllProfiles, getProfileById, updateProfile } from "./profile.service"

export const getAllProfilesHandler = async (_req: Request, res: Response) => {
    try {
        const profiles = await getAllProfiles()
        res.status(200).json(profiles)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const createProfileHandler = async (req: Request, res: Response) => {
    try {
        const profile = await createProfile(req.body)
        res.status(201).json(profile)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const getProfileByIdHandler = async (req: Request, res: Response) => {
    try {
        const profile = await getProfileById(parseInt(req.params.id))
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const updateProfileHandler = async (req: Request, res: Response) => {
    try {
        const profile = await updateProfile(parseInt(req.params.id), req.body)
        res.status(200).json(profile)
    } catch (error) {
        res.status(500).send({error})
    }
}

export const deleteProfileHandler = async (req: Request, res: Response) => {
    try {
        const id = await deleteProfile(parseInt(req.params.id))
        res.status(200).json(`Profile ${id} deleted`)
    } catch (error) {
        res.status(500).send({error})
    }
}
