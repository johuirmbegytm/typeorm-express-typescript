import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Position } from 'orm/entities/position/position'; 
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, salary } = req.body;

  if (!name || !salary) {
    const customError = new CustomError(400, 'General', 'Missing required fields', [
      'Position name and salary are required.',
    ]);
    return next(customError);
  }

  // Перевірка на коректний формат зарплати (проста перевірка)
  if (isNaN(Number(salary)) || Number(salary) <= 0) {
    const customError = new CustomError(400, 'General', 'Invalid salary format', [
      'Salary must be a positive number.',
    ]);
    return next(customError);
  }

  const positionRepository = getRepository(Position);

  try {
    const newPosition = new Position();
    newPosition.name = name;
    newPosition.salary = String(Number(salary).toFixed(2)); // Зберігаємо як рядок з двома знаками після коми

    await positionRepository.save(newPosition);

    res.customSuccess(201, 'Position successfully created.', { 
        id_position: newPosition.id_position, 
        name: newPosition.name, 
        salary: newPosition.salary 
    });

  } catch (err) {
    // Обробка, наприклад, помилки унікальності, якщо б ім'я посади було унікальним
    const customError = new CustomError(400, 'Raw', 'Error creating position.', null, err);
    return next(customError);
  }
};