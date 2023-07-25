import { Router } from "express";
import { createProfileHandler, deleteProfileHandler, getAllProfilesHandler, updateProfileHandler } from "./profile.controller";
import { validateRequestBody } from 'zod-express-middleware';
import { ProfileSchema } from "./profile.model";

const router = Router();

router.get('/', getAllProfilesHandler)
router.post('/',validateRequestBody(ProfileSchema), createProfileHandler)
router.patch('/:id', updateProfileHandler)
router.delete('/:id', deleteProfileHandler)


export default router;
