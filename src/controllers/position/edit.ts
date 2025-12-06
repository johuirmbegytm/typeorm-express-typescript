import { Request, Response, NextFunction } from 'express';
import { positionService } from '../../services/PositionService';
import { PositionResponseDTO } from '../../dto/PositionResponseDTO';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const position = await positionService.update(id, req.body);
    if (!position) throw new Error('Not found');
    res.customSuccess(200, 'Position updated', new PositionResponseDTO(position));
  } catch (err) {
    next(err);
  }
};