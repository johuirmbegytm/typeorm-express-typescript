import { Request, Response, NextFunction } from 'express';
import { positionService } from '../../services/PositionService';
import { PositionResponseDTO } from '../../dto/PositionResponseDTO';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const position = await positionService.show(id);
    if (!position) {
      return next(new CustomError(404, 'Raw', 'Position not found'));
    }
    res.customSuccess(200, 'Position found', new PositionResponseDTO(position));
  } catch (err) {
    next(err);
  }
};