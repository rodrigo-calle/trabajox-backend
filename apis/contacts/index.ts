import { Router } from "express";
import { createContactHandler, getAllContactsHandler, getContactByIdHandler, updateContactHandler } from "./contact.controller";
import { validateRequestBody } from 'zod-express-middleware';
import { ContactSchema } from "./contact.model";

const router = Router();

router.get('/', getAllContactsHandler)
router.get('/:id', getContactByIdHandler)
router.post('/',validateRequestBody(ContactSchema), createContactHandler)
router.patch('/:id', updateContactHandler)

export default router;