import { Router } from "express";
import { createCalificationHandler, deleteCalificationHandler, getAllCalificationsHandler, updateCalificationHandler } from "./calification.controller";
import { validateRequestBody } from 'zod-express-middleware';
import { CalificationSchema } from "./calification.model";

const router = Router();

router.get('/', getAllCalificationsHandler)
router.post('/',validateRequestBody(CalificationSchema), createCalificationHandler)
router.patch('/:id', updateCalificationHandler)
router.delete('/:id', deleteCalificationHandler)


export default router;
