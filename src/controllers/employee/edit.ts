// src/controllers/employee/edit.ts
import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../../services/EmployeeService';
import { EmployeeResponseDTO } from '../../dto/EmployeeResponseDTO';

export const edit = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const updatedEmployee = await employeeService.update(Number(id), req.body);

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Співробітник не знайдений' });
    }

    // ← ключовий фікс: обгортаємо в data, як в list і show
    return res.json({
      data: new EmployeeResponseDTO(updatedEmployee),
    });
  } catch (err) {
    return next(err);
  }
};