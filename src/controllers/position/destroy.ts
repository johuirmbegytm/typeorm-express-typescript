import { Request, Response, NextFunction } from 'express';
import { positionService } from '../../services/PositionService';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    await positionService.destroy(id);
    res.customSuccess(200, 'Position deleted');
  } catch (err) {
    next(err);
  }
};