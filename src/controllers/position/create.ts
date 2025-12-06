import { Request, Response, NextFunction } from 'express';
import { positionService } from '../../services/PositionService';
import { PositionResponseDTO } from '../../dto/PositionResponseDTO';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const position = await positionService.create(req.body);
    res.customSuccess(201, 'Position created', new PositionResponseDTO(position));
  } catch (err) {
    next(err);
  }
};