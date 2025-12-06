// src/routes/employee.ts
import { Router } from 'express';
import { create, list, show, edit, destroy } from '../../controllers/employee';
import { validatorCreateEmployee } from 'middleware/validation/employee/validatorCreateEmployee';

const router = Router();

router.post('/', validatorCreateEmployee, create);
router.get('/', list);
router.get('/:id', show);
router.patch('/:id', edit);     // или put — как у тебя было
router.delete('/:id', destroy);

export default router;