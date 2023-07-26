import { Router } from "express";
import { loginUserHandler, registerUserHandler, revokeRefreshTokenHandler } from "./auth.controller";

const router = Router();

router.post('/register', registerUserHandler)

// TODO: Add meddleware to check if user is logged in and if to valid credentials
router.post('/login', loginUserHandler) 
router.post('/refreshtoken', revokeRefreshTokenHandler)


export default router;