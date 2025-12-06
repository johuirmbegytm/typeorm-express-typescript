// src/middleware/validation/employee/validatorCreateEmployee.ts
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateEmployee = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstname, lastname, patronymic, phone, hire_date, positionId } = req.body;

  const errors: string[] = [];

  if (validator.isEmpty(firstname?.trim() ?? '')) errors.push('Firstname is required');
  if (validator.isEmpty(lastname?.trim() ?? '')) errors.push('Lastname is required');
  if (validator.isEmpty(patronymic?.trim() ?? '')) errors.push('Patronymic is required');
  if (!validator.isMobilePhone(phone ?? '', 'uk-UA')) errors.push('Invalid phone number');

  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
  // Вместо isDateString — ручная проверка
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!hire_date || !dateRegex.test(hire_date)) {
    errors.push('Hire date must be in format YYYY-MM-DD');
  }
  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

  if (!positionId || !validator.isInt(String(positionId), { min: 1 })) {
    errors.push('positionId must be a positive integer');
  }

  if (errors.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Create employee validation error', errors);
    return next(customError);
  }

  req.body.position = { id_position: Number(positionId) };
  delete req.body.positionId;

  return next();
};