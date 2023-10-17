import { Request, Response } from "express";
import {
  createCareer,
  deleteCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
} from "./career.service";

export const getAllCareersHandler = async (_req: Request, res: Response) => {
  try {
    const careers = await getAllCareers();
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const createCareerHandler = async (req: Request, res: Response) => {
  try {
    const career = await createCareer(req.body);
    res.status(201).json(career);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const getCareerByIdHandler = async (req: Request, res: Response) => {
  try {
    const career = await getCareerById(req.params.id);
    res.status(200).json(career);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const updateCareerHandler = async (req: Request, res: Response) => {
  try {
    const career = await updateCareer(req.params.id, req.body);
    res.status(200).json(career);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const deleteCareerHandler = async (req: Request, res: Response) => {
  try {
    const id = await deleteCareer(req.params.id);
    res.status(200).json(`Career ${id} deleted`);
  } catch (error) {
    res.status(500).send({ error });
  }
};
