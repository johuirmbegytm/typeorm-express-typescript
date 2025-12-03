import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Employee } from 'orm/entities/employee/employee'; 
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id_employee = req.params.id;

  const employeeRepository = getRepository(Employee);
  try {
    const employee = await employeeRepository.findOne({ where: { id_employee } });

    if (!employee) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Employee with id:${id_employee} doesn't exists.`]);
      return next(customError);
    }
    employeeRepository.delete(id_employee);

    res.customSuccess(200, 'Employee successfully deleted.', { id: employee.id_employee, name: employee.lastname });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};