// src/controllers/employee/list.ts
import { Request, Response, NextFunction } from 'express';
import { employeeService } from '../../services/EmployeeService';
import { EmployeeResponseDTO } from '../../dto/EmployeeResponseDTO';

export const list = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const employees = await employeeService.list();

    const employeesDTO = employees.map((emp) => new EmployeeResponseDTO(emp));

    return res.json({
      data: employeesDTO,  // ← обгортаємо в data
    });
  } catch (err) {
    return next(err);
  }
};