// src/services/EmployeeService.ts

import { getRepository, Repository } from 'typeorm';
import { Employee } from '../orm/entities/employee/employee';
import { Position } from '../orm/entities/position/position';  // ← додай цей імпорт!

class EmployeeService {
  private get employeeRepository(): Repository<Employee> {
    return getRepository(Employee);
  }

  private get positionRepository(): Repository<Position> {
    return getRepository(Position);
  }

  async create(data: any): Promise<Employee> {
    const saved = await this.employeeRepository.save(this.employeeRepository.create(data));

    return this.employeeRepository.findOneOrFail({
      where: { id_employee: (saved as any).id_employee },
      relations: ['position'],
    });
  }

  async list(): Promise<Employee[]> {
    return await this.employeeRepository.find({
      relations: ['position'],
    });
  }

  async show(id: number): Promise<Employee | null> {
    console.log('Шукаю співробітника з id:', id);  // ← додай для дебагу
    return await this.employeeRepository.findOne({
      where: { id_employee: id },
      relations: ['position'],
    });
  }

  async update(id: number, data: Partial<Employee & { positionId?: number }>): Promise<Employee | null> {
    console.log('=== UPDATE START ===');
    console.log('ID співробітника:', id);
    console.log('Вхідні дані від фронту:', data);

    const employee = await this.employeeRepository.findOne({
      where: { id_employee: id },
      relations: ['position'],
    });

    if (!employee) {
      console.log('Співробітник не знайдений');
      return null;
    }

    console.log('Знайдений співробітник ДО оновлення:', {
      id_employee: employee.id_employee,
      firstname: employee.firstname,
      lastname: employee.lastname,
      phone: employee.phone,
      position: employee.position ? { id_position: employee.position.id_position, name: employee.position.name } : null,
    });

    // Оновлюємо прості поля
    if (data.firstname) employee.firstname = data.firstname;
    if (data.lastname) employee.lastname = data.lastname;
    if (data.patronymic !== undefined) employee.patronymic = data.patronymic;
    if (data.phone) employee.phone = data.phone;
    if (data.hire_date) employee.hire_date = data.hire_date;

    // Оновлюємо посаду
    if (data.positionId !== undefined) {
      console.log('Оновлюємо посаду, positionId з фронту:', data.positionId);

      if (data.positionId === null || data.positionId === 0) {
        console.log('Встановлюємо посаду null');
        employee.position = null;
        (employee as any).id_position = null;
      } else {
        const position = await this.positionRepository.findOne({
          where: { id_position: data.positionId },
        });

        if (!position) {
          console.log('ПОМИЛКА: Посада не знайдена за id_position:', data.positionId);
          throw new Error('Посада не знайдена');
        }

        console.log('Знайдена нова посада:', {
          id_position: position.id_position,
          name: position.name,
          salary: position.salary,
        });

        employee.position = position;
        (employee as any).id_position = position.id_position;
      }
    }

    console.log('Співробітник ПЕРЕД save():', {
      id_employee: employee.id_employee,
      firstname: employee.firstname,
      lastname: employee.lastname,
      phone: employee.phone,
      position: employee.position ? { id_position: employee.position.id_position, name: employee.position.name } : null,
      id_position_raw: (employee as any).id_position,
    });

    const saved = await this.employeeRepository.save(employee);
    console.log('Після save(), повернутий saved:', {
      id_employee: saved.id_employee,
      position: saved.position ? { id_position: saved.position.id_position, name: saved.position.name } : null,
    });

    // Reload свіжий з БД
    const reloaded = await this.employeeRepository.findOne({
      where: { id_employee: id },
      relations: ['position'],
    });

    console.log('Повертаємо в контролер reloaded:', reloaded ? {
      id_employee: reloaded.id_employee,
      firstname: reloaded.firstname,
      lastname: reloaded.lastname,
      phone: reloaded.phone,
      hire_date: reloaded.hire_date,
      position: reloaded.position ? {
        id_position: reloaded.position.id_position,
        name: reloaded.position.name,
        salary: reloaded.position.salary,
      } : null,
      id_position_raw: (reloaded as any).id_position,
    } : null);

    console.log('=== UPDATE END ===');

    return reloaded;
  }

  async destroy(id: number): Promise<void> {
    await this.employeeRepository.delete({ id_employee: id });
  }
}

export const employeeService = new EmployeeService();