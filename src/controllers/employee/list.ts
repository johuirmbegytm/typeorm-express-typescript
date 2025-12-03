import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Employee } from 'orm/entities/employee/employee'; 
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const employeeRepository = getRepository(Employee);
  try {
    const employees = await employeeRepository.find({
      // Вибираємо всі основні поля, включаючи зв'язок 'position'
      select: ['id_employee', 'firstname', 'lastname', 'patronymic', 'phone', 'hire_date'], 
      relations: ['position'], // Завантажуємо дані посади
    });
    res.customSuccess(200, 'List of employees.', employees);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of employees.`, null, err);
    return next(customError);
  }
};