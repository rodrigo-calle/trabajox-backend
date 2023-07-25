import { Router } from "express";
import { createLabelHandler, deleteLabelHandler, getAllLabelsHandler, updateLabelHandler } from "./label.controller";
import { validateRequestBody } from 'zod-express-middleware';
import { LabelSchema } from "./label.model";

const router = Router();

router.get('/', getAllLabelsHandler)
router.post('/',validateRequestBody(LabelSchema), createLabelHandler)
router.patch('/:id', updateLabelHandler)
router.delete('/:id', deleteLabelHandler)


export default router;
