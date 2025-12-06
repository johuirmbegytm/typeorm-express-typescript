import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../../services/EmployeeService';
import { EmployeeResponseDTO } from '../../dto/EmployeeResponseDTO';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.create(req.body);
    res.customSuccess(201, 'Employee created', new EmployeeResponseDTO(employee));
  } catch (err) {
    next(err);
  }
};