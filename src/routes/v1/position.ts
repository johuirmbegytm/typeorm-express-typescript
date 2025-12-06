// src/routes/v1/position.ts
import { Router } from 'express';
import { create, list, show, edit, destroy } from '../../controllers/position';
import { checkJwt } from '../../middleware/checkJwt';
import { checkRole } from '../../middleware/checkRole';
import { validatorPosition } from '../../middleware/validation/position/validatorCreatePosition';

const router = Router();

router.post('/', [checkJwt, checkRole(['ADMINISTRATOR']), validatorPosition], create);
router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);
router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], show);
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true), validatorPosition], edit);
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;