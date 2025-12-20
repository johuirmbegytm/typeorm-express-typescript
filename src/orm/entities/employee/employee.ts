import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Position } from '../position/position';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn({ name: 'id_employee' })
  id_employee: number;

  @Column({
    length: 50,
  })
  firstname: string;

  @Column({
    length: 50,
  })
  lastname: string;

  @Column({
    length: 50,
  })
  patronymic: string;

  @Column({
    length: 20,
  })
  phone: string;

  @Column({
    type: 'date',
  })
  hire_date: Date;

  // ← Явне поле для foreign key (дублює @JoinColumn)
  @Column({ name: 'id_position', nullable: true })
  id_position: number | null;

  // Реляція
  @ManyToOne(() => Position, { nullable: true })  // nullable: true, щоб можна було null
  @JoinColumn({ name: 'id_position' })
  position: Position | null;  // ← теж null, бо посада може бути відсутня
}