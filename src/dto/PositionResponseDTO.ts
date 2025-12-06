// src/dto/PositionResponseDTO.ts
import { Position } from '../orm/entities/position/position';

export class PositionResponseDTO {
  id: number;
  name: string;
  salary: string;

  constructor(position: Position) {
    this.id = position.id_position;
    this.name = position.name;
    this.salary = position.salary;
  }
}