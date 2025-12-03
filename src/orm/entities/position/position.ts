import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('position')
export class Position {
  @PrimaryGeneratedColumn({ name: 'id_position' })
  id_position: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  salary: string; // Используем string для numeric, чтобы сохранить точность (стандарт TypeORM)
}