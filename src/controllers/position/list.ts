import { Request, Response, NextFunction } from 'express';
import { positionService } from '../../services/PositionService';
import { PositionResponseDTO } from '../../dto/PositionResponseDTO';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const positions = await positionService.list();
    const dto = positions.map(p => new PositionResponseDTO(p));
    res.customSuccess(200, 'List of positions', dto);
  } catch (err) {
    next(err);
  }
};