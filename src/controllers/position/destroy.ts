import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Position } from 'orm/entities/position/position';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id_position = req.params.id;

  const positionRepository = getRepository(Position);
  try {
    const position = await positionRepository.findOne({ where: { id_position } });

    if (!position) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Position with id:${id_position} doesn't exists.`]);
      return next(customError);
    }
    await positionRepository.delete(id_position);

    res.customSuccess(200, 'Position successfully deleted.', { id: position.id_position, name: position.name });
  } catch (err) {
    // Тут буде помилка, якщо є співробітники, прив'язані до цієї посади (FK violation)
    const customError = new CustomError(400, 'Raw', 'Error deleting position. Check for linked employees.', null, err);
    return next(customError);
  }
};