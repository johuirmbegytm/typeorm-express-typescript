import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../../services/EmployeeService';
import { EmployeeResponseDTO } from '../../dto/EmployeeResponseDTO';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const employee = await employeeService.show(Number(id));

    if (!employee) {
      return res.status(404).json({ message: 'Співробітник не знайдений' });
    }

    return res.json({
      data: new EmployeeResponseDTO(employee),  // ← обгортаємо в data
    });
  } catch (err) {
    return next(err);
  }
};