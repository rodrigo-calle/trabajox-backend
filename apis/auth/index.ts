import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import {
  registerUserHandler,
  loginUserHandler,
  refreshTokenHandler,
  revokeRefreshTokens,
} from "./auth.controller";
import {
  LoginSchema,
  RefreshTokenSchema,
  RegisterUserSchema,
  RevokeRefreshTokensSchema,
} from "./auth.model";

const router = Router();

router.post(
  "/",
  validateRequest({ body: RegisterUserSchema }),
  registerUserHandler
);
router.post("/login", validateRequest({ body: LoginSchema }), loginUserHandler);
router.post(
  "/refresh",
  validateRequest({ body: RefreshTokenSchema }),
  refreshTokenHandler
);
router.delete(
  "/refresh",
  validateRequest({ body: RevokeRefreshTokensSchema }),
  revokeRefreshTokens
);

export default router;
