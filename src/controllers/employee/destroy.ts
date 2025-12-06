import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../../services/EmployeeService';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    await employeeService.destroy(id);
    res.customSuccess(200, 'Employee deleted');
  } catch (err) {
    next(err);
  }
};