import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Position } from 'orm/entities/position/position';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id_position = req.params.id;

  const positionRepository = getRepository(Position);
  try {
    const position = await positionRepository.findOne({
      where: { id_position },
      select: ['id_position', 'name', 'salary'],
    });

    if (!position) {
      const customError = new CustomError(404, 'General', `Position with id:${id_position} not found.`, ['Position not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Position found', position);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};