import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Position } from 'orm/entities/position/position';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const positionRepository = getRepository(Position);
  try {
    const positions = await positionRepository.find({
      select: ['id_position', 'name', 'salary'],
    });
    res.customSuccess(200, 'List of positions.', positions);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of positions.`, null, err);
    return next(customError);
  }
};