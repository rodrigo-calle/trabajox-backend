import { validateRequestBody } from "zod-express-middleware";
import { Router } from "express";
import {
  createAddressHandler,
  getAddressByIdHandler,
  updateAddressHandler,
} from "./address.controller";
import { AddressSchema } from "./address.model";

const router = Router();

router.get("/:id", getAddressByIdHandler);
router.post("/", validateRequestBody(AddressSchema), createAddressHandler);
router.patch("/:id", updateAddressHandler);

export default router;
