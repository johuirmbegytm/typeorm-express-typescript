import { Employee } from '../orm/entities/employee/employee';
import { PositionResponseDTO } from './PositionResponseDTO';

export class EmployeeResponseDTO {
  id: number;
  firstname: string;
  lastname: string;
  patronymic: string;
  phone: string;
  hireDate: string;
  position: PositionResponseDTO | null;  // ← может быть null!

constructor(emp: Employee) {
  this.id = emp.id_employee;
  this.firstname = emp.firstname;
  this.lastname = emp.lastname;
  this.patronymic = emp.patronymic || '';
  this.phone = emp.phone;

  // ← ЭТО ИСПРАВЛЕНИЕ: проверяем, что hire_date — строка или Date
  this.hireDate = emp.hire_date
    ? (typeof emp.hire_date === 'string'
      ? emp.hire_date  // если строка — оставляем как есть (YYYY-MM-DD)
      : emp.hire_date.toISOString().split('T')[0])  // если Date — конвертируем
    : null;

  // position уже защищён
  this.position = emp.position ? new PositionResponseDTO(emp.position) : null;
}
}