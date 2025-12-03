import { Router } from 'express';

import auth from './auth';
import users from './users';
import employees from './employee'; // <-- Додано
import positions from './position'; // <-- Додано

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/employees', employees); // <-- Додано
router.use('/positions', positions); // <-- Додано

export default router;