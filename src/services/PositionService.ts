import { getRepository } from 'typeorm';
import { Position } from '../orm/entities/position/position';

class PositionService {

    private get positionRepository() {
        return getRepository(Position);
    }

  async create(data: any): Promise<any> {
    const position = this.positionRepository.create(data);
    return await this.positionRepository.save(position);
  }

  async list(): Promise<Position[]> {
    return await this.positionRepository.find();
  }

  async show(id: number): Promise<Position> {
    return await this.positionRepository.findOne({
      where: { id_position: id },
    });
  }

  async update(id: number, data: any): Promise<Position> {
    await this.positionRepository.update({ id_position: id }, data);
    return this.show(id);
  }

  async destroy(id: number): Promise<void> {
    await this.positionRepository.delete({ id_position: id });
  }
}

export const positionService = new PositionService();