import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Position } from 'orm/entities/position/position';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id_position = req.params.id;
  const { name, salary } = req.body;

  const positionRepository = getRepository(Position);
  try {
    const position = await positionRepository.findOne({ where: { id_position } });

    if (!position) {
      const customError = new CustomError(404, 'General', `Position with id:${id_position} not found.`, ['Position not found.']);
      return next(customError);
    }
    
    // Перевірка на коректний формат зарплати, якщо вона оновлюється
    if (salary && (isNaN(Number(salary)) || Number(salary) <= 0)) {
        const customError = new CustomError(400, 'General', 'Invalid salary format', [
          'Salary must be a positive number.',
        ]);
        return next(customError);
    }

    position.name = name || position.name;
    position.salary = salary ? String(Number(salary).toFixed(2)) : position.salary;

    try {
      await positionRepository.save(position);
      res.customSuccess(200, 'Position successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Position '${position.name}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};