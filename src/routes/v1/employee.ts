import { Router } from 'express';

// Імпортуємо всі контролери для сутності Employee
import { create, list, show, edit, destroy } from 'controllers/employee'; 
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';
// Припускаємо, що валідатори для Employee будуть аналогічні User, але ми їх тут не створюємо
// import { validatorEdit } from 'middleware/validation/employees'; 

const router = Router();

// 1. POST /employees/ - Створення співробітника (CREATE)
router.post('/', [checkJwt, checkRole(['ADMINISTRATOR'])], create);

// 2. GET /employees/ - Отримання списку (READ ALL)
router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], list);

// 3. GET /employees/:id - Отримання одного співробітника (READ ONE)
router.get('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], show);

// 4. PATCH /employees/:id - Редагування співробітника (UPDATE)
// Використовуємо .patch, як у users.ts
router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true) /*, validatorEdit*/], edit); 

// 5. DELETE /employees/:id - Видалення співробітника (DELETE)
router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;