// src/services/EmployeeService.ts
import { getRepository } from 'typeorm';
import { Employee } from '../orm/entities/employee/employee';

class EmployeeService {

  private get EmployeeRepository() {
    return getRepository(Employee);
  } 
async create(data: any): Promise<Employee> {
  const employee = this.EmployeeRepository.create(data);
  await this.EmployeeRepository.save(employee);

  // Просто перезагружаем с relation по только что созданному id
  return await this.EmployeeRepository.findOneOrFail({
    where: { id_employee: (employee as any).id_employee },
    relations: ['position'],
  });
}

  async list() : Promise<Employee[]> {
    return await this.EmployeeRepository.find({
      relations: ['position'],  // просто relations, без select
    });
  }

  async show(id: number) {
    return await this.EmployeeRepository.findOne({
      where: { id_employee: id },
      relations: ['position'],
    });
  }

  async update(id: number, data: Partial<Employee>) {
    await this.EmployeeRepository.update({ id_employee: id }, data as any);
    return this.show(id);
  }

  async destroy(id: number) {
    await this.EmployeeRepository.delete({ id_employee: id });
  }
}

export const employeeService = new EmployeeService();