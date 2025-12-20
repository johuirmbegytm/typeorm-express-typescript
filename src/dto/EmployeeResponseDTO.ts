import { Employee } from '../orm/entities/employee/employee';
import { PositionResponseDTO } from './PositionResponseDTO';

export class EmployeeResponseDTO {
  id_employee: number;  // ← додай це поле
  firstname: string;
  lastname: string;
  patronymic: string;
  phone: string;
  hire_date: string;
  position: PositionResponseDTO | null;

  constructor(emp: Employee) {
    this.id_employee = emp.id_employee;  // ← ключовий рядок!
    this.firstname = emp.firstname;
    this.lastname = emp.lastname;
    this.patronymic = emp.patronymic || '';
    this.phone = emp.phone;

    this.hire_date = emp.hire_date
      ? (typeof emp.hire_date === 'string'
          ? emp.hire_date
          : emp.hire_date.toISOString().split('T')[0])
      : '';

    this.position = emp.position ? new PositionResponseDTO(emp.position) : null;
  }
}