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

  // Связь с таблицей Position
  // Поле в БД будет называться 'id_position' благодаря декоратору @JoinColumn
  @ManyToOne(() => Position)
  @JoinColumn({ name: 'id_position' })
  position: Position;
}