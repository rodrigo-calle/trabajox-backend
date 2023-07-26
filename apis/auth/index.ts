import { Router } from "express";
import { registerUserHandler } from "./auth.controller";

const router = Router();

router.post('/register', registerUserHandler)

export default router;