import { Request, Response } from "express";
import {
  createLabel,
  deleteLabel,
  getAllLabels,
  getLabelById,
  updateLabel,
} from "./label.service";

export const getAllLabelsHandler = async (_req: Request, res: Response) => {
  try {
    const labels = await getAllLabels();
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const createLabelHandler = async (req: Request, res: Response) => {
  try {
    const label = await createLabel(req.body);
    res.status(201).json(label);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const getLabelByIdHandler = async (req: Request, res: Response) => {
  try {
    const label = await getLabelById(req.params.id);
    res.status(200).json(label);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const updateLabelHandler = async (req: Request, res: Response) => {
  try {
    const label = await updateLabel(req.params.id, req.body);
    res.status(200).json(label);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const deleteLabelHandler = async (req: Request, res: Response) => {
  try {
    const id = await deleteLabel(req.params.id);
    res.status(200).json(`Label ${id} deleted`);
  } catch (error) {
    res.status(500).send({ error });
  }
};
