import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../../services/EmployeeService';
import { EmployeeResponseDTO } from '../../dto/EmployeeResponseDTO';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const employee = await employeeService.show(id);
    if (!employee) return next(new CustomError(404, 'Not Found', 'Employee not found'));
    res.customSuccess(200, 'Employee found', new EmployeeResponseDTO(employee));
  } catch (err) {
    next(err);
  }
};