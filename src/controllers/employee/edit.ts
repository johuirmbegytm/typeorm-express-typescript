import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Employee } from 'orm/entities/employee/employee';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id_employee = req.params.id;
  // Поля для оновлення. Поле 'position' (FK) оновлюється через id_position
  const { firstname, lastname, patronymic, phone, hire_date, id_position } = req.body;

  const employeeRepository = getRepository(Employee);
  try {
    const employee = await employeeRepository.findOne({ where: { id_employee } });

    if (!employee) {
      const customError = new CustomError(404, 'General', `Employee with id:${id_employee} not found.`, ['Employee not found.']);
      return next(customError);
    }

    // Оновлення полів
    employee.firstname = firstname || employee.firstname;
    employee.lastname = lastname || employee.lastname;
    employee.patronymic = patronymic || employee.patronymic;
    employee.phone = phone || employee.phone;
    employee.hire_date = hire_date ? new Date(hire_date) : employee.hire_date;
    
    // Оновлення зв'язку з Position (через ID)
    if (id_position) {
      employee.position = id_position; // TypeORM автоматично обробить ID як FK
    }

    try {
      await employeeRepository.save(employee);
      res.customSuccess(200, 'Employee successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Employee can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};