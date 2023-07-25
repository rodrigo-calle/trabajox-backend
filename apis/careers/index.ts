import { Router } from "express";
import { createCareerHandler, deleteCareerHandler, getAllCareersHandler, updateCareerHandler } from "./career.controller";
import { validateRequestBody } from 'zod-express-middleware';
import { CareerSchema } from "./career.model";

const router = Router();

router.get('/', getAllCareersHandler)
router.post('/',validateRequestBody(CareerSchema), createCareerHandler)
router.patch('/:id', updateCareerHandler)
router.delete('/:id', deleteCareerHandler)


export default router;
