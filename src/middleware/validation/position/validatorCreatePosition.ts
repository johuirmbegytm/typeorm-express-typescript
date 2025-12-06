import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorPosition = async (req: Request, _res: Response, next: NextFunction) => {
  const { name, salary } = req.body;
  const errors: string[] = [];

  if (!name || validator.isEmpty(name.trim())) {
    errors.push('Name is required');
  }
  if (name && !validator.isLength(name.trim(), { min: 2, max: 50 })) {
    errors.push('Name must be 2-50 characters');
  }
  if (!salary || !validator.isDecimal(String(salary))) {
    errors.push('Salary must be a valid decimal number');
  }
  if (salary && (Number(salary) < 0)) {
    errors.push('Salary cannot be negative');
  }

  if (errors.length > 0) {
    return next(new CustomError(400, 'Validation', 'Position validation error', errors));
  }

  next();
};