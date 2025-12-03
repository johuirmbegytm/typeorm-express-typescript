import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Employee } from 'orm/entities/employee/employee'; 
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id_employee = req.params.id; // ID беремо з параметрів

  const employeeRepository = getRepository(Employee);
  try {
    const employee = await employeeRepository.findOne({
      where: { id_employee },
      select: ['id_employee', 'firstname', 'lastname', 'patronymic', 'phone', 'hire_date'],
      relations: ['position'], // Завантажуємо дані посади
    });

    if (!employee) {
      const customError = new CustomError(404, 'General', `Employee with id:${id_employee} not found.`, ['Employee not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Employee found', employee);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};