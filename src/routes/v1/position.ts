import { Router } from 'express';

// Імпортуємо всі контролери для сутності Position
import { create, list, show, edit, destroy } from 'controllers/position'; 
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

const router = Router();

// 1. POST /positions/ - Створення посади (CREATE)
router.post('/', [checkJwt, checkRole(['ADMINISTRATOR'])], create);

// 2. GET /positions/ - Отримання списку (READ ALL)
router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);

// 3. GET /positions/:id - Отримання однієї посади (READ ONE)
router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], show);

// 4. PATCH /positions/:id - Редагування посади (UPDATE)
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], edit); 

// 5. DELETE /positions/:id - Видалення посади (DELETE)
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;