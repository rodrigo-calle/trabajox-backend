import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  loginUserHandler,
  updateUserHandler,
} from "./user.controller";
import { validateRequestBody } from "zod-express-middleware";
import { UserSchema } from "./user.model";

const router = Router();

router.get("/", getAllUsersHandler);
router.post("/", validateRequestBody(UserSchema), createUserHandler);
router.post("/login", loginUserHandler);
router.patch("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);

export default router;
