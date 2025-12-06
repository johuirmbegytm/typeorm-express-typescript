import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../../services/EmployeeService';
import { EmployeeResponseDTO } from '../../dto/EmployeeResponseDTO';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await employeeService.list();
    const dto = employees.map(e => new EmployeeResponseDTO(e));
    res.customSuccess(200, 'List of employees', dto);
  } catch (err) {
    next(err);
  }
};