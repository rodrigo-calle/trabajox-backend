import { validateRequestBody } from 'zod-express-middleware'

import { Router } from 'express'
import { createMediaHandler, getAllMediaHandler, getMediaByIdHandler, updateMediaHandler } from './media.controller';

const router = Router();

router.get('/', getAllMediaHandler)
router.get('/:id', getMediaByIdHandler);
router.post('/', validateRequestBody, createMediaHandler);
router.patch('/:id', updateMediaHandler)

export default router;