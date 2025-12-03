import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Employee } from 'orm/entities/employee/employee';
import { Position } from 'orm/entities/position/position'; 
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  // Витягуємо дані з тіла запиту
  const { firstname, lastname, patronymic, phone, hire_date, id_position } = req.body;

  // Перевірка наявності обов'язкових полів
  if (!firstname || !lastname || !phone || !hire_date || !id_position) {
    const customError = new CustomError(400, 'General', 'Missing required fields', [
      'First name, last name, phone, hire date, and position ID are required.',
    ]);
    return next(customError);
  }

  const employeeRepository = getRepository(Employee);
  const positionRepository = getRepository(Position);

  try {
    // 1. Перевірка, чи існує посада (Position)
    const position = await positionRepository.findOne({ where: { id_position } });

    if (!position) {
      const customError = new CustomError(404, 'General', `Position with ID ${id_position} not found.`, ['Invalid position ID.']);
      return next(customError);
    }

    // 2. Створення нового об'єкта Employee
    const newEmployee = new Employee();
    newEmployee.firstname = firstname;
    newEmployee.lastname = lastname;
    newEmployee.patronymic = patronymic;
    newEmployee.phone = phone;
    // Перетворення рядка дати у формат Date
    newEmployee.hire_date = new Date(hire_date); 
    // Присвоєння об'єкта Position
    newEmployee.position = position;

    // 3. Збереження співробітника
    await employeeRepository.save(newEmployee);

    // 4. Успішна відповідь
    res.customSuccess(201, 'Employee successfully created.', { 
        id_employee: newEmployee.id_employee, 
        firstname: newEmployee.firstname, 
        lastname: newEmployee.lastname, 
        position: newEmployee.position.name 
    });

  } catch (err) {
    // Обробка помилок бази даних (наприклад, дублікат, якщо б були унікальні поля)
    const customError = new CustomError(400, 'Raw', 'Error creating employee.', null, err);
    return next(customError);
  }
};