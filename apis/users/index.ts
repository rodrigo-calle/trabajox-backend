import { Router } from "express";
import { createUserHandler, deleteUserHandler, getAllUsersHandler, getUserByIdHandler, updateUserHandler } from "./user.controller";
import { validateRequestBody } from 'zod-express-middleware';
import { UserSchema } from "./user.model";

const router = Router();

router.get('/', getAllUsersHandler)
router.get('/:id', getUserByIdHandler)
router.post('/',validateRequestBody(UserSchema), createUserHandler)
router.patch('/:id', updateUserHandler)
router.delete('/:id', deleteUserHandler)


export default router;
