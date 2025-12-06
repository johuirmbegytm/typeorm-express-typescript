import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../../services/EmployeeService';
import { EmployeeResponseDTO } from '../../dto/EmployeeResponseDTO';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const employee = await employeeService.update(id, req.body);
    if (!employee) return next(new Error('Employee not found'));
    res.customSuccess(200, 'Employee updated', new EmployeeResponseDTO(employee));
  } catch (err) {
    next(err);
  }
};